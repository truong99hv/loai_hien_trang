import "./mainSearch.css";
import RenderNavBar from "../NavbarComponent/navbar";
import RenderSideBar from "../SidebarComponent/sidebar";
import UseCaseUpdateFetch from "../../DataHandle/getData"
function MainSearch() {
  return (<>
    <RenderNavBar />
    <RenderSideBar/>
    <div className="main">
      <UseCaseUpdateFetch/>
    </div>
  </>);
}

export default MainSearch;
