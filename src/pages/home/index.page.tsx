import { Heading, Text } from "@ignite-ui/react";
import { Seo } from "../../components/Seo";
import { Container, Hero, Preview } from "./styles";

import previewImage from "../../assets/app-preview.png";
import Image from "next/image";
import { ClaimUserNameForm } from "./components/ClaimUserNameForm";
import { NextSeo } from "next-seo";
import { Brand } from "../../components/Brand";

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <Container>
        <Hero>
          <Heading size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.</Text>
          <ClaimUserNameForm/>
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            height={442}
            quality={100}
            priority
            alt="Exemplo do calendário de compromissos da aplicação. O calendário é cinza e possuí alguns dias marcados."
          />
        </Preview>
      </Container>
      <Brand/>
    </>
  );
}