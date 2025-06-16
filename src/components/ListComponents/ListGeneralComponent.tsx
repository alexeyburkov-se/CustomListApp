import { useFieldArray, useForm } from "react-hook-form";
import { ListItemComponent } from "./ListItemComponent";
import { ListType } from "../../loaders/mainLoader";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { itemDragActivationDelayMS } from "../../misc/constants";
import { i18nextInstance } from "../../i18n/config";

const sensorActivationConstraint = {
  delay: itemDragActivationDelayMS,
  tolerance: 5,
} as const;

const itemsZIndex = 1;

const newItemData = {
  properties: [
    {
      propertyName: "titleExample",
      propertyType: "title" as const,
      propertyValue: i18nextInstance.t("listPage.addItem.title"),
    },
  ],
};

export interface ListGeneralComponentProps {
  data: ListType["main"];
  updateData: (data: ListType["main"]) => void;
  setUnsavedItemsStatus: Dispatch<SetStateAction<boolean>>;
}

export const ListGeneralComponent = ({
  data,
  updateData,
  setUnsavedItemsStatus,
}: ListGeneralComponentProps) => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { data: data },
  });
  const { fields, append } = useFieldArray({
    name: "data",
    control: control,
  });
  const [itemsChangedStatus, updateItemsChangedStatus] = useState(
    fields.map(() => false),
  );
  const { t } = useTranslation();

  const childrenItemsIsDirty = itemsChangedStatus.reduce(
    (acc, val) => acc || val,
    false,
  );

  const isDirty = formState.isDirty || childrenItemsIsDirty;

  const sensorM = useSensor(MouseSensor, {
    activationConstraint: sensorActivationConstraint,
  });

  const sensorT = useSensor(TouchSensor, {
    activationConstraint: sensorActivationConstraint,
  });

  const onSave = handleSubmit((data) => {
    updateData(data.data);
    setUnsavedItemsStatus(false);
  });

  const onAddNew = () => {
    append(newItemData);
    setUnsavedItemsStatus(true);
    updateItemsChangedStatus(itemsChangedStatus.concat([false]));
  };

  return (
    <DndContext sensors={useSensors(sensorM, sensorT)}>
      <Stack spacing={1}>
        <Box>
          <Button
            sx={[childrenItemsIsDirty || { display: "none" }]}
            onClick={onSave}
          >
            {t("listPage.saveChanges")}
          </Button>
        </Box>
        {fields.map((field, index) => (
          <ListItemComponent
            key={field.id}
            control={control}
            itemIndex={index}
            zIndex={itemsZIndex}
          />
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            zIndex: itemsZIndex,
          }}
        >
          <IconButton size="large" onClick={onAddNew}>
            {/* Add templates */}
            <Add fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
    </DndContext>
  );
};
