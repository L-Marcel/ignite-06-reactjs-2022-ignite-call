import { Avatar, Button, Heading, Text } from "@ignite-ui/react";
import { Container, UserHeader, EditButton } from "./styles";
import { GetStaticPaths, GetStaticProps } from "next";
import prisma from "../../../lib/prisma";
import { ScheduleForm } from "./components/ScheduleForm/index";
import { NextSeo } from "next-seo";
import { CaretLeft } from "phosphor-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
    username: string;
  };
}

export default function Schedule({
  user
}: ScheduleProps) {
  const router = useRouter();
  const session = useSession();
  const username = session?.data?.user.username;
  const userIsAuthorized = user.username === username;

  function handleOnBackToEdit() {
    router.push("/register/time-intervals");
  }

  return (
    <>
      <NextSeo
        title={`Agendar com ${user.name} | Ignite Call`}
      />
      <Container>
        { userIsAuthorized && <EditButton onClick={handleOnBackToEdit}>
          <CaretLeft/>
          editar
        </EditButton> }
        <UserHeader>
          <Avatar src={user.avatarUrl}/>
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm/>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async({ params }) => {
  const username = String(params?.username);
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if(!user) {
    return {
      notFound: true
    };
  } 

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
        username
      }
    }
  };
}; 