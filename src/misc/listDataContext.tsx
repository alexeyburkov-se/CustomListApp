import { z } from "zod";
import { ListV1ZodValidator } from "../loaders/loaderV1/fileSchema";
import { createContext, useContext, useState } from "react";

type ListDataType = z.infer<typeof ListV1ZodValidator>;

interface ProvideListDataContext {
  data: ListDataType | null;
  set: (d: ListDataType) => void;
  reset: () => void;
}

const ListDataContext = createContext<ProvideListDataContext | null>(null);

export const ListDataProvider = ({ children }: { children: JSX.Element }) => {
  const [data, set] = useState<ListDataType | null>(null);

  return (
    <ListDataContext.Provider value={{ data, set, reset: () => set(null) }}>
      {children}
    </ListDataContext.Provider>
  );
};

export const useListData = () => useContext(ListDataContext);
