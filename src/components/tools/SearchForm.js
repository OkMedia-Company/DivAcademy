import { React, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./SearchForm.css";
import PropTypes from "prop-types";
const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className="searchForm">
      <input
        name="name"
        placeholder="Ad, soyad və ya telefon nömrəsi ilə axtarış"
        onChange={handleChange}
      />
      <button onClick={handleSearch}>
        <FiSearch />
      </button>
    </form>
  );
}; 

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
