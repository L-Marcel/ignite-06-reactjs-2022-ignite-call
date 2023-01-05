import { styled, Box, Text } from "@ignite-ui/react";
import tw from "twin.macro";
import { propsFocusWithinInAllTextInput } from "../../../styles/content/objects";
import { focusStyle } from "../../../styles/content/utilities";

export const IntervalBox = styled(Box, {
  ...tw`
    mt-6
    flex
    flex-col
  `
});

export const IntervalsContainer = styled("div", {
  ...tw`
    border-solid
    border-gray-600
    border-2
    mb-4
    rounded-md
    overflow-auto
  `
});

export const IntervalItem = styled("div", {
  ...tw`
    flex
    items-center
    justify-between
    min-w-[390px]
    py-3
    px-4
  `,

  "& + &": {
    ...tw`
      border-solid
      border-gray-600
      border-t-2
    `
  },

  "@media (max-width: 470px)": {
    ...tw`
      last:pb-4
    `
  }
});

export const IntervalDay = styled("div", {
  ...tw`
    flex
    items-center
    gap-3
  `
});

export const IntervalInputs = styled("div", {
  ...tw`
    flex
    items-center
    gap-2
  `,
  ...propsFocusWithinInAllTextInput,
  input: {
    ...tw`
      min-w-[46px]
    `
  },
  "input::-webkit-calendar-picker-indicator": {
    ...tw`
      invert
      brightness-50
      rounded-full
    `,
  }
});

export const FormError = styled(Text, {
  ...tw`
    text-[#f75e68]
    mt-4
  `
});