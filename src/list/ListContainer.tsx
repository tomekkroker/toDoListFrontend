import React, {useEffect, useState} from "react";
import ListComponent from "./ListComponent";
import {ListResponse} from "./dto";
import {LISTS} from "../utils/routeNames";
import {useNavigate} from "react-router-dom";
import {getExceptionMessage} from "../utils/getExceptionMessage";
import {deleteList} from "./lists";

const ListContainer = () => {

  const navigate = useNavigate();
  const [listOfTasks, setListOfTasks] = useState<ListResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // pobieranie list
      const lists = await fetch('/lists');
      const bodyList = await lists.json();
      setListOfTasks(bodyList);
    }
    fetchData();
  }, []);

  const handleAddClick = () => {
    navigate(`add-list`);
  }

  const handleEditClick = (row: ListResponse) => {
    navigate(`${LISTS}/${row.id}`);
  };

  const handleDeleteClick = async (row: ListResponse) => {
    if (row?.id) {
      try {
        console.log("usuwanie")
        await deleteList(row.id);
      } catch (e) {
        const error = await getExceptionMessage(e);
      }
    }
  }

  return <ListComponent
    listOfTasks={listOfTasks}
    handleAddClick={handleAddClick}
    handleEditClick={handleEditClick}
    handleDeleteClick={handleDeleteClick}
  />

}

export default ListContainer;