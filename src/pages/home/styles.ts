import { Heading, Text, styled } from "@ignite-ui/react";
import tw from "twin.macro";

export const Container = styled("div", {
  maxWidth: "calc(100vw - ((100vw - 1162px) / 2))",
  ...tw`
    h-screen
    flex
    items-center
    relative
    gap-20
    ml-auto
    overflow-hidden
  `
});

export const Hero = styled("div", {
  ...tw`
    max-w-[480px]
    py-0
    px-10
  `,

  [`> ${Heading}`]: {
    ...tw`
      text-heading-3xl
      sm:text-heading-4xl
    `
  },

  [`> ${Text}`]: {
    ...tw`
      mt-2
      text-gray-200
    `
  }
});

export const Preview = styled("div", {
  ...tw`
    overflow-hidden
    hidden
    sm:block
    pr-10
  `
});