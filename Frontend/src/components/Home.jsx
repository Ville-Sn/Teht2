import PropTypes from 'prop-types';
import "./home.css"

function Home({ setPage }) {
  return (
    <div>
      <h2>Welcome to Dictionary</h2>
      <button onClick = {() => setPage("AddForm")}>Add new a word</button>
      <button onClick = {() => setPage("SearchForm")}>Search for a word</button>
    </div>
  )
}

Home.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Home
