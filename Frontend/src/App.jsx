import { useState } from "react";
import Home from "./components/Home";
import AddForm from "./components/AddForm";
import SearchForm from "./components/SearchForm";
import "./App.css";

function App() {
  const [page, setPage] = useState("Home");

  const content = (page) => {
    switch (page) {
      case "Home":
        return <Home setPage={setPage}/>;
      case "AddForm":
        return <AddForm setPage={setPage}/>;
      case "SearchForm":
        return <SearchForm setPage={setPage}/>;
      default:
        return <Home setPage={setPage}/>;
    }
  };

  return (
    <>
      <h1>Dictionary</h1>
      {content(page)}
    </>
  );
}



export default App;
