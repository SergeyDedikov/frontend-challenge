import "./CatsList.css";
import CatCard from "../CatCard/CatCard";

function CatsList({ cats }) {
  return (
    <section className="cats" aria-label="Кошки">
      <ul className="cats__list">
        {cats.map((item) => (
          <CatCard key={item.id} cat={item} />
        ))}
      </ul>
    </section>
  );
}

export default CatsList;
