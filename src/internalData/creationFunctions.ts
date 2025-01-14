export const createNewList = (): string => {
  
  const allListsData = JSON.parse(
    localStorage.getItem(allListsDataKeyV1()) ?? '{"v":"1","c":0,"l":0}',
  ) as AllListsDataShapeV1;
  allListsData.c += 1;
  allListsData.l += 1;
  const listKey = listDataKey(allListsData.l);
  localStorage.setItem(allListsDataKeyV1(), JSON.stringify(allListsData));
  localStorage.setItem(listKey, JSON.stringify('{"v":"1","c":0,"l":0,"n":"New list"}'));
  return listKey;
};
