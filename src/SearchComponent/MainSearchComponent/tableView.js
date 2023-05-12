function TableView({ items }) {
    return (
      <div>
        {items.map((item, id) => (
          <li key={id}>{item.sach_dos}</li>
        ))}
      </div>
    );
  }

export default TableView;