import { Control, useFieldArray } from "react-hook-form";
import { ListType } from "../loaders/mainLoader";
import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
// todo add darkening of content
// todo add hover animation for collapse

export const ListItemComponent = ({
  index,
  data,
  control,
}: {
  index: number;
  data: ListType["main"][0];
  control: Control<ListType>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { fields } = useFieldArray({
    name: `main.${index}.properties`,
    control,
  });
  return (
    <Paper elevation={3}>
      <Collapse
        in={expanded}
        collapsedSize={"3em"}
        onClick={() => !expanded && setExpanded(true)}
      >
        <Stack>
          <Box sx={{display: "flex"}}>
            <Typography sx={{flex: 1}}>Title</Typography>
            <Box>
              <Button onClick={() => expanded && setExpanded(false)}>
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
              </Button>
            </Box>
          </Box>
          {fields.map((field, index) => (
            <div key={index}>prop {index}</div>
          ))}
        </Stack>
      </Collapse>
    </Paper>
  );
};
