import { DataProvider } from "./context/DataContext";
import Footer from "./views/footer/footer";
import Header from "./views/header/header";
import { MainSearchV2 } from "./layout/SearchComponent/main/mainSearchv2";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Tintuc } from "./layout/tintuc/tintuc";
import Login from "./layout/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./layout/ADmin/Admin";
import Test from "./Test";
import NotFound from "./views/not found/NotFound";
import PrivateRoute from "./layout/Login/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/admin" element={<PrivateRoute />}>
                <Route path="/admin" element={<Admin />}></Route>
              </Route>
              <Route path="/test" element={<Test />} />
              <Route path="/*" element={<NotFound />} />
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<MainSearchV2 />} />
                      <Route path="/search" element={<MainSearchV2 />} />
                      <Route path="/tintuc" element={<Tintuc />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
