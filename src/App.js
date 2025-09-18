import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerCardPage from "../src/modules/Player/PlayerCardPage";
import { Layout } from "./modules/layout";
import Card from "./modules/Player/Card";
import GIF from "./img/loadGIF.gif";
import "./App.css";
import ClubCardPage from "./modules/Club/ClubCardPage";
import AuthLogin from "./modules/Authorize/AuthLogin";
import Login from "./modules/Authorize/Login";

const queryClient = new QueryClient();

function AppContent(props) {
  const { smbd, setSmbd, user, setUser } = props;
  // const [user, setUser] = useState(null);
  return (
    <Layout
      showModalCart={false}
      smbd={smbd}
      setSmbd={setSmbd}
      user={user}
      setUser={setUser}
    />
  );
}

function HomePage() {
  return (
    <div className="homePage">
      <nav className="homePage-wrapper">
        <div className="mainText">
          Добро пожаловать на наш локальный сайт для просмотра Ваших любимых
          игроков!
        </div>
        <div className="detailsText">
          Данный сайт сделан на голом энтузиазме Павла, а также помощи его
          знакомых и Никиты
        </div>
        <img src={GIF} alt="loadGIF" />
      </nav>
    </div>
  );
}

function App() {
  const [showModalCart, setShowModalCart] = useState(false);
  const [user, setUser] = useState(null);
  const [smbd, setSmbd] = useState(0);

  useEffect(() => {
    const fetchPlayersCount = async () => {
      try {
        const response = await fetch("http://localhost:3005/player");
        if (response.ok) {
          const data = await response.json();
          setSmbd(data.length);
        }
      } catch (error) {
        console.error("Ошибка загрузки количества игроков:", error);
        setSmbd(0);
      }
    };

    fetchPlayersCount();
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent
            smbd={smbd}
            setSmbd={setSmbd}
            user={user}
            setUser={setUser}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="players"
              element={<PlayerCardPage setSmbd={setSmbd} />}
            />
            <Route path="clubs" element={<ClubCardPage setSmbd={setSmbd} />} />
            <Route
              path="login"
              element={
                <Login setUser={setUser} user={user} setShowLogin={() => {}} />
              }
            />
            <Route
              path="register"
              element={
                <AuthLogin
                  setUser={setUser}
                  user={user}
                  setShowLogin={() => {}}
                />
              }
            />
          </Routes>
          {showModalCart && <Card setShowModalCart={setShowModalCart} />}
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}
export default App;
