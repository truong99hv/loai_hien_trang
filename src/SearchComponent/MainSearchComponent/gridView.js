function GridView({ items }) {
    return (
      <div>
        {items.map((item, id) => (
          <li key={id}>{item.name}</li>
        ))}
      </div>
    );
  }

export default GridView;