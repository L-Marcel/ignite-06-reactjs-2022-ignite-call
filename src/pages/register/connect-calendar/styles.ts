import { styled, Box, Text } from "@ignite-ui/react";
import tw from "twin.macro";

export const ConnectBox = styled(Box, {
  ...tw`
    mt-6
    flex
    flex-col
  `
});

export const ConnectItem = styled(Box, {
  ...tw`
    flex
    items-center
    justify-between
    border-solid
    border-2
    border-gray-600
    py-4
    px-6
    rounded-md
    mb-2
  `
});

export const AuthError = styled(Text, {
  ...tw`
    text-[#f75a68]
    mb-4
  `
});