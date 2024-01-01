
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchClient, updateStateContentSearch } from 'app/shared/reducers/subject';
import { URL_PATH } from 'app/config/path';


const Search = () => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState("");
    const path = history.location.pathname
    const dispatch = useAppDispatch();
    const searchSubjectClientSucess = useAppSelector(state => state.subject.searchSubjectClientSucess);

    useEffect(() => {
        if(searchSubjectClientSucess) {
            history.push(URL_PATH.CLIENT.SEARCH);
        }
    }, [searchSubjectClientSucess])

    const handleSearch = () => {
        searchSubject()
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") searchSubject()
    }

    const searchSubject = () =>{
        dispatch(updateStateContentSearch(searchValue))
        dispatch(searchClient({content_search: searchValue, page: 1}))
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
