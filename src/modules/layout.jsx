import { Link, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { Button } from "../components/Buttons/Buttons";
import { Login } from "./Authorize/Login";
import AuthLogin from "./Authorize/AuthLogin";
import { loadToken, clearToken } from "./utils/utils";
import { USER_TYPE } from "./utils/constants";

export function Layout(props) {
  const {
    smbd,
    setSmbd,
    setShowModalCart = () => {},
    showModalCart = false,
    user,
    setUser = () => {},
  } = props;
  const [showLogin, setShowLogin] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const [authLoading, setAuthLoading] = useState(true);
  const userChoice = [];

  const { isLoading: checkLoading } = useQuery({
    queryKey: ["check", loadToken()],
    queryFn: () => {
      const token = loadToken();
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return Promise.resolve(null);
      }

      return fetch("http://localhost:3005/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          console.log("Check response status:", res.status);
          if (!res.ok) {
            clearToken();
            const result = await res.json();
            console.log("Check response data:", result); // 👈 смотри, что пришло
            setUser(result);
            setAuthLoading(false);
            throw new Error("Неавторизован");
          }
          const result = await res.json();
          setUser(result);
          setAuthLoading(false);
          return result;
        })
        .catch(() => {
          clearToken();
          setUser(null);
          setAuthLoading(false);
          return null;
        });
    },
    retry: false,
  });

  useQuery({
    queryKey: ["playersCount"],
    queryFn: () =>
      fetch("http://localhost:3005/player").then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки игроков");
        return res.json();
      }),
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        setSmbd(data.length);
      }
    },
    onError: () => {
      setSmbd(0);
    },
  });

  const isAdminRole = user && user.role === USER_TYPE.ADMIN;

  return (
    <div className="layout">
      <nav className="layoutNav">
        <Link className="layout-logo" to="/">
          <img src="fav.ico" alt="logo" />
        </Link>
        <div className="layoutText">Проверьте своего любимого игрока</div>
        <div className="layoutLinks">
          <Link to="/players">Игроки</Link>
          <Link to="/clubs">Клубы</Link>
          {isAdminRole ? <Link to="/users">Пользователи</Link> : null}
        </div>
        <div className="layoutRight">
          <div className="layoutPlayers">
            <div className="playersNum">{smbd || null}</div>
            <div className="playersLogo">
              <IoPeopleOutline />
              <div className="playersTxt">Всего игроков</div>
            </div>
          </div>
          <div className="layoutChoice">
            <div className="choiceNum">{userChoice.length}</div>
            <div className="choiceLogo">
              <IoMdHeartEmpty />
              <div className="choiceTxt">Ваш выбор</div>
            </div>
          </div>
        </div>
        <div className="layout-auth">
          {showLogin ? (
            <div className="login-popup-overlay">
              <Login
                setShowLogin={setShowLogin}
                setUser={setUser}
                user={user}
              />
            </div>
          ) : null}
          {authLoading ? (
            <div>Загрузка...</div>
          ) : user ? (
            <>
              <div className="layout-auth-status">{user.login}</div>
              <Button
                label="Выйти"
                callback={() => {
                  clearToken();
                  setUser(null);
                }}
              />
            </>
          ) : (
            <Link to="/login">
              <Button label="Sign in" />
            </Link>
          )}
          <Link to="/register">
            <Button label="Sign up" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
