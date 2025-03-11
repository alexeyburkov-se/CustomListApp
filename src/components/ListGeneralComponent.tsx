import { Control, useFieldArray } from "react-hook-form";
import { ListItemComponent } from "./ListItemComponent";
import { ListType } from "../loaders/mainLoader";
import { Stack } from "@mui/material";

export const ListGeneralComponent = ({
  control,
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
