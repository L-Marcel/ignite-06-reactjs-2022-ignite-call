import { Heading, Text, styled } from "@ignite-ui/react";
import tw from "twin.macro";
import { focusStyle } from "../../../styles/content/utilities";

export const Container = styled("div", {
  ...tw`
    relative
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

export const EditButton = styled("button", {
  ...tw`
    fixed
    flex
    items-center
    gap-[.1rem]
    top-4
    left-4
    px-2
    rounded-md
  `,
  "&:focus, &:focus-visible": {
    ...focusStyle
  }
});