import { Navigate, useLocation } from "react-router";
import { z } from "zod";
import { ListType, ListZodValidator } from "../loaders/mainLoader";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ListItemComponent } from "../components/ListItemComponent";

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

const LocationValidator = z.object({
  listData: ListZodValidator,
});

export const ListPage = () => {
  const data = useLocation();
  const [validationResult] = useState(() =>
    LocationValidator.safeParse(data.state),
  );
  return validationResult.success ? (
    <ListPageInternal data={validationResult.data.listData} />
  ) : (
    <Navigate to={"/home"} replace />
  );
};

export const ListPlaceholderPage = () => {
  return <>PlaceHolderList</>;
};
