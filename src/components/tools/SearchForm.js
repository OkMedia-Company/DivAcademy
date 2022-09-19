import React from 'react'
import "./SearchForm.css"
import { FaSearch } from "react-icons/fa";


const SearchForm = () => {
  return (
    <form className='searchForm'>
        <input className='form-control' placeholder='Axtar' type="text" />
        <button type='submit' className="searchBtn">
        <FaSearch color='#919191' />
        </button>
    </form>
  )
}

export default SearchForm