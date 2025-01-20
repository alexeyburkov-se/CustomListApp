import { Navigate } from "react-router";
import { ListType } from "../loaders/mainLoader";
import { useFieldArray, useForm } from "react-hook-form";
import { ListItemComponent } from "../components/ListItemComponent";
import { useListData } from "../misc/listDataContext";

const ListPageInternal = ({ data }: { data: ListType }) => {
  const { control } = useForm<ListType>({
    defaultValues: data,
  });
  const { fields } = useFieldArray({
    name: "main",
    control,
  });
  return (
    <form>
      {fields.map((field, index) => (
        <ListItemComponent key={field.id} control={control} index={index} />
      ))}
    </form>
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
