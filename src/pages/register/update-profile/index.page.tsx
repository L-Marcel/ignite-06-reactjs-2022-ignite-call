import { Avatar, Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";
import { api } from "../../../lib/axios";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const updateProfileFormSchema = z.object({
  bio: z.string()
});

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfile() {
  const session = useSession();
  const router = useRouter();

  const { 
    register,
    handleSubmit,
    formState: { 
      isSubmitting 
    }
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
    shouldFocusError: false
  });

  const user = session.data?.user;
  
  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put("/users/profile", {
      bio: data.bio
    });

    await router.push(`/schedule/${user?.username}`);
  }

  return (
    <>
      <NextSeo
        title="Atualize seu perfil | Ignite Call"
        noindex
      />
      <Container>
        <Header>
          <Heading as="strong">
          Defina sua disponibilidade
          </Heading>
          <Text>
          Por último, uma breve descrição e uma foto de perfil.
          </Text>

          <MultiStep
            size={4}
            currentStep={4}
          />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar src={user?.avatar_url}/>
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea
              placeholder="Seu nome"
              {...register("bio")}
            />
            <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
          Finalizar
            <ArrowRight/>
          </Button>
        </ProfileBox>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async({ req, res }) => {
  const session = await unstable_getServerSession(
    req, 
    res, 
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session
    }
  };
}; 