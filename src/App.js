import { DataProvider } from "./DataHandle/DataContext";
import Footer from "./FooterComponent/footer";
import Header from "./HeaderComponent/header";
// import MainSearch from "./SearchComponent/MainSearchComponent/mainSearch";
// import RenderNavBar from "./SearchComponent/NavbarComponent/navbar";
// import RenderSideBar from "./SearchComponent/SidebarComponent/sidebar";
import { MainSearchV2 } from "./SearchComponent/MainSearchComponent/mainSearchv2";
// function App() {
//     return <>
//       <Header/>
//       <MainSearch/>
//       <Footer />
//     </>
//   }

function App() {
  return (
    <div>
      <DataProvider>
        <Header />
        <MainSearchV2/>
        <Footer />
      </DataProvider>
    </div>
  );
}
export default App;
