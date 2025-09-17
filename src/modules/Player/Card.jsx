import { CiEdit } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "../theme/css/card.css";

export const Card = ({
  item,
  isExpanded,
  onExpand,
  onCollapse,
  onEdit,
  onDelete,
}) => {
  // console.log("Item received:", item);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedData, setEditedData] = useState({ ...item });

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

  // const updatePlayer = useMutation({
  //   mutationFn: async (updatedItem) => {
  //     if (!updatedItem.playerID) {
  //       throw new Error("playerID отсутствует");
  //     }

  //     const response = await fetch(
  //       `http://localhost:3005/player/${updatedItem.playerID}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(processImagePaths(updatedItem)),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Ошибка обновления: ${response.status} - ${errorText}`);
  //     }

  //     return response.json();
  //   },
  //   onSuccess: () => {
  //     refetchPlayers();
  //     setIsEditing(false);
  //     alert("Данные игрока обновлены!");
  //   },
  //   onError: (error) => {
  //     console.error("Ошибка при обновлении:", error);
  //     alert(`Ошибка при обновлении: ${error.message}`);
  //   },
  // });

  // const deletePlayer = useMutation({
  //   mutationFn: async (playerID) => {
  //     if (!playerID) {
  //       throw new Error("Невозможно удалить: playerID отсутствует");
  //     }

  //     const response = await fetch(`http://localhost:3005/player/${playerID}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Ошибка удаления: ${response.status} - ${errorText}`);
  //     }
  //   },
  //   onSuccess: () => {
  //     refetchPlayers();
  //     alert("Игрок удалён");
  //   },
  //   onError: (error) => {
  //     console.error("Ошибка при удалении:", error);
  //     alert(`Ошибка при удалении: ${error.message}`);
  //     console.log("refetchPlayers:", refetchPlayers);
  //     console.log("typeof refetchPlayers:", typeof refetchPlayers);
  //   },
  // });

  // const handleEdit = () => {
  //   setIsEditing(true);
  //   setEditedData({ ...item });
  // };

  // const handleSave = () => {
  //   updatePlayer.mutate(editedData);
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  //   setEditedData({ ...item });
  // };

  // const handleDelete = () => {
  //   if (!item.playerID) {
  //     alert("Не удалось определить ID игрока");
  //     console.error("item без playerID:", item);
  //     return;
  //   }

  //   if (window.confirm("Вы уверены, что хотите удалить этого игрока?")) {
  //     deletePlayer.mutate(item.playerID);
  //   }
  // };

  // const handleInputChange = (field, value) => {
  //   setEditedData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  return (
    <div className={`card ${isExpanded ? "card--expanded" : ""}`}>
      <div className="headerCard">
        <CiEdit
          onClick={() => onEdit?.(item)}
          title="Редактировать"
          style={{ cursor: "pointer" }}
        />
        {/* <IoMdHeartEmpty
          title="Добавить в избранное"
          style={{ cursor: "pointer" }}
        /> */}
        <MdOutlineDeleteSweep
          onClick={onDelete}
          title="Удалить"
          style={{ cursor: "pointer" }}
        />
      </div>

      <img src={item.path} alt="playerPhoto" />

      <nav className="cardInfo">
        {/* Только просмотр, без редактирования */}
        <div className="cardDat--name">{item.playerName}</div>
        <div className="cardData">
          <img src={item.pathClub} alt="club" />
          <div className="cardClub">{item.clubName}</div>
        </div>
        <div className="cardData">Agent: {item.agentName}</div>
        <div className="cardData">Role: {item.roleName}</div>
        <div className="cardData">Age: {item.playerAge}</div>
        <div className="cardData">National: {item.playerNational}</div>
        <div className="cardData">Foot: {item.playerFoot}</div>
        <div className="cardData">Salary: {item.playerSalary}</div>

        <button
          className="btn"
          onClick={(e) => {
            e.stopPropagation();
            isExpanded ? onCollapse() : onExpand();
          }}
        >
          {isExpanded ? "Свернуть" : "Подробнее"}
        </button>
      </nav>
    </div>
  );
};

export default Card;
