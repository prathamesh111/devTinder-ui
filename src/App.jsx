import { Provider } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Wrapper />}>
              <Route index element={<Navigate to="/feed" replace />} />
              <Route path="feed" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
