import { Control } from "react-hook-form";
import { ListType } from "../loaders/mainLoader";
import { TextPropertyComponent } from "./ItemPropertyVariants/TextPropertyComponent";
import { CheckBoxPropertyComponent } from "./ItemPropertyVariants/CheckBoxPropertyComponent";

export const ItemPropertyComponent = ({
  data,
  control,
}: {
  data: ListType["main"][0]["properties"][0];
  control: Control<ListType>;
}) => {
  switch (data.propertyType) {
    case "text":
      return (
        <TextPropertyComponent
          value={data.propertyValue}
          name={data.propertyName}
        />
      );
    case "label":
      return (
        <TextPropertyComponent
          value={data.propertyValue}
          name={data.propertyName}
        />
      );
    case "title":
      return (
        <TextPropertyComponent
          value={data.propertyValue}
          name={data.propertyName}
        />
      );
    case "checkBox":
      return (
        <CheckBoxPropertyComponent
          value={data.propertyValue}
          name={data.propertyName}
        />
      );
    case "rating":
      return (
        <TextPropertyComponent
          value={data.propertyValue}
          name={data.propertyName}
        />
      );
    case "ratingRatio":
      return (
        <TextPropertyComponent
          value={`${data.propertyValue[0]}/${data.propertyValue[1]}`}
          name={data.propertyName}
        />
      );
  }
};
