import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksRequest } from "../../redux/actions/taskActions";
import { useNavigate } from "react-router-dom";
import { getPagePath } from "../../config/config";

const TaskList = () => {
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const error = useSelector((state) => state.task.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksRequest());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Task List</h2>
      {tasks && tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
