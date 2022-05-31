import "./CatsList.css";
import CatCard from "../CatCard/CatCard";

function CatsList({ cats, isLiked, ...props }) {
  const loadMessage = <p>... загружаем ещё котиков ...</p>;

  return (
    <section className="cats" aria-label="Кошки">
      <ul className="cats__list">
        {cats.map((item) => (
          <CatCard key={item.id} cat={item} {...props} />
        ))}
      </ul>
      {!isLiked && loadMessage}
    </section>
  );
}

export default CatsList;
