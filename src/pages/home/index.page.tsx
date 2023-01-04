import { Heading, Text } from "@ignite-ui/react";
import { Seo } from "../../components/Seo";
import { Container, Hero, Preview } from "./styles";

import previewImage from "../../assets/app-preview.png";
import Image from "next/image";
import { ClaimUserNameForm } from "./components/ClaimUserNameForm";

export default function HomePage() {
  return (
    <Seo 
      title="Next Start"
      author="L-Marcel"
      description={"Modelo para projetos que utilizam Next.js." +
      "Para facilitar a produção, deixei o tailwind e o typescript" +
      " — que vejo como necessário — instalados."}
      sharedUrl="https://l-marcel-next-start.vercel.app/"
      ogUrl="https://l-marcel-next-start.vercel.app/og.jpg"
    >
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
    </Seo>
  );
}