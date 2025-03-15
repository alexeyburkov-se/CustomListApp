import { useController, UseControllerProps } from "react-hook-form";
import { ListType } from "../loaders/mainLoader";
import { TextPropertyComponent } from "./ItemPropertyVariants/TextPropertyComponent";
import { CheckBoxPropertyComponent } from "./ItemPropertyVariants/CheckBoxPropertyComponent";

export const ItemPropertyComponent = (
  props: UseControllerProps<ListType, `main.${number}.properties.${number}`>,
) => {
  const c = useController(props);

  switch (c.field.value.propertyType) {
    case "text":
      return <TextPropertyComponent {...props} />;
    case "label":
      return <TextPropertyComponent {...props} />;
    case "title":
      return <TextPropertyComponent {...props} />;
    case "checkBox":
      return <CheckBoxPropertyComponent {...props} />;
    case "rating":
      return <TextPropertyComponent {...props} />;
    case "ratingRatio":
      return <TextPropertyComponent {...props} />;
  }
};
