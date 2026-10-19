import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper/>}>
÷           <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
