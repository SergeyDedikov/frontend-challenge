import "./CatCard.css";

function CatCard({ cat }) {
  const styleBackgroundImage = {
    backgroundImage: `url(${cat.url})`,
  };

  return (
    <li className="cat" style={styleBackgroundImage}>
      <div className="cat__overlay">
        <button className="cat__button-like button"></button>
      </div>
    </li>
  );
}

export default CatCard;
