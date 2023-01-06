import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header, Form, FormError } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../lib/axios";
import { User } from "@prisma/client";
import { AxiosError } from "axios";
import { NextSeo } from "next-seo";

const registerFormSchema = z.object({
  username: z.string() 
    .min(3, {
      message: "O usuário precisa ter pelo menos 3 letras."
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode ter apenas letras e hifens."
    })
    .transform((username) => 
      username.toLowerCase()
    ),
  name: z.string()
    .min(3, {
      message: "O nome precisa ter pelo menos 3 letras."
    })
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const router = useRouter();
  
  const { 
    register,
    handleSubmit, 
    setFocus,
    setError,
    setValue,
    formState: { 
      errors, 
      isSubmitting 
    }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    shouldFocusError: false
  });
  
  const usernameQuery = router.query.username;
  useEffect(() => {
    if(usernameQuery) {
      setValue("username", String(usernameQuery));
    }
  }, [usernameQuery, setValue]);

  async function handleRegister(data: RegisterFormData) {
    await api.post<User>("/users", data)
      .then(async() => {
        await router.push("/register/connect-calendar");
      })
      .catch(err => {
        const data = err?.response?.data;
        const message = data?.message;
        const field = data?.field;

        if(err instanceof AxiosError && field && message) {
          setError(field, {
            message,
            type: "shouldUnregister",
          });
          setValue("username", "");
          return;
        }
      });
  }

  function handleOnClick(e: MouseEvent<HTMLLabelElement>) {
    const focusTarget = e.currentTarget.htmlFor;

    switch(focusTarget) {
    case "username":
    case "name":
      setFocus(e.currentTarget.htmlFor as "name" | "username");
      break;
    default:
      break;
    }
  }

  return (
    <>
      <NextSeo
        title="Crie uma conta | Ignite Call"
      />
      <Container>
        <Header>
          <Heading as="strong">
            Bem-vindo ao Ignite Call!
          </Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
          </Text>

          <MultiStep
            size={4}
            currentStep={1}
          />
        </Header>

        <Form as="form" onClick={handleSubmit(handleRegister)}>
          <label onClick={handleOnClick} htmlFor="username">
            <Text size="sm">Nome do usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="usuário"
              {...register("username")}
            />
            {
              errors.username && (
                <FormError size="sm">
                  {errors.username.message}
                </FormError>
              )
            }
          </label>

          <label onClick={handleOnClick} htmlFor="name">
            <Text size="sm">Nome completo</Text>
            <TextInput
              placeholder="Seu nome"
              {...register("name")}
            />
            {
              errors.name && (
                <FormError size="sm">
                  {errors.name.message}
                </FormError>
              )
            }
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight/>
          </Button>
        </Form>
      </Container>
    </>
  );
}