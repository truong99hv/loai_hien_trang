import { DataProvider } from "./context/DataContext";
import Footer from "./views/footer/footer";
import Header from "./views/header/header";
import { MainSearchV2 } from "./layout/SearchComponent/main/mainSearchv2";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Tintuc } from "./layout/tintuc/tintuc";
import Login from "./layout/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./layout/ADmin/Admin";
import NotFound from "./views/not found/NotFound";
import PrivateRoute from "./layout/Login/PrivateRoute";
import Test from "./Test";
import UserManagement from "./layout/ADmin/UserManagement/UserManagement";
import Dashboard from "./layout/ADmin/Dashbord/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<PrivateRoute />}>
                <Route path="/admin" element={<Admin />}>
                  {/* <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<UserManagement />} /> */}
                </Route>
              </Route>
              <Route path="/test" element={<Test />} />
              {/* <Route
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
              /> */}

              <Route path="/" element={<OutletHeaderFooter />}>
                <Route path="/search" element={<MainSearchV2 />} />
                <Route path="/tintuc" element={<Tintuc />} />
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

function OutletHeaderFooter() {
  return (
    <>
      <DataProvider>
        <Header />
        <Outlet />
        <Footer />
      </DataProvider>
    </>
  );
}

export default App;
