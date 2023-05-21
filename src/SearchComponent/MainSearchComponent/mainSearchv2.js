import { useContext } from "react";
import { DataContext } from "../../DataHandle/DataContext";
import GridView from "./gridView";
import TableView from "./tableView";
import RenderNavBar from "../NavbarComponent/navbar";
import {RenderSideBarFunction} from "../SidebarComponent/sidebar";

export const MainSearchV2 = () => {
  const {tab} = useContext(DataContext);
  let content = null;
  switch (tab) {
    case 0:
      content = <GridView />;
      // content = <GridViewV2/>
      break;
    case 1:
      content = <TableView />;
      break;
    default:
      break;
  }
  return (
    <>
      <RenderNavBar />
      <RenderSideBarFunction />
      {content}
    </>
  );
};
