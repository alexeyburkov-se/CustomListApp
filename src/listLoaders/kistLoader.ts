import { load } from "js-yaml";
import { BaseListShape, ListTypeV1 as ListShapeV1 } from "./listShape";

export enum ListLoadResult {
    Success,
    Error,
    UnknownVersion
}

const loadListV1 = (data: ListShapeV1): ListLoadResult => {
    return ListLoadResult.Success
}

export const loadList = async (file: File) => {
    const data = await file.text().then(str => load(str) as BaseListShape);// todo handle all errors
    switch (data.version) {
        case "1.0.0":
            return loadListV1(data as ListShapeV1)
        default:
            return ListLoadResult.UnknownVersion
    }
}