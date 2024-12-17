import { allListsDataKey, AllListsDataShapeV1 } from "./dataSchemas";

export const createNewList = (): string => {
  const allListsData = JSON.parse(
    localStorage.getItem(allListsDataKey) ?? '{"count":"0","lastId":"0"}'
  ) as AllListsDataShapeV1;
  allListsData.count += 1;
  allListsData.lastId += 1;
  const listId = `list_${allListsData.lastId}`;
  allListsData.listIds.push(listId);
  localStorage.setItem(allListsDataKey, JSON.stringify(allListsData));
  return listId
};
