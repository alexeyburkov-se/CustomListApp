import { Navigate, useBlocker } from "react-router";
import { ListType } from "../loaders/mainLoader";
import { useForm } from "react-hook-form";
import { Button, Container, Divider, Stack, Toolbar } from "@mui/material";
import { useListData } from "../misc/contexts/listDataContext";
import { ListGeneralSettings } from "../components/ListComponents/ListGeneralSettings";
import { ListGeneralComponent } from "../components/ListComponents/ListGeneralComponent";
import { useEffect, useState } from "react";
import { LeaveRouteModalDialog } from "../components/LeaveRouteModalDialog";
import { useTranslation } from "react-i18next";

interface ListPageInternalProps {
  data: ListType;
}

const ListPageInternal = ({ data }: ListPageInternalProps) => {
  const { formState, getValues, setValue } = useForm<ListType>({
    defaultValues: data,
  });
  const { t } = useTranslation();
  const [hasUnsavedItems, setHasUnsavedItems] = useState(false);

  useEffect(() => {
    const handler =
      formState.isDirty || hasUnsavedItems
        ? (event: BeforeUnloadEvent) => event.preventDefault()
        : () => ({});

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [hasUnsavedItems, formState]);

  const blocker = useBlocker(formState.isDirty || hasUnsavedItems);

  return (
    <>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Button>Save</Button>
        <Button>Close</Button>
      </Toolbar>
      <Container>
        <form>
          <Stack spacing={3}>
            <ListGeneralSettings />
            <Divider />
            <ListGeneralComponent
              data={getValues().main}
              setUnsavedItemsStatus={setHasUnsavedItems}
              updateData={(data) =>
                setValue("main", data, { shouldDirty: true })
              }
            />
          </Stack>
        </form>
      </Container>
      <LeaveRouteModalDialog
        open={blocker.state == "blocked"}
        stayAction={blocker.reset!}
        leaveAction={blocker.proceed!}
        title={t("alerts.routeLeaving.listPage.title")}
        description={t("alerts.routeLeaving.listPage.description")}
      />
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
