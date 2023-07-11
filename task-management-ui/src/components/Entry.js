import React, { useEffect, useState } from "react";
import { User } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { getPagePath } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/actions/authActions";

const EntryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [currentView, setCurrentView] = useState("signUp");
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`${getPagePath("/tasks")}`);
    }
  }, []);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const resp = await User.register(
        register.userName,
        register.password,
        register.email,
        register.userName
      );
      alert(resp?.message);
      setRegister({ userName: "", email: "", password: "" });
    } catch (err) {}
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const resp = await User.login(login.password, login.email);
      if (resp.success) {
        dispatch(loginSuccess({ email: login.email, token: resp.token }));
        navigate(`${getPagePath("/tasks")}`);
      }
      setLogin({ email: "", password: "" });
    } catch (err) {}
  };

  const changeView = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "signUp":
        return (
          <form onSubmit={handleRegister}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, userName: e.target.value })
                    }
                    type="text"
                    id="username"
                    required
                    value={register.userName}
                  />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
                    }
                    value={register.email}
                    type="email"
                    id="email"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
                    }
                    type="password"
                    id="password"
                    required
                    value={register.password}
                  />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={() => changeView("logIn")}>
              Have an Account?
            </button>
          </form>
        );
      case "logIn":
        return (
          <form onSubmit={handleLogin}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    onChange={(e) =>
                      setLogin({ ...login, email: e.target.value })
                    }
                    type="email"
                    id="email"
                    required
                    value={login.email}
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                    type="password"
                    id="password"
                    required
                    value={login.password}
                  />
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => changeView("signUp")}>
              Create an Account
            </button>
          </form>
        );
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => changeView("logIn")}>
              Go Back
            </button>
          </form>
        );
      default:
        break;
    }
  };

  return <section id="entry-page">{renderCurrentView()}</section>;
};

export default EntryPage;
