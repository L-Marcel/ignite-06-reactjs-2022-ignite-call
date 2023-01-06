import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function ConnectCalendar() {
  const router = useRouter();
  const session = useSession();

  const hasAuthError = !!router.query.error;
  const appWasAuthorized = session.status === "authenticated";
  
  async function handleSignIn() {
    signIn("google");
  }

  async function handleNavigateToNextStep() {
    await router.push("/register/time-intervals");
  }

  return (
    <>
      <NextSeo
        title="Conecte sua agenda | Ignite Call"
        noindex
      />
      <Container>
        <Header>
          <Heading as="strong">
            Conecte sua agenda!
          </Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep
            size={4}
            currentStep={2}
          />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {
              appWasAuthorized? (
                <Button size="sm" disabled>
                  Conectado
                  <Check/>
                </Button>
              ):(
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleSignIn}
                >
                  Conectar
                  <ArrowRight/>
                </Button>
              )
            }
          </ConnectItem>

          {hasAuthError && !appWasAuthorized && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button onClick={handleNavigateToNextStep} type="submit" disabled={!appWasAuthorized}>
            Próximo passo
            <ArrowRight/>
          </Button>
        </ConnectBox>
      </Container>
    </>
  );
}