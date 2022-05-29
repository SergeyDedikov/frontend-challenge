import "./CatsList.css";

function CatsList({ cats }) {
  return (
    <section className="cats" aria-label="Кошки">
      <ul className="cats__list">
        {cats.map((item) => (
          <li key={item.id}>
            <img src={item.url} alt={item.id} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CatsList;
