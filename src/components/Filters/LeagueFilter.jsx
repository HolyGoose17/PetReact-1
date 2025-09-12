import { useEffect, useState } from "react";

export const LeagueFilter = ({ clubs, onFilter }) => {
  const [leagues, setLeagues] = useState([]);
  const [activeLeague, setActiveLeague] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3005/league")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setLeagues(data);
        }
      })
      .catch(() => {
        throw new Error("Ошибка загрузки лиг");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (leagueName) => {
    setActiveLeague(leagueName);

    if (!leagueName || leagueName === "All") {
      onFilter(clubs);
      return;
    }

    const filtered = clubs.filter((club) => club.leagueName === leagueName);

    onFilter(filtered);
  };

  if (loading) {
    return <div className="role-filter">Загрузка лиг...</div>;
  }

  return (
    <div className="role-filter">
      <button
        type="button"
        className={`btnSearch ${activeLeague === "All" ? "active" : ""}`}
        onClick={() => handleFilter("All")}
      >
        All
      </button>
      {leagues.map((league) => (
        <button
          key={league.leagueID}
          type="button"
          className={`btnSearch ${
            activeLeague === league.leagueName ? "active" : ""
          }`}
          onClick={() => handleFilter(league.leagueName)}
        >
          {league.leagueName}
        </button>
      ))}
    </div>
  );
};

export default LeagueFilter;
