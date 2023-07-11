import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TaskForm = () => {
  const users = useSelector((state) => state?.auth?.user?.users);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignTo, setAssignedTo] = useState("");
  const dispatch = useDispatch();
  const handleCreateTask = () => {
  };
  return (
    <form className="task-form">
      <h2>Create Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
        required
      />
      <select value={assignTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option key={"default"} value={"default"}>
          {"Assign to"}
        </option>
        {users &&
          users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
      </select>
      <button onClick={handleCreateTask}>Create Task</button>
    </form>
  );
};

export default TaskForm;
