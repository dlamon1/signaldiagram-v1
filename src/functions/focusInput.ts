import { get } from "svelte/store";
import { tick } from "svelte";

import { textInputRef, } from "../store";

export const focusLabelInput = async () => {
  // console.log(get(textInputRef));
  // await tick();
  await tick();

  // if (get(selectionTab) === "squares" && get(textInputRef))
  //   get(textInputRef).focus();
};
