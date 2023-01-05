import { disableFocus, focusStyle } from "./utilities";


export const propsFocusWithinInAllTextInput = {
  ["> div:focus-within"]: {
    ...focusStyle,

    "> input:focus, input:focus-visible": {
      ...disableFocus
    }
  },
};


export const propsFocusWithinInTextInput = {
  ["> div:first-child:focus-within"]: {
    ...focusStyle,

    "> input:focus, input:focus-visible": {
      ...disableFocus
    }
  },
};

export const propsFocusWithinInLabelTextInput = {
  label: {
    ["> p + div:focus-within"]: {
      ...focusStyle,
  
      "> input:focus, input:focus-visible": {
        ...disableFocus
      }
    }
  }
};