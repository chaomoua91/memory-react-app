export default function Card({ array, onClick }) {
  return (
    <div className="card-container">
      {array.map((element, i) => (
        <div
          key={i}
          className={`card ${element.timesClicked > 1 ? "clicked" : ""}`}
          name={element.name}
          onClick={() => onClick(element.name)}
        >
          <img
            src={`https://img.pokemondb.net/artwork/${element.name}.jpg`}
            alt={`${element.name} img`}
          />
          <p className="card-name">{element.name.toLowerCase()}</p>
        </div>
      ))}
    </div>
  );
}
