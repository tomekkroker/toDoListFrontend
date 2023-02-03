import {BasicResponse, ListRequest, ListResponse} from "./dto";
import {apiRequest, basicRequest} from "../utils/ApiClient";

export function addList(values: ListRequest) {
  return basicRequest<BasicResponse>({
    url: `/lists`,
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function editList(listId: string | number, listData: ListRequest) {
  return basicRequest<BasicResponse>({
    url: `/lists/${listId}`,
    method: 'PUT',
    body: JSON.stringify(listData),
  });
}

export function deleteList(listId: number) {
  return basicRequest<BasicResponse>({
    url: `/lists/${listId}`,
    method: 'DELETE',
  });
}

export function getList(listId: string | number) {
  return apiRequest<ListResponse>({
    method: 'GET',
    path: `/lists/${listId}`,
  });
}

export function getAllList() {
  return apiRequest<ListResponse[]>({
    method: 'GET',
    path: `/api/lists`,
  });
}
