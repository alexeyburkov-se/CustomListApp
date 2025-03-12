import { Button, styled } from "@mui/material";
import { ChangeEventHandler, PropsWithChildren } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type FileUploadButtonProps = PropsWithChildren<{
  onChange: ChangeEventHandler<HTMLInputElement>;
}>;

export const FileUploadButton = ({
  onChange,
  children,
}: FileUploadButtonProps) => {
  return (
    <Button component="label">
      {children}
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
};
