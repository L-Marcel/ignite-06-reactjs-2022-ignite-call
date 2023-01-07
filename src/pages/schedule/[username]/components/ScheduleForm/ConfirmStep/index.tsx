import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { Text, TextInput, TextArea, Button } from "@ignite-ui/react";
import dayjs from "dayjs";
import { api } from "../../../../../../lib/axios";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelOrFinishScheduling: () => void;
}

const confirmFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos três caracteres."),
  email: z.string().email("O email deve ser válido."),
  observations: z.string()
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep({
  schedulingDate,
  onCancelOrFinishScheduling
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
      errors
    }
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  });

  const router = useRouter();
  const username = String(router.query.username);

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observations } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate
    });

    onCancelOrFinishScheduling();
  }

  const describedDate = dayjs(schedulingDate)
    .format("DD[ de ]MMMM[ de ]YYYY");

  const describedTime = dayjs(schedulingDate)
    .format("HH[:]mm[h]");
  
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank/>
          {describedDate}
        </Text>
        <Text>
          <Clock/>
          {describedTime}
        </Text>
      </FormHeader>

      <label htmlFor="">
        <Text size="sm">Nome completo</Text>
        <TextInput autoComplete="off" placeholder="Seu nome" {...register("name")}/>
        {errors.name && <FormError>
          {errors.name?.message}
        </FormError>}
      </label>

      <label htmlFor="">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput autoComplete="off" type="email" placeholder="jonh@example.com" {...register("email")}/>
        {errors.email && <FormError>
          {errors.email?.message}
        </FormError>}
      </label>

      <label htmlFor="">
        <Text size="sm">Observações</Text>
        <TextArea {...register("observations")}/>
      </label>

      <FormActions>
        <Button 
          type="button" 
          variant="tertiary" 
          onClick={onCancelOrFinishScheduling}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}