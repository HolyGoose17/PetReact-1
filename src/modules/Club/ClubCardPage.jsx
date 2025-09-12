import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import LeagueFilter from "../../components/Filters/LeagueFilter";
import Club from "../Club/Club";
import "../theme/css/player.css";
import "../theme/css/role.css";

export const ClubCardPage = (props) => {
  const { setSmbd = () => {} } = props;
  const [expandedCard, setExpandedCard] = useState(null);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const handleExpand = (itemId) => {
    setExpandedCard(itemId);
  };
  const handleCollapse = () => {
    setExpandedCard(null);
  };
  const { getValues, register } = useForm({});
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["playerData1"],
    queryFn: () =>
      fetch("http://localhost:3005/club").then(async (res) => {
        const result = await res.json();
        return result;
      }),
  });

  useEffect(() => {
    if (!isPending && data && data.length > 0) {
      setFilteredClubs(data);
    }
  }, [data, isPending]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <div className="headerLeft"></div>
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
            <LeagueFilter clubs={data || []} onFilter={setFilteredClubs} />
          </div>
        </div>
        <div className="card--container">
          {isPending ? (
            <p>Загрузка клубов...</p>
          ) : filteredClubs.length > 0 ? (
            filteredClubs.map((item) => (
              <Club
                key={item.clubID}
                item={item}
                isExpanded={expandedCard === item.clubID}
                onExpand={() => handleExpand(item.clubID)}
                onCollapse={handleCollapse}
              />
            ))
          ) : (
            <p className="no-players">Клубы не найдены</p>
          )}
        </div>
        {expandedCard !== null && (
          <div className="overlay" onClick={handleCollapse}></div>
        )}
      </div>
    </div>
  );
};
export default ClubCardPage;
