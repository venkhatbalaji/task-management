const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_TASKS_REQUEST':
        return {
          ...state,
          loading: false,
        };
      case 'GET_TASKS_SUCCESS':
        return {
          ...state,
          tasks: action.payload,
          loading: false,
          error: null,
        };
      case 'GET_TASKS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  