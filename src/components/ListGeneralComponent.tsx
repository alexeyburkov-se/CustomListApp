import { Control, useFieldArray } from "react-hook-form";
import { ListItemComponent } from "./ListItemComponent";
import { ListType } from "../loaders/mainLoader";
import { Box, IconButton, Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export interface ListGeneralComponentProps {
  control: Control<ListType>;
  setHasUnsavedItems: Dispatch<SetStateAction<boolean>>;
}

export const ListGeneralComponent = ({
  control,
}: ListGeneralComponentProps) => {
  const { fields, append } = useFieldArray({
    name: "main",
    control: control,
  });
  const { t } = useTranslation();

  return (
    <Stack spacing={1}>
      {fields.map((field, index) => (
        <ListItemComponent key={field.id} control={control} itemIndex={index} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          onClick={() => {
            append({
              properties: [
                {
                  propertyName: "titleExample",
                  propertyType: "title",
                  propertyValue: t("listPage.addItem.title"),
                },
              ],
            });
          }}
        >
          <Add />
        </IconButton>
      </Box>
    </Stack>
  );
};
