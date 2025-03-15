import { InputBase } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { ListType } from "../../loaders/mainLoader";

export const TextPropertyComponent = (
  props: UseControllerProps<ListType, `main.${number}.properties.${number}`>,
) => {
  const c = useController(props);

  return <InputBase multiline value={c.field.value.propertyValue} />;
};
