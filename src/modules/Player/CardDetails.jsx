import "./App.css";

export const CardDetails = (props) => {
  const {
    path,
    playerID,
    playerName,
    clubNameClubID,
    agentNameAgentID,
    roleNameRoleID,
  } = props;

  return (
    <div className="CardDetails">
      <ul>
        <img src={path} alt="playerPhoto" />
        <ol>{playerID}</ol>
        <ol>{playerName}</ol>
        <ol>{clubNameClubID}</ol>
        <ol>{agentNameAgentID}</ol>
        <ol>{roleNameRoleID}</ol>
        <button
          className="btn"
          onClick={() => saveCart("cart", { count, item })}
        >
          Подробнее
        </button>
      </ul>
    </div>
  );
};

export default CardDetails;
