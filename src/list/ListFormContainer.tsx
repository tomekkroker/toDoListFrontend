import React, {useRef, useState} from "react";
import ListFormComponent from "./ListFormComponent";
import {ListRequest, TaskRequest, TaskResponse} from "./dto";
import useApiRequest from "../utils/useApiRequest";
import {useNavigate, useParams} from "react-router-dom";
import {addList, editList, getList} from "./lists";
import {getExceptionMessage} from "../utils/getExceptionMessage";
import {addTask, deleteTask, editTask, getListTasks} from "./tasks";
import {Toast} from "primereact/toast";

type Params = {
  id: string | undefined;
}

const ListFormContainer: React.FC = () => {
  const [isTaskDialogOpen,
    setIsTaskDialogOpen] = useState<boolean>(false);
  const [isRefreshTasks,
    setIsRefreshTasks] = useState<boolean>(false);
  const [isRefreshLists,
    setIsRefreshLists] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<TaskResponse | null>(null);
  const params = useParams<Params>();
  const getMode = () => (params.id === 'add-list' ? 'create' : 'edit');
  const mode = getMode();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const refreshTasks = () => setIsRefreshTasks(!isRefreshTasks);
  const refreshLists = () => setIsRefreshLists(!isRefreshLists);

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
    }, [isTaskDialogOpen, isRefreshTasks],
  );

  const handleAddClick = () => {
    navigate(`add-task`);
  }

  // zapisywanie listy
  const onSaveList = async (request: ListRequest) => {
    if (mode === 'edit' && params.id) {
      try {
        await editList(params.id, request);
        refreshLists();
        toast.current?.show({ severity: 'error', summary: 'Pomyślnie zmodyfikowano listę'});
      } catch (e) {
        const error = await getExceptionMessage(e);
        toast.current?.show({ severity: 'error', summary: error});
      }
    } else {
      try {
        await addList(request);
        refreshLists();
        toast.current?.show({ severity: 'error', summary: 'Pomyślnie utworzono listę'});
      } catch (e) {
        const error = await getExceptionMessage(e);
        toast.current?.show({ severity: 'error', summary: error});
      }
    }
  }

  // zapisywanie zadań
  const onSaveTask = async (request: TaskRequest) => {
    if (taskData && taskData.id) {
      try {
        await editTask(taskData.id, request);
        refreshTasks();
        toast.current?.show({ severity: 'success', summary: 'Pomyślnie zedytowano zadanie'});
      } catch (e) {
        const error = await getExceptionMessage(e);
        toast.current?.show({ severity: 'error', summary: error});
      }
    } else {
      try {
        await addTask(request);
        refreshTasks();
        toast.current?.show({ severity: 'success', summary: 'Pomyślnie dodano zadanie'});
      } catch (e) {
        const error = await getExceptionMessage(e);
        toast.current?.show({ severity: 'error', summary: error});
      }
    }
  }

  const handleEditClick = (row: TaskResponse) => {
    setTaskData(row);
    setIsTaskDialogOpen(true);
  };

  const handleDeleteClick = async (row: TaskResponse) => {
    if (row?.id) {
      try {
        await deleteTask(row.id);
        refreshTasks();
        toast.current?.show({ severity: 'success', summary: 'Pomyślnie usunięto zadanie'});
      } catch (e) {
        const error = await getExceptionMessage(e);
        toast.current?.show({ severity: 'error', summary: error});
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
    toastRef={toast}
  />
}

export default ListFormContainer;