import { DataProvider } from "./context/DataContext";
import Footer from "./views/footer/footer";
import Header from "./views/header/header";
import { MainSearchV2 } from "./layout/SearchComponent/main/mainSearchv2";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Tintuc } from "./layout/tintuc/tintuc";
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
        </DataProvider>
        <Footer />
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
