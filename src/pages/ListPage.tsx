import { Navigate } from "react-router";
import { ListType } from "../loaders/mainLoader";
import { useFieldArray, useForm } from "react-hook-form";
import { ListItemComponent } from "../components/ListItemComponent";
import { Button, Collapse, Container, Paper, Stack } from "@mui/material";
import { useListData } from "../misc/listDataContext";
import { useState } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";

const ListPageInternal = ({ data }: { data: ListType }) => {
  const { control } = useForm<ListType>({
    defaultValues: data,
  });
  const { fields } = useFieldArray({
    name: "main",
    control,
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <Container>
      <form>
        <Stack spacing={3}>
          <Paper elevation={1}>
            <Stack>
              <Button onClick={() => setSettingsOpen(!settingsOpen)}>
                General settings
                <KeyboardArrowUp
                  sx={[
                    { transition: "0.3s" }, // todo make equal transition for collapse and arrow
                    settingsOpen
                      ? {
                          transform: "rotate(0)",
                        }
                      : {
                          transform: "rotate(-180deg)",
                          opacity: 0,
                        },
                  ]}
                />
              </Button>
              <Collapse in={settingsOpen}>Some settings</Collapse>
            </Stack>
          </Paper>
          {fields.map((field, index) => (
            <ListItemComponent
              key={field.id}
              data={field}
              control={control}
              index={index}
            />
          ))}
        </Stack>
      </form>
    </Container>
  );
};

export const ListPage = () => {
  const [listData] = useListData();
  return listData ? (
    <ListPageInternal data={listData} />
  ) : (
    <Navigate to={"/home"} replace />
  );
};

export const ListPlaceholderPage = () => {
  return <>PlaceHolderList</>;
};
