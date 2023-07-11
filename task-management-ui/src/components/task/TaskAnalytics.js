import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const TaskAnalytics = () => {
  const taskStatistics = useSelector((state) => state.task.taskStatistics);
  const taskTimeline = useSelector((state) => state.task.taskTimeline);
  const loading = useSelector((state) => state.task.loading);
  const error = useSelector((state) => state.task.error);
  const dispatch = useDispatch();


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Task Statistics</h2>
      <ul>
        {taskStatistics && taskStatistics.map((stat) => (
          <li key={stat.userId}>
            User: {stat.username}, Total Tasks Completed: {stat.totalTasks},
            Average Completion Time: {stat.avgCompletionTime}
          </li>
        ))}
      </ul>

      <h2>Task Timeline</h2>
      <ul>
        {taskTimeline && taskTimeline.map((entry) => (
          <li key={entry.month}>
            Month: {entry.month}, Tasks Completed: {entry.tasksCompleted}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAnalytics;
