import { Heading, Text, styled } from "@ignite-ui/react";
import tw from "twin.macro";

export const Container = styled("div", {
  ...tw`
    max-w-[852px]
    py-0
    px-4
    mt-20
    mx-auto
    mb-4
  `
});

export const UserHeader = styled("div", {
  ...tw`
    flex
    flex-col
    items-center
  `,

  [`> ${Heading}`]: {
    ...tw`
      leading-base
      mt-2
    `
  },
  
  [`> ${Text}`]: {
    ...tw`
      text-gray-200
    `
  },
});