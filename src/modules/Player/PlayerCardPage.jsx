import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import RoleFilter from "../../components/Filters/RoleFilter";
import Card from "../Player/Card";
import { PlayerFormCard } from "./PlayerFormCard";
import "../theme/css/player.css";
import "../theme/css/role.css";

export const PlayerCardPage = (props) => {
  const { setSmbd = () => {} } = props;
  const [expandedCard, setExpandedCard] = useState(null);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showFormCard, setShowFormCard] = useState(false);

  const handleExpand = (itemId) => {
    setExpandedCard(itemId);
  };

  const handleCollapse = () => {
    setExpandedCard(null);
  };

  const handleEdit = (player) => {
    setSelectedPlayer(player);
    setShowFormCard(true);
  };

  const handleAdd = () => {
    setSelectedPlayer(null);
    setShowFormCard(true);
  };

  const closeForm = () => {
    setSelectedPlayer(null);
    setShowFormCard(false);
  };

  const { getValues, register } = useForm({});
  // Данные из БЕКа по игрокам
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["playerData1"],
    queryFn: () =>
      fetch("http://localhost:3005/player").then(async (res) => {
        const result = await res.json();
        setSmbd(result?.length);
        return result;
      }),
  });

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubsData"],
    queryFn: () =>
      fetch("http://localhost:3005/club").then((res) => res.json()),
  });

  const { data: agents = [] } = useQuery({
    queryKey: ["agentsData"],
    queryFn: () =>
      fetch("http://localhost:3005/agents").then((res) => res.json()),
  });

  const { data: roles = [] } = useQuery({
    queryKey: ["rolesData"],
    queryFn: () =>
      fetch("http://localhost:3005/role").then((res) => res.json()),
  });

  const processImagePaths = (playerData) => {
    const processPath = (path) => {
      if (!path) return null;
      if (path.includes("img/")) return path;
      const fileName = path.split("\\").pop().split("/").pop();
      return `img/${fileName}`;
    };

    return {
      ...playerData,
      path: processPath(playerData.path),
      pathClub: processPath(playerData.pathClub),
    };
  };

  // CRUD по игрокам
  const addPlayer = useMutation({
    mutationFn: (item) =>
      fetch(`http://localhost:3005/player`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processImagePaths(item)), // {...item, path: `img/${item.path}`, pathClub: `img/${item.path}`}
      }),
  });

  const updatePlayer = useMutation({
    mutationFn: (item) =>
      fetch(`http://localhost:3005/player/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          processImagePaths(item)
          //   {
          //   ...item,
          //   path: `img/${item.path}`,
          //   pathClub: `img/${item.path}`,
          // }
        ),
      }),
  });

  const deletePlayer = useMutation({
    mutationFn: (id) =>
      fetch(`http://localhost:3005/player/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      refetch();
      alert("Игрок удалён");
    },
    onError: () => {
      alert("Ошибка при удалении");
    },
  });

  const handleSave = (playerData) => {
    const preparedData = {
      ...playerData,
      roleName: playerData.roleName
        ? parseInt(playerData.roleName.roleID || playerData.roleName)
        : null,
      agentName: playerData.agentName
        ? parseInt(playerData.agentName.agentID || playerData.agentName)
        : null,
      clubName: playerData.clubName
        ? parseInt(playerData.clubName.clubID || playerData.clubName)
        : null,
    };

    if (selectedPlayer) {
      updatePlayer.mutate({
        ...preparedData,
        playerID: selectedPlayer.playerID,
      });
    } else {
      addPlayer.mutate(preparedData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Удалить этого игрока?")) {
      deletePlayer.mutate(id);
    }
  };

  useEffect(() => {
    refetch();
  }, [addPlayer.isSuccess, updatePlayer.isSuccess, deletePlayer.isSuccess]);

  useEffect(() => {
    if (!isPending && data && data.length > 0) {
      setFilteredPlayers(data);
    }
  }, [data, isPending]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <div className="headerLeft">
            <button className="add-button" onClick={handleAdd}>
              Добавить игрока
            </button>
          </div>
        </div>
        <div className="search">
          <div className="searchLeft">
            <input
              type="text"
              placeholder="Найти игрока или клуб"
              className="searchInp"
            />
          </div>
          <div className="searchRight">
            <RoleFilter players={data || []} onFilter={setFilteredPlayers} />
          </div>
        </div>
        <div className="card--container">
          {isPending ? (
            <p>Загрузка игроков...</p>
          ) : filteredPlayers.length > 0 ? (
            filteredPlayers.map((item) => (
              <Card
                key={item.playerID}
                item={item}
                isExpanded={expandedCard === item.playerID}
                onExpand={() => handleExpand(item.playerID)}
                onCollapse={handleCollapse}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.playerID)}
              />
            ))
          ) : (
            <p className="no-players">Игроки не найдены</p>
          )}
        </div>
        {expandedCard !== null && (
          <div className="overlay" onClick={handleCollapse}></div>
        )}
        {showFormCard && (
          <PlayerFormCard
            selected={selectedPlayer}
            closeForm={closeForm}
            handleSave={handleSave}
            clubs={clubs}
            agents={agents}
            roles={roles}
          />
        )}
      </div>
    </div>
  );
};
export default PlayerCardPage;
