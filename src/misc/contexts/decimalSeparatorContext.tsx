import { SeparatorType } from "../constants";
import { createSimpleStatefulContext } from "./simpleStatefulContext";

export const separatorStorageKey = "decimalSeparator";

const [p, u] = createSimpleStatefulContext<
  [SeparatorType, (l: SeparatorType, cache?: boolean) => void],
  SeparatorType
>(["dot", () => ({})], ([lang, set]) => [
  lang,
  (l: SeparatorType, cache = true) => {
    if (cache) {
      localStorage.setItem(separatorStorageKey, l);
    }
    set(l);
  },
]);

export const DecimalSeparatorProvider = p;

export const useDecimalSeparator = u;
