import { Control, useFieldArray } from "react-hook-form";
import { ListType } from "../loaders/mainLoader";

export const ListItemComponent = ({
  key,
  index,
  control,
}: {
  key: string;
  index: number;
  control: Control<ListType>;
}) => {
  const { fields } = useFieldArray({
    name: `main.${index}.properties`,
    control,
  });
  return <div key={key}></div>;
};
