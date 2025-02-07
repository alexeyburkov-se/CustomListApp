import { Box, Checkbox } from "@mui/material";

export const CheckBoxPropertyComponent = ({
  value,
  name,
}: {
  value: boolean;
  name: string;
}) => {
  return <Box><Checkbox checked={value} /></Box>;
};
