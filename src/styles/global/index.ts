import { globalCss } from "@ignite-ui/react";
import tw, { globalStyles } from "twin.macro";
import { focusStyle, scrollbar } from "../content/utilities";

export function putGlobalStyles() {
  globalCss({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...globalStyles as Record<any, any>,
    "*": {
      ...tw`
        box-border
        p-0
        m-0
      `,
      ...scrollbar,
      overflow: "initial"
    },
  
    "*:focus, *:focus-visible": {
      ...focusStyle
    },
  
    body: {
      ...tw`
        bg-gray-900
        text-gray-100
        font-roboto
        antialiased
      `
    },

    img: {
      ...tw`
        max-w-none
      `
    },
  })();
}