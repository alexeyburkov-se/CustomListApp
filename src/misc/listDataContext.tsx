import { createContext, useContext, useState } from "react";
import { ListDataType } from "../loaders/mainLoader";

type ProvideListDataContext = [
  ListDataType | null,
  (d: ListDataType) => void,
  () => void,
];

const ListDataContext = createContext<ProvideListDataContext>([
  null,
  () => ({}),
  () => ({}),
]);

export const ListDataProvider = ({ children }: { children: JSX.Element }) => {
  const [data, set] = useState<ListDataType | null>(null);

  return (
    <ListDataContext.Provider value={[data, set, () => set(null)]}>
      {children}
    </ListDataContext.Provider>
  );
};

export const useListData = () => useContext(ListDataContext);
