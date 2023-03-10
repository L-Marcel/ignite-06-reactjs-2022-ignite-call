import { styled } from "@ignite-ui/react";
import tw from "twin.macro";

export const BrandContainer = styled("a", {
  ...tw`
    absolute
    bottom-0
    right-8
    text-lg
    2xl:text-xl
    md:right-7
    text-zinc-300
    bg-zinc-800
    hover:underline
    underline-offset-2
    rounded-t-md
    h-min
    py-1
    px-2
  `
});