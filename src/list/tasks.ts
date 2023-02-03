import {BasicResponse, TaskRequest, TaskResponse} from "./dto";
import {apiRequest, basicRequest} from "../utils/ApiClient";

export function addTask(values: TaskRequest) {
  return basicRequest<BasicResponse>({
    url: `/tasks`,
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function editTask(taskId: string | number, taskData: TaskRequest) {
  return basicRequest<BasicResponse>({
    url: `/tasks/${taskId}`,
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
}

export function deleteTask(taskId: number) {
  return basicRequest<BasicResponse>({
    url: `/tasks/${taskId}`,
    method: 'DELETE',
  });
}

export function getTask(taskId: string | number) {
  return apiRequest<TaskResponse>({
    method: 'GET',
    path: `/tasks/${taskId}`,
  });
}

export function getAllTasks() {
  return apiRequest<TaskResponse[]>({
    method: 'GET',
    path: `/api/tasks`,
  });
}

export function getListTasks(listId: string | number) {
  return apiRequest<TaskResponse[]>({
    method: 'GET',
    path: `/tasks/list/${listId}`,
  });
}
