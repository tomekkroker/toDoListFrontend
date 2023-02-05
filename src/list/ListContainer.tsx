import React, {useEffect, useRef, useState} from "react";
import ListComponent from "./ListComponent";
import {ListResponse} from "./dto";
import {LISTS} from "../utils/routeNames";
import {useNavigate} from "react-router-dom";
import {getExceptionMessage} from "../utils/getExceptionMessage";
import {deleteList} from "./lists";
import {Toast} from "primereact/toast";

const ListContainer = () => {

  const navigate = useNavigate();
  const [listOfTasks, setListOfTasks] = useState<ListResponse[]>([]);
  const [isRefreshLists,
    setIsRefreshLists] = useState<boolean>(false);
  const refreshLists = () => setIsRefreshLists(!isRefreshLists);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchData = async () => {
      // pobieranie list
      const lists = await fetch('/lists');
      const bodyList = await lists.json();
      setListOfTasks(bodyList);
    }
    fetchData();
  }, [isRefreshLists]);

  const handleAddClick = () => {
    navigate(`add-list`);
  }

  const handleEditClick = (row: ListResponse) => {
    navigate(`${LISTS}/${row.id}`);
  };

  const handleDeleteClick = async (row: ListResponse) => {
    if (row?.id) {
      try {
        await deleteList(row.id);
        refreshLists();
        toast.current?.show({ severity: 'success', summary: 'Pomyślnie usunięto listę'});
      } catch (e) {
        const error = await getExceptionMessage(e);
        toast.current?.show({ severity: 'error', summary: error});
      }
    }
  }

  return <ListComponent
    listOfTasks={listOfTasks}
    handleAddClick={handleAddClick}
    handleEditClick={handleEditClick}
    handleDeleteClick={handleDeleteClick}
    toastRef={toast}
  />
}

export default ListContainer;