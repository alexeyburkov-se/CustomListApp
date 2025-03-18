import { Control, useFieldArray } from "react-hook-form";
import { ListItemComponent } from "./ListItemComponent";
import { ListType } from "../../loaders/mainLoader";
import { Box, IconButton, Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export const itemDragActivationDelayMS = 500;

const sensorActivationConstraint = {
  delay: itemDragActivationDelayMS,
  tolerance: 5,
} as const;

const itemsZIndex = 1;

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

  const newItemData = {
    properties: [
      {
        propertyName: "titleExample",
        propertyType: "title" as const,
        propertyValue: t("listPage.addItem.title"),
      },
    ],
  };

  const sensorM = useSensor(MouseSensor, {
    activationConstraint: sensorActivationConstraint,
  });

  const sensorT = useSensor(TouchSensor, {
    activationConstraint: sensorActivationConstraint,
  });

  return (
    <DndContext sensors={useSensors(sensorM, sensorT)}>
      <Stack spacing={1}>
        {fields.map((field, index) => (
          <ListItemComponent
            key={field.id}
            control={control}
            itemIndex={index}
            zIndex={itemsZIndex}
          />
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", zIndex: itemsZIndex }}>
          <IconButton size="large" onClick={() => append(newItemData)}>
            <Add fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
    </DndContext>
  );
};
