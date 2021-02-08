import React, { useEffect} from 'react';
import {useDebounce} from 'use-lodash-debounce'
import './App.css';
import logo from './giticon.png';
import RepoCard from './components/RepoCard';
import UserCard from './components/UserCard';
import {connect} from 'react-redux';
import {fetchSearchApi, ui_searchqTextChange, ui_searchTypeChange} from "./actions";


export type Owner = {
    id: number;
    login: string;
    score: number;
    avatar_url: string;
    type: string;
};

const App = ({dispatch, searchItems, isFetching, searchq, searchType}) => {

    const debouncedValue = useDebounce(searchq.length > 2);

    function handleSearchq(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(ui_searchqTextChange(e.target.value))
    }

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(ui_searchTypeChange(e.target.value));
    }

    useEffect(() => {
        debouncedValue && dispatch(fetchSearchApi(searchq, searchType))
    }, [debouncedValue && searchq && searchType]);

    return (
        <div>

            <div className="container">
                <div className="header">
                    <img className="logo" src={logo}/>
                    <span className="span"><b> GitHub Searcher</b> <br/> <span className="grey">Search users or repositories below</span></span>
                </div>
                <form>
                    <input type="text" value={searchq} className="inputStyle" name="searchq" onChange={handleSearchq}
                           placeholder="Start typing to search .."/>
                    <select name="type" value={searchType} className="selectStyle" onChange={handleSelect}>
                        <option value="user">User</option>
                        <option value="repositories">repositories</option>
                    </select>
                </form>
            </div>
            {isFetching && <div className="result-container"><h3>Loading ... </h3></div>}
            {!isFetching && searchItems && <div className="result-container">
                {searchItems.map(item => <div key={item.id}>
                        {searchType == 'repositories' &&
                        <RepoCard id={item.id} name={item.name} owner={item.owner} score={item.score}/>}
                        {searchType == 'user' && <UserCard data={item}/>}
                    </div>
                )}
            </div>
            }

        </div>

    );
}


const mapStateToProps = state => {
    const {
        isFetching, items, searchType, searchq
    } = state
    return {
        isFetching, searchItems: items, searchType, searchq
    }
}

export default connect(mapStateToProps)(App)
