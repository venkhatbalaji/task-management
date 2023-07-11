import React, { useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskAnalytics from "./TaskAnalytics";
import "./task.scss";
import { User } from "../../api/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { getPagePath } from "../../config/config";

export default function TaskPage() {
  const auth = useSelector((state) => state?.auth);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`${getPagePath("/")}`);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("auth", auth);
    if (auth?.user?.token) {
      (async () => {
        const data = await User.getUsers(auth?.user?.token);
        console.log(data);
        dispatch(loginSuccess({ ...auth, users: data.users }));
      })();
    }
  }, [auth]);
  return (
    <div className="task-container">
      <TaskForm />
    </div>
  );
}
