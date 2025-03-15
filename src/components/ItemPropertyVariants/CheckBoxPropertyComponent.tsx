import { Box, Checkbox } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { ListType } from "../../loaders/mainLoader";

export const CheckBoxPropertyComponent = (
  props: UseControllerProps<ListType, `main.${number}.properties.${number}`>,
) => {
  const c = useController(props);

  return (
    <Box>
      <Checkbox checked={c.field.value.propertyValue as boolean} />
    </Box>
  );
};
