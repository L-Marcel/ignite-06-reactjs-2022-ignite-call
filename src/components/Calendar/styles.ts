import { styled, Text } from "@ignite-ui/react";
import tw, { theme } from "twin.macro";

export const CalendarContainer = styled("section", {
  ...tw`
    flex
    flex-col
    gap-6
    p-6
  `
});

export const CalendarHeader = styled("header", {
  ...tw`
    flex
    items-center
    justify-between
  `
});

export const CalendarTitle = styled(Text, {
  ...tw`
    font-medium
    capitalize
  `,

  span: {
    ...tw`
      text-gray-200
    `
  }
});

export const CalendarActions = styled("div", {
  ...tw`
    flex
    gap-2
    text-gray-200
  `,

  button: {
    all: "unset",

    ...tw`
      cursor-pointer
      leading-[0]
      rounded-sm
    `,

    svg: {
      ...tw`
        w-5
        h-5
      `
    },

    "&:hover": {
      ...tw`
        text-gray-100
      `
    },

    "&:focus": {
      boxShadow: `0 0 0 2px ${theme`colors.gray-100`}`
    }
  }
});

export const CalendarBody = styled("table", {
  ...tw`
    w-full
    font-roboto
    border-spacing-1
    table-fixed
  `,

  "thead th": {
    ...tw`
      text-gray-200
      font-medium
      text-sm
    `
  },

  "tbody:before": {
    content: ".",
    ...tw`
      leading-3
      block
      text-gray-800
    `
  },

  "tbody td": {
    ...tw`
      box-border
    `
  },

  td: {
    ...tw`
      text-center
    `
  },

  "tr:not(:last-of-type) > td > button": {
    ...tw`
      mb-3
    `
  }
});

export const CalendarDay = styled("button", {
  all: "unset",
  ...tw`
    w-[90%]
    aspect-square
    bg-gray-600
    relative
    text-center
    cursor-pointer
    mx-auto
    rounded-sm
    
    md:focus:shadow-[0_0_0_2px]
    md:focus:shadow-gray-100
    ring-gray-100
  `,
  
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
}, {
  variants: {
    isSelected: {
      true: {
        "&::after": {
          content: "",
          ...tw`
            md:absolute
            md:bottom-0
            md:w-[5px]
            md:h-[5px]
            md:rounded-full
            md:bg-white
            md:left-0
            md:right-0
            md:mt-0
            md:mx-auto
            md:mb-2
            lg:mb-3
            2xl:mb-4
          `
        },
        
        ...tw`
          bg-gray-300
          text-gray-600
          md:bg-gray-600
          md:text-gray-100
        `
      }
    }
  }
});