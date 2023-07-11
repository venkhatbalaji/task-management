import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import EntryPage from "./components/Entry";
import TaskPage from "./components/task/index";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<EntryPage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
