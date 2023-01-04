import { Box, Text, styled } from "@ignite-ui/react";
import tw from "twin.macro";
import { 
  propsFocusWithinInTextInput 
} from "../../../../styles/content/objects";

export const Form = styled(Box, {
  ...tw`
    grid
    gap-2
    items-center
    mt-4
    p-4
    grid-cols-1
    sm:grid-cols-[1fr_auto]
  `,
  ...propsFocusWithinInTextInput
});

export const FormAnnotation = styled("div", {
  ...tw`
    mt-2
  `,

  [`> ${Text}`]: {
    ...tw`
      text-gray-400
    `
  }
});