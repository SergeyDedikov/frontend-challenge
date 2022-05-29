import "./CatCard.css";

function CatCard({ cat }) {
  return (
    <li className="cat">
      <img className="cat__image" src={cat.url} alt={cat.id} />
    </li>
  );
}

export default CatCard;
