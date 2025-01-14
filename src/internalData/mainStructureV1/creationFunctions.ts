import { z } from "zod";
import { allListsDataKeyV1, allListsDataShapeV1ZodValidator, defaultDataV1, listDataKeyV1 } from "./dataSchemas";

export const createEmptyListV1 = (): string => {
  const allListsData = JSON.parse(
    localStorage.getItem(allListsDataKeyV1()) ?? defaultDataV1
  ) as z.infer<typeof allListsDataShapeV1ZodValidator>;
  allListsData.c += 1;
  allListsData.l += 1;
  const listKey = listDataKeyV1(allListsData.l);
  localStorage.setItem(allListsDataKeyV1(), JSON.stringify(allListsData));
  localStorage.setItem(
    listKey,
    JSON.stringify('{"v":"1","c":0,"l":0,"n":"New list"}')
  );
  return listKey;
};
