import { Control, useFieldArray } from "react-hook-form";
import { ListItemComponent } from "./ListItemComponent";
import { ListType } from "../loaders/mainLoader";
import { Dispatch, SetStateAction } from "react";

export interface ListGeneralComponentProps {
  control: Control<ListType>;
  setHasUnsavedItems: Dispatch<SetStateAction<boolean>>;
}

export const ListGeneralComponent = ({
  control,
}: ListGeneralComponentProps) => {
}: {
  control: Control<ListType>;
}) => {
  const { fields } = useFieldArray({
    name: "main",
    control: control,
  });

  return (
    <Stack spacing={1}>
      {fields.map((field, index) => (
        <ListItemComponent key={field.id} control={control} itemIndex={index} />
      ))}
    </Stack>
  );
};
