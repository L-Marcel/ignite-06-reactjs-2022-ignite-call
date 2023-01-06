import { Container, FormError, Header } from "../styles";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { IntervalBox, IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "../../../utils/getWeekDays";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertTimeFromStringToMinutes } from "../../../utils/convertTimeFromStringToMinutes";
import { api } from "../../../lib/axios";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string()
  }))
    .length(7)
    .transform((intervals) => 
      intervals.filter((interval) => interval.enabled)
    )
    .refine((intervals) => intervals.length > 0, {
      message: "Você precisa selecionar pelo menos um dia da semana!"
    })
    .transform((intervals) => 
      intervals.map(({ weekDay, startTime, endTime }) => {
        return {
          weekDay,
          startTimeInMinutes: convertTimeFromStringToMinutes(startTime),
          endTimeInMinutes: convertTimeFromStringToMinutes(endTime)
        };
      })
    )
    .refine((intervals) => intervals.every(
      (interval) => (interval.endTimeInMinutes - 60) >= interval.startTimeInMinutes
    ), {
      message: "O horário de término deve ser pelo menos uma hora depois do início."
    })
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeInIntervals() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: {
      isSubmitting,
      errors
    }
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" }
      ]
    }
  });

  const {
    fields
  } = useFieldArray({
    name: "intervals",
    control,
  });

  const weekDays = getWeekDays({ short: false });
  const intervals = watch("intervals");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSetTimeIntervals(data: any) {
    const formData = data as TimeIntervalsFormOutput;

    await api.post("/users/time-intervals", formData);

    await router.push("/register/update-profile");
  }

  return (
    <>
      <NextSeo
        title="Selecione sua disponibilidade | Ignite Call"
        noindex
      />
      <Container>
        <Header>
          <Heading as="strong">
            Quase lá!
          </Heading>
          <Text>
            Defina o intervalo de horários que você está disponível em cada dia da semana.
          </Text>

          <MultiStep
            size={4}
            currentStep={3}
          />
        </Header>

        <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
          <IntervalsContainer>
            { fields.map((field, index) => {
              return (
                <IntervalItem key={field.id}>
                  <IntervalDay>
                    <Controller 
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({
                        field
                      }) => {
                        return (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true);
                            }}
                          />
                        );
                      }}
                    />
                    <Text>{weekDays[field.weekDay]}</Text>
                  </IntervalDay>
                  <IntervalInputs>
                    <TextInput 
                      size="sm" 
                      type="time" 
                      step={60} 
                      disabled={!intervals[index].enabled}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput 
                      size="sm" 
                      type="time" 
                      step={60} 
                      disabled={!intervals[index].enabled}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </IntervalInputs>
                </IntervalItem>
              );
            }) }
          </IntervalsContainer>

          {
            !!errors.intervals && (
              <FormError size="sm">{errors.intervals.message}</FormError>
            )
          }

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight/>
          </Button>
        </IntervalBox>
      </Container>
    </>
  );
}