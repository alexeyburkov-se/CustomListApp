import { Navigate, useLocation } from "react-router";
import { z } from "zod";
import { ListZodValidator } from "../loaders/mainLoader";

const LocationValidator = z.object({
  listData: ListZodValidator
})

export const ListPage = () => {
  const data = useLocation();
  const validationResult = LocationValidator.safeParse(data.state);
  return validationResult.success ? <>List</> : <Navigate to={"/home"} replace={true}/>;
};

export const ListPlaceholderPage = () => {
  return <>PlaceHolderList</>;
};
