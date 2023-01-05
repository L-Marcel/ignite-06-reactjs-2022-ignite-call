import { styled, Box, Text } from "@ignite-ui/react";
import tw from "twin.macro";

export const ProfileBox = styled(Box, {
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
  }
});

export const FormAnnotation = styled(Text, {
  ...tw`
    text-gray-200
  `
});