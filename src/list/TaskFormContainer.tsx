import React from "react";
import TaskFormDialog from "./TaskFormDialog";
import {TaskRequest} from "./dto";

import {useParams} from "react-router-dom";
import {getExceptionMessage} from "../utils/getExceptionMessage";
import useApiRequest from "../utils/useApiRequest";
import {addTask, editTask, getTask} from "./tasks";

type Params = {
  id: string | undefined;
}

const TaskFormContainer = () => {
  // const params = useParams<Params>();
  // const getMode = () => (params.id === 'add-task' ? 'add-task' : 'edit');
  // const mode = getMode();
  //
  // // pobieranie zadania
  // const {data: taskData} = useApiRequest(
  //   async () => {
  //     if (params.id != null) {
  //       return getTask(parseInt(params.id!));
  //     }
  //     return null;
  //   }, [params.id],
  // );
  //
  // // zapisywanie zadań
  // const onSaveTask = async (request: TaskRequest) => {
  //   if (mode === 'edit') {
  //     try {
  //       await editTask(parseInt(params.id as string), request);
  //     } catch (e) {
  //       const error = await getExceptionMessage(e);
  //     }
  //   } else {
  //     try {
  //       await addTask(request);
  //     } catch (e) {
  //       const error = await getExceptionMessage(e);
  //     }
  //   }
  // }


  // return <TaskFormDialog
  //   // dataTask={taskData}
  //   onSubmitTask={onSaveTask}
  // />

}

export default TaskFormContainer;