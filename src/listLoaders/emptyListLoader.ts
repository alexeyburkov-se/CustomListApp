import { v4 as randomUuid } from "uuid";

export const createEmptyListV1 = () => {
    const listId = randomUuid();
    return listId;
}