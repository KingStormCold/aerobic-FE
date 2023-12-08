
import { useAppSelector } from 'app/config/store';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Search = () => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState("");
    const path = history.location.pathname

    useEffect(() => {
        if (history.location.pathname !== "/search") setSearchValue("")
    }, [path])

    const handleSearch = () => {
        history.push("/search?product_name=" + searchValue + "&page=0")
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") history.push("/search?product_name=" + searchValue + "&page=0")
    }


    return (
        <div className='header-search'>
            <div className='header-search-box'>
                <input type="text" placeholder="Tìm kiếm..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyPress={handleKeyPress} />
                <FontAwesomeIcon icon="search" className='header-search-icon' onClick={handleSearch} />
            </div>
        </div>
    )
}

export default Search;
