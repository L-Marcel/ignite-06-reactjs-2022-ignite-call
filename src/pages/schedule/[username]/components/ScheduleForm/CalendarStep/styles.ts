import { styled, Box, Text } from "@ignite-ui/react";
import tw, { theme } from "twin.macro";
import { disableFocus, scrollbar } from "../../../../../../styles/content/utilities";

export const Container = styled(Box, {
  ...tw`
    mt-6
    mx-auto
    mb-0
    p-0
    grid
    min-w-[90%]
    sm:min-w-[80%]
    md:min-w-[60%]
    lg:min-w-[60%]
    xl:min-w-[70%]
    2xl:min-w-full
    max-w-[90%]
    sm:max-w-[80%]
    md:max-w-full
    relative
    overflow-hidden
  `,
  variants: {
    isTimePickerOpen: {
      true: {
        ...tw`
          grid-cols-1
          w-[820px]
          md:grid-cols-[1fr_288px]
        `
      },
      false: {
        ...tw`
          w-[540px]
          grid-cols-1
        `
      }
    },
  },
  defaultVariants: {
    isTimePickerOpen: false
  }
});

export const TimePicker = styled("div", {
  ...tw`
    border-t-2
    md:border-l-2
    md:border-t-0
    border-gray-600
    border-solid
    pt-6
    pb-0
    px-6
    md:absolute
    md:top-0
    md:right-0
    md:h-full
    md:w-[280px]
    overflow-y-scroll
  `,
  ...scrollbar,
  ...disableFocus
});

export const TimePickerHeader = styled(Text, {
  ...tw`
    font-medium
    capitalize
  `,

  span: {
    ...tw`
      text-gray-200
      normal-case
    `
  }
});

export const TimePickerList = styled("div", {
  ...tw`
    grid
    mt-3
    grid-cols-2
    md:grid-cols-1
    gap-2
  `
});

export const TimePickerItem = styled("button", {
  ...tw`
    border-0
    bg-gray-600
    py-2
    px-0
    cursor-pointer
    text-gray-100
    rounded-sm
    text-sm
    leading-base
  `,

  "&:last-child": {
    ...tw`
      mb-6
    `
  },

  "&:disabled": {
    ...tw`
      bg-none
      cursor-default
      opacity-40
    `
  },

  "&:not(:disabled):hover": {
    ...tw`
      bg-gray-500
    `
  },

  "&:focus": {
    boxShadow: `0 0 0 2px ${theme`colors.gray.100`}`
  }
});