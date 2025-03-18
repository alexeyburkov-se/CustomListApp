import { Control, useFieldArray } from "react-hook-form";
import { ListType } from "../../loaders/mainLoader";
import { Box, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ItemPropertyComponent } from "./ItemPropertyComponent";
import { useDraggable } from "@dnd-kit/core";
// todo add darkening of content
// todo add hover animation for collapse
// todo sync transition times

export interface ListItemComponentProps {
  itemIndex: number;
  control: Control<ListType>;
  zIndex: number;
}

export const ListItemComponent = ({
  itemIndex,
  control,
  zIndex,
}: ListItemComponentProps) => {
  const [expanded, setExpanded] = useState(false);

  const { fields } = useFieldArray({
    name: `main.${itemIndex}.properties`,
    control,
  });

  const { listeners, setNodeRef, transform, isDragging, active } = useDraggable(
    {
      id: `listItem${itemIndex}`,
      data: {
        type: "listItem",
        index: itemIndex,
      },
    },
  );

  const dropMode = !!active && !isDragging;
  const dragMode = !active;

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      sx={[
        dragMode && {
          touchAction: "manipulation",
        },
        {
          zIndex: zIndex + (isDragging ? 1 : 0),
        },
        transform && {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        },
      ]}
    >
      <ListItemPaper isDragging={isDragging}>
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
                name={`main.${itemIndex}.properties.${index}`}
                control={control}
              />
            ))}
          </Stack>
        </Collapse>
      </ListItemPaper>
    </Box>
  );
};
