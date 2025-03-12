import { Control, useFieldArray } from "react-hook-form";
import { ListType } from "../loaders/mainLoader";
import { Box, Collapse, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ItemPropertyComponent } from "./ItemPropertyComponent";
// todo add darkening of content
// todo add hover animation for collapse

export const ListItemComponent = ({
  itemIndex,
  control,
}: {
  itemIndex: number;
  control: Control<ListType>;
}) => {
  const [expanded, setExpanded] = useState(false);

  const { fields } = useFieldArray({
    name: `main.${itemIndex}.properties`,
    control,
  });

  return (
    <Paper elevation={3}>
      <Collapse
        in={expanded}
        collapsedSize={"3em"}
        onClick={() => !expanded && setExpanded(true)}
      >
        <Stack spacing={1}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ flex: 1 }}>Title</Typography>
            <IconButton onClick={() => expanded && setExpanded(false)}>
              <KeyboardArrowDown
                sx={[
                  {
                    transition: "0.3s",
                  },
                  expanded
                    ? {
                        transform: "rotate(180deg)",
                        opacity: 1,
                      }
                    : {
                        transform: "rotate(0)",
                        opacity: 0,
                      },
                ]}
              />
            </IconButton>
          </Box>
          {fields.map((field, index) => (
            <ItemPropertyComponent
              key={field.id}
              data={field}
              control={control}
            />
          ))}
        </Stack>
      </Collapse>
    </Paper>
  );
};
