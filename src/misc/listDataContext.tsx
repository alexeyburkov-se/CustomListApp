import { createContext, useContext, useState } from "react";
import { ListType } from "../loaders/mainLoader";

type ProvideListDataContext = [
  ListType | null,
  (d: ListType) => void,
  () => void,
];

const ListDataContext = createContext<ProvideListDataContext>([
  null,
  () => ({}),
  () => ({}),
]);

export const ListDataProvider = ({ children }: { children?: JSX.Element }) => {
  const [data, set] = useState<ListType | null>(null);

  return (
    <ListDataContext.Provider value={[data, set, () => set(null)]}>
      {children}
    </ListDataContext.Provider>
  );
};

export const useListData = () => useContext(ListDataContext);
