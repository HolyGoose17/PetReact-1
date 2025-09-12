import "../../App.css";
import { IoMdHeartEmpty } from "react-icons/io";

export const Club = ({ item, isExpanded, onExpand, onCollapse }) => {
  return (
    <div
      className={`card ${isExpanded ? "card--expanded" : ""}`}
      style={{
        zIndex: isExpanded ? 1000 : 1,
      }}
    >
      <IoMdHeartEmpty cursor={"pointer"} />
      <img src={item.pathClub} alt="clubPhoto" />
      <nav className="cardInfo">
        <div className="cardDat--name">{item.clubName}</div>
        <img src={item.pathLeague} alt="league" />
        <div className="cardData">
          <div className="cardClub">League: {item.leagueName}</div>
        </div>
        <div className="cardData">Owner: {item.ownerName}</div>
      </nav>
      <button
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
          isExpanded ? onCollapse() : onExpand();
        }}
      >
        {isExpanded ? "Свернуть" : "Подробнее"}
      </button>
    </div>
  );
};

export default Club;
