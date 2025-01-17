import { useEffect } from "react";
import { useListData } from "../misc/listDataContext";
import { useNavigate } from "react-router";

export const ListPage = () => {
  const [data] = useListData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) navigate("/home");
  });

  return data ? <>List</> : <>Redirecting</>;
};

export const ListPlaceholderPage = () => {
  return <>PlaceHolderList</>;
};
