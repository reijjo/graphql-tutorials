import "./App.css";

import { Route, Routes } from "react-router-dom";

import { CreateLink } from "./components/CreateLink";
import { Header } from "./components/Header";
import { LinkList } from "./components/LinkList";
import Login from "./components/Login";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<LinkList index={1} />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
