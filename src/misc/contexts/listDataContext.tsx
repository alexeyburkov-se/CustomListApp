import { ListType } from "../../loaders/mainLoader";
import { createSimpleStatefulContext } from "./simpleStatefulContext";

const [p, u] = createSimpleStatefulContext<
  [ListType | null, (d: ListType) => void, () => void],
  ListType | null
>([null, () => ({}), () => ({})], null, ([data, set]) => [
  data,
  set,
  () => set(null),
]);

export const ListDataProvider = p;

export const useListData = u;
