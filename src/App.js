import { DataProvider } from "./DataHandle/DataContext";
import Footer from "./FooterComponent/footer";
import Header from "./HeaderComponent/header";
import { MainSearchV2 } from "./SearchComponent/MainSearchComponent/mainSearchv2";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Tintuc } from "./TintucComponent/tintuc";
function App() {
  return (
    <div>
      <Router>
        <DataProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MainSearchV2 />} />
            <Route path="/search" element={<MainSearchV2 />} />
            <Route path="/tintuc" element={<Tintuc />} />

          </Routes>
          <Footer />
        </DataProvider>
      </Router>
    </div>
  );
}
export default App;

// function App() {
//   return (

//     <Router>
//       <Header/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>

//     </Router>
//   );
// }

// export default App;
