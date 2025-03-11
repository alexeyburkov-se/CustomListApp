import { Navigate } from "react-router";
import { ListType } from "../loaders/mainLoader";
import { useForm } from "react-hook-form";
import { Button, Container, Divider, Stack, Toolbar } from "@mui/material";
import { useListData } from "../misc/contexts/listDataContext";
import { ListGeneralSettings } from "../components/ListGeneralSettings";
import { ListGeneralComponent } from "../components/ListGeneralComponent";
import { useEffect, useState } from "react";

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
    <>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Button>Save</Button>
        <Button>Edit list</Button>
        <Button>Close</Button>
      </Toolbar>
      <Container>
        <form>
          <Stack spacing={3}>
            <ListGeneralSettings />
            <Divider />
            <ListGeneralComponent control={control} />
          </Stack>
        </form>
      </Container>
    </>
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
