import { SeparatorType } from "../constants";
import { createSimpleStatefulContext } from "./simpleStatefulContext";

export const separatorStorageKey = "decimalSeparator";

const [p, u] = createSimpleStatefulContext<
  [SeparatorType, (l: SeparatorType) => void],
  SeparatorType
>(["language", () => ({})], ([lang, set]) => [
  lang,
  (l: SeparatorType) => {
    localStorage.setItem(separatorStorageKey, l);
    set(l);
  },
]);

export const DecimalSeparatorProvider = p;

export const useDecimalSeparator = u;
