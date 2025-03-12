import { useEffect } from "react";
import { SeparatorType, supportedSeparators } from "../constants";
import {
  createSimpleStatefulContext,
  ProviderInputProps,
} from "./simpleStatefulContext";

export const separatorStorageKey = "decimalSeparator";

const [P, u] = createSimpleStatefulContext<
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

const VisibilityListeners = () => {
  const [, set] = useDecimalSeparator();

  useEffect(() => {
    const updateSeparator = () => {
      const sep = localStorage.getItem(separatorStorageKey);
      if (sep != null && sep in supportedSeparators && !document.hidden) {
        set(sep as SeparatorType);
      }
    };

    document.addEventListener("visibilitychange", updateSeparator);

    return () => {
      document.removeEventListener("visibilitychange", updateSeparator);
    };
  }, [set]);

  return <></>;
};

export const DecimalSeparatorProvider = (
  props: ProviderInputProps<SeparatorType>,
) => (
  <P {...props}>
    <VisibilityListeners />
    {props.children}
  </P>
);

export const useDecimalSeparator = u;
