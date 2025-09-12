export const PlayerAddCard = () => {
  return (
    <div className="player-add-popUp">
      <div className="player-add-wrapper">
        <div className="player-add-card">
          <input name="name" placeholder="Название товара"></input>
          <input name="price" placeholder="Стоимость"></input>
          <textarea name="description" placeholder="Описание"></textarea>
          <input
            name="path"
            type="file"
            placeholder="Путь к изображению"
          ></input>
        </div>
      </div>
    </div>
  );
};
