import PropTypes from "prop-types";
import "./home.css";
import { addWord } from "../services/dictionaryService";
import { useState } from "react";

function AddForm({ setPage }) {
  const [input, setInput] = useState({ fin: "", eng: "" });

  //doesnt do anything yet, no check in backend if word exists.
  const [statePopup, setStatePopup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatePopup("");
    addWord(input)
      .then(() => {
        setStatePopup("Word added to dictionary");
      })
      .catch(() => {
        setStatePopup("Word already exists in dictionary");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Dictionary add word</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="fin"
            placeholder="input finnish word"
            onChange={handleInputChange}
            value={input.fin}
          />
          <input
            type="text"
            name="eng"
            placeholder="input english word"
            onChange={handleInputChange}
            value={input.eng}
          />
        </div>
        {statePopup && <div className="wordExists">{statePopup}</div>}
        <button type="submit">Post</button>
      </form>

      <button onClick={() => setPage("Home")}>Return home</button>
    </div>
  );
}

AddForm.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default AddForm;
