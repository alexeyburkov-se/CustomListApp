import { allListsDataKey, AllListsDataShapeV1, listDataKey } from "./dataSchemas";

export const createNewList = (): string => {
  const allListsData = JSON.parse(
    localStorage.getItem(allListsDataKey()) ?? '{"v":"1","c":0,"l":0}',
  ) as AllListsDataShapeV1;
  allListsData.c += 1;
  allListsData.l += 1;
  const listKey = listDataKey(allListsData.l);
  localStorage.setItem(allListsDataKey(), JSON.stringify(allListsData));
  localStorage.setItem(listKey, JSON.stringify('{"v":"1","c":0,"l":0,"n":"New list"}'));
  return listKey;
};
