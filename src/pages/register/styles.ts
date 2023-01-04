import { Box, styled, Heading, Text } from "@ignite-ui/react";
import tw from "twin.macro";
import { propsFocusWithinInLabelTextInput, propsFocusWithinInTextInput } from "../../styles/content/objects";

export const Container = styled("main", {
  ...tw`
    max-w-[572px]
    mt-20
    mx-auto
    mb-4
    py-0
    px-4
  `
});

export const Header = styled("div", {
  ...tw`
    py-0
    px-6
  `,

  [`> ${Heading}`]: {
    ...tw`
      leading-base
    `
  },

  [`> ${Text}`]: {
    ...tw`
      text-gray-200
      mb-6
    `
  }
});

export const Form = styled(Box, {
  ...tw`
    mt-6
    flex
    flex-col
    gap-4
  `,
  label: {
    ...tw`
      flex
      flex-col
      gap-2
    `,
    ...propsFocusWithinInLabelTextInput.label
  }
});

export const FormError = styled(Text, {
  ...tw`
    text-[#f75a68]
  `
});