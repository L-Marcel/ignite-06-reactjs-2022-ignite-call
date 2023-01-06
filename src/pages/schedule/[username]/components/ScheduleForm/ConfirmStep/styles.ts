import { styled, Box, Text, TextArea } from "@ignite-ui/react";
import tw from "twin.macro";
import { propsFocusWithinInLabelTextInput } from "../../../../../../styles/content/objects";

export const ConfirmForm = styled(Box, {
  ...tw`
    max-w-[540px]
    mt-6
    mb-0
    mx-auto
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

    ...propsFocusWithinInLabelTextInput.label,

    [`> ${TextArea}:focus`]: {
      ...tw`
        border-gray-900
      `
    }
  },
});

export const FormHeader = styled("div", {
  ...tw`
    flex
    items-center
    gap-4
    pb-6
    mb-2
    border-b-2
    border-solid
    border-gray-600
  `,

  [`> ${Text}`]: {
    ...tw`
      flex
      items-center
      gap-2
    `,

    svg: {
      ...tw`
        text-gray-200
        w-5
        h-5
      `
    }
  }
});

export const FormError = styled(Text, {
  ...tw`
    text-[#f75a668]
  `
});

export const FormActions = styled("div", {
  ...tw`
    flex
    mt-2
    justify-end
    gap-2
  `
});