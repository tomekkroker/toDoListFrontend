import React, {useEffect, useState} from "react";
import ListComponent from "./ListComponent";
import {ListResponse} from "./dto";
import {LISTS} from "../utils/routeNames";
import {useNavigate} from "react-router-dom";

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

  return <ListComponent
    listOfTasks={listOfTasks}
    handleAddClick={handleAddClick}
    handleEditClick={handleEditClick}
  />

}

export default ListContainer;