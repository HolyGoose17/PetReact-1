import "./App.css";

export const ClubDetails = (props) => {
  const { pathClub, clubID, clubName, ownerNameOwnerID, leagueNameLeagueID } =
    props;

  return (
    <div className="CardDetails">
      <ul>
        <img src={pathClub} alt="playerPhoto" />
        <ol>{clubID}</ol>
        <ol>{clubName}</ol>
        <ol>{ownerNameOwnerID}</ol>
        <ol>{leagueNameLeagueID}</ol>
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

export default ClubDetails;
