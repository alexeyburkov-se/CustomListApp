import { Input, InputBase, TextField } from "@mui/material";

export const TextPropertyComponent = ({
  value,
  name,
}: {
  value: string;
  name: string;
}) => {
  return <InputBase multiline value={value} />;
};
