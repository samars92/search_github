import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-lodash-debounce'
import './App.css';
import logo from './giticon.png';
import RepoCard from './components/RepoCard';
import UserCard from './components/UserCard';
import { Provider } from "react-redux";
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';


export type Owner = {
    id: number;
    login: string;
    score: number;
    avatar_url: string;
    type: string;
  };

const App = () => {

    const [result, setResult] = useState({} as any);
    const [searchq, setSearchq] = useState('');
    const [searchType, setSearchType] = useState('user');
    const debouncedValue = useDebounce(searchq.length > 2);
    
    const getResult = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: searchType, 
                q: searchq
            }),
        };
        let res = await fetch('http://localhost:3002/api/search', requestOptions);
        let data = await res.json();
        setResult(data.data.items);
        console.log(data.data.items);
    }

    function handleSearchq(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchq(e.target.value);
    } 

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSearchType(e.target.value);
    }

    useEffect(() => {
        getResult();
    }, [debouncedValue && searchq]);

    return (
        <Provider store={store}> 
        <PersistGate persistor={persistor}>
        <div>
            <div>
                <img className="logo" src={logo}></img>
                <span><b> GitHub Searcher</b> <br/> Search users or repositories below</span>
            </div>
            <form>
                <input type="text" value={searchq} className="inputStyle" name="searchq" onChange={handleSearchq} placeholder="Start typing to search .."/>
                <select name="type" value={searchType} className="selectStyle" onChange={handleSelect}>
                    <option value="user">User</option>
                    <option value="repositories">repositories</option>
                </select>
            </form>
            {debouncedValue && result && (
                <div className="row">
                    {result.map(item => (
                        (searchType == 'repositories'? 
                            <RepoCard id={item.id} name={item.name} owner={item.owner} score={item.score}/> : <UserCard data={item} />
                        )
                    ))}
                </div>
            )}
            
        </div>
        </PersistGate>
        </Provider>
    );
}

export default App;
