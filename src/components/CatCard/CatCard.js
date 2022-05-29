import "./CatCard.css";

function CatCard({ cat }) {
  const styleBackgroundImage = {
    backgroundImage: `url(${cat.url})`,
  };

  return (
    <li className="cat" style={styleBackgroundImage}>
      {/* <img className="cat__like" src={} alt={} /> */}
    </li>
  );
}

export default CatCard;
