import { AiOutlineQuestionCircle, AiOutlineArrowDown } from "react-icons/ai";
function GridView({ items }) {
  return <SixItems items={items} />;
}
function SixItems({ items }) {
  const sixItems = items.slice(0, 6);
  const otherItems = items.slice(6);
  return (
    <>
      <div className="flexContainerSearch">
        {sixItems.map((item, id) => (
          <div key={id} className="flexItemSearch">
            <div className="flexItemContent">
              <div
                style={{
                  backgroundImage: `url(${item.images})`,
                }}
                className="flexImgSearch"
              ></div>
              <div className="flexMiddleSearch">
                <p>
                  {item.kingdom} - {item.phylumn}
                </p>
                <p>
                  <b>{item.name}</b>
                </p>
                <p>
                  <i>{item.ten_khoa_hoc}</i>
                </p>
              </div>
              <div className="flexBottomSearch">
                {item.loai_hien_trang == null ? (
                  <>
                    <div className="leftFlexBottomSearch">
                      <AiOutlineQuestionCircle />
                      <span>Chưa xác định</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="leftFlexBottomSearch">
                      <AiOutlineArrowDown />
                    </div>
                    <span>Giảm dần</span>
                  </>
                )}
                <div className="rightFlexBottomSearch">
                  {item.sach_dos != null && item.iucns != null ? (
                    <>
                      <div className="iconFlexBottomSearch pink">
                        {item.sach_dos}
                      </div>
                      <div className="iconFlexBottomSearch orange">
                        {item.iucns}
                      </div>
                    </>
                  ) : item.sach_do != null && item.iucns == null ? (
                    <div className="iconFlexBottomSearch pink">
                      {item.sach_dos}
                    </div>
                  ) : item.sach_do == null && item.iucns != null ? (
                    <div className="iconFlexBottomSearch pink">
                      {item.iucns}
                    </div>
                  ) : (
                    <></>
                  )
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <OtherItems items={otherItems} />
    </>
  );
}

function OtherItems({ items }) {
  if (items.length !== 0) {
    return (
      <>
        <hr />
        <h2>
          <b>Kết quả khác</b>
        </h2>
        <div className="flexContainerSearch">
          {items.map((item, id) => (
            <div key={id} className="flexItemSearch">
              <div className="flexItemContent">
                <div className="flexMiddleSearch">
                  <p>
                    {item.kingdom} - {item.phylumn}
                  </p>
                  <p>
                    <b>{item.name}</b>
                  </p>
                  <p>
                    <i>{item.ten_khoa_hoc}</i>
                  </p>
                </div>
                <div className="flexBottomSearch">
                  {item.loai_hien_trang == null ? (
                    <>
                      <div className="leftFlexBottomSearch">
                        <AiOutlineQuestionCircle />
                        <span>Chưa xác định</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="leftFlexBottomSearch">
                        <AiOutlineArrowDown />
                      </div>
                      <span>Giảm dần</span>
                    </>
                  )}
                  <div className="rightFlexBottomSearch">
                    {item.sach_dos != null && item.iucns != null ? (
                      <>
                        <div className="iconFlexBottomSearch pink">
                          {item.sach_dos}
                        </div>
                        <div className="iconFlexBottomSearch orange">
                          {item.iucns}
                        </div>
                      </>
                    ) : item.sach_do != null && item.iucns == null ? (
                      <div className="iconFlexBottomSearch pink">
                        {item.sach_dos}
                      </div>
                    )  : item.sach_do == null && item.iucns != null ? (
                      <div className="iconFlexBottomSearch pink">
                        {item.iucns}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default GridView;
