import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getWord } from "../services/dictionaryService";
import "./home.css";

function SearchForm({ setPage }) {
  const [searchWord, setSearchWord] = useState("");
  const [words, setWords] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);
  const mounted = useRef(true);

  //fills words from dictionary on first render
  useEffect(() => {
    getWord(searchWord).then((data) => {
      mounted.current = true;
      if (mounted.current) {
        const normalizedData = Array.isArray(data) ? data : [data];
        setWords(normalizedData);
      }
    });
  }, []);

  //search word handler
  const handleSearch = (e) => {
    e.preventDefault();
    setErrorPopup("");
    getWord(searchWord).then((data) => {
      if (mounted.current) {
        const normalizedData = Array.isArray(data) ? data : [data];
        setWords(normalizedData);
        console.log(normalizedData);
      }
    }).catch(() => {
      setErrorPopup("Word not found");
    });
  };

  return (
    <div>
      <h2>Dictionary search</h2>
      <div id="mainColumn">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a word"
            onChange={(e) => setSearchWord(e.target.value)}
            value={searchWord}
          />
          <button type="submit">Search</button>
          {errorPopup && <div className="errorPopup">{errorPopup}</div>}
        
        </form>
        <div>
          <div className="header">
            <span className="headerFinnish">Finnish Word</span>
            <span className="headerEnglish">English Word</span>
          </div>
          <ul className="wordList">
            {words.map((word, index) => (
              <li key={index} className="wordPair">
                <span className="finnishWord">{word.fin}</span>
                <span className="englishWord">{word.eng}</span>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={() => setPage("Home")}>Return home</button>
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default SearchForm;
