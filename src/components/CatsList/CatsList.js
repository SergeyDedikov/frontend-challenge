import "./CatsList.css";
import CatCard from "../CatCard/CatCard";

function CatsList({ cats, ...props }) {
  return (
    <section className="cats" aria-label="Кошки">
      <ul className="cats__list">
        {cats.map((item) => (
          <CatCard key={item.id} cat={item} {...props} />
        ))}
      </ul>
    </section>
  );
}

export default CatsList;
