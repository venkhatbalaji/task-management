export const getTasksRequest = () => ({
  type: "GET_TASKS_REQUEST",
});

export const getTasksSuccess = (tasks) => ({
  type: "GET_TASKS_SUCCESS",
  payload: tasks,
});

export const getTasksFailure = (error) => ({
  type: "GET_TASKS_FAILURE",
  payload: error,
});