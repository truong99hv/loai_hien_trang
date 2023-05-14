function GridView({ items }) {
  return (
    <div className="flexContainerSearch">
      {items.map((item, id) => (
        <div key={id} className="flexItemSearch">
          <div className="flexItemContent">
            <div
              style={{
                backgroundImage: `url(${item.images})`,
              }}
              className="flexImgSearch"
            ></div>
            <p>{item.kingdom} - {item.phylumn}</p>
            <p><b>{item.name}</b></p>
            <p><i>{item.ten_khoa_hoc}</i></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GridView;
