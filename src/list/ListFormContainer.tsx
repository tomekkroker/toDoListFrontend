import React, {useState} from "react";
import ListFormComponent from "./ListFormComponent";
import {ListRequest, TaskRequest, TaskResponse} from "./dto";
import useApiRequest from "../utils/useApiRequest";
import {useNavigate, useParams} from "react-router-dom";
import {addList, editList, getList} from "./lists";
import {getExceptionMessage} from "../utils/getExceptionMessage";
import {addTask, deleteTask, editTask, getListTasks} from "./tasks";

type Params = {
  id: string | undefined;
}

const ListFormContainer: React.FC = () => {
  const [isTaskDialogOpen,
    setIsTaskDialogOpen] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<TaskResponse | null>(null);
  const params = useParams<Params>();
  const getMode = () => (params.id === 'add-list' ? 'create' : 'edit');
  const mode = getMode();
  const navigate = useNavigate();


  // pobieranie listy
  const {data: listData} = useApiRequest(
    async () => {
      if (params.id !== undefined && params.id != 'add-list') {
        return getList(params.id);
      }
      return null;
    }, [params.id],
  );

  const {data: tasksData} = useApiRequest(
    async () => {
      if (params.id !== undefined && params.id != 'add-list') {
        return getListTasks(params.id);
      }
      return null;
    }, [isTaskDialogOpen],
  );

  const handleAddClick = () => {
    navigate(`add-task`);
  }

  // zapisywanie listy
  const onSaveList = async (request: ListRequest) => {
    if (mode === 'edit' && params.id) {
      try {
        const x = await editList(params.id, request);
      } catch (e) {
        const error = await getExceptionMessage(e);
      }
    } else {
      try {
        await addList(request);
      } catch (e) {
        const error = await getExceptionMessage(e);
      }
    }
  }

  // zapisywanie zadań
  const onSaveTask = async (request: TaskRequest) => {
    console.log(request)
    if (taskData && taskData.id) {
      try {
        console.log("edycja")
        await editTask(taskData.id, request);
      } catch (e) {
        const error = await getExceptionMessage(e);
      }
    } else {
      try {
        console.log("dodawanie")
        await addTask(request);
      } catch (e) {
        const error = await getExceptionMessage(e);
      }
    }
  }

  console.log(tasksData);

  const handleEditClick = (row: TaskResponse) => {
    setTaskData(row);
    setIsTaskDialogOpen(true);
  };

  const handleDeleteClick = async (row: TaskResponse) => {
    if (row?.id) {
      try {
        console.log("usuwanie")
        await deleteTask(row.id);
      } catch (e) {
        const error = await getExceptionMessage(e);
      }
    }
  }

  const headerList = () => {
    if (params.id == 'add-list') {
      return 'Dodawanie nowej listy'
    } else {
      return 'Dodawanie zadań do listy'
    }
  }

  const headerTask = () => {
    if (taskData && taskData.id) {
      return 'Edycja zadania';
    } else {
      return 'Dodawanie nowego zadania';
    }
  }

  const isTaskTableVisible = () => {
    if (params.id == 'add-list') {
      // edycja
      return true;
    } else {
      return false;
    }
  }

  return <ListFormComponent
    dataList={listData}
    onSubmitList={onSaveList}
    tasks={tasksData ?? []}
    handleAddClick={handleAddClick}
    handleEditClick={handleEditClick}
    handleDeleteClick={handleDeleteClick}
    setIsTaskFormDialog={setIsTaskDialogOpen}
    dataTask={taskData}
    isTaskFormDialog={isTaskDialogOpen}
    onSubmitTask={onSaveTask}
    listId={parseInt(params.id ? params.id : '')}
    headerList={headerList()}
    headerTask={headerTask()}
    isTaskTableVisible={isTaskTableVisible()}
  />
}

export default ListFormContainer;