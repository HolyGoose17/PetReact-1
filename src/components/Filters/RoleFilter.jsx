import { useEffect, useState } from "react";

export const RoleFilter = ({ players, onFilter }) => {
  const [roles, setRoles] = useState([]);
  const [activeRole, setActiveRole] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3005/role")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRoles(data);
        }
      })
      .catch(() => {
        throw new Error("Ошибка загрузки ролей");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (roleName) => {
    setActiveRole(roleName);

    if (!roleName || roleName === "All") {
      onFilter(players);
      return;
    }

    const filtered = players.filter((player) => player.roleName === roleName);

    onFilter(filtered);
  };

  if (loading) {
    return <div className="role-filter">Загрузка ролей...</div>;
  }

  return (
    <div className="role-filter">
      <button
        type="button"
        className={`btnSearch ${activeRole === "All" ? "active" : ""}`}
        onClick={() => handleFilter("All")}
      >
        All
      </button>
      {roles.map((role) => (
        <button
          key={role.roleID}
          type="button"
          className={`btnSearch ${
            activeRole === role.roleName ? "active" : ""
          }`}
          onClick={() => handleFilter(role.roleName)}
        >
          {role.roleName}
        </button>
      ))}
    </div>
  );
};

export default RoleFilter;
