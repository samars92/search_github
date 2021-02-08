export const UI_SEARCH_TEXT_CHANG = 'UI_SEARCH_TEXT_CHANG'
export const UI_SEARCH_TYPE_CHANG = 'UI_SEARCH_TYPE_CHANG'
export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
export const REQUEST_SEARCH_DONE = 'REQUEST_SEARCH_DONE'


const requestSearch = () => ({
    type: REQUEST_SEARCH
});


const requestSearchDone = () => ({
    type: REQUEST_SEARCH_DONE
});

const searchqTextChange = searchq => {
    return {
        type: UI_SEARCH_TEXT_CHANG,
        searchq,
    }
}

const searchTypeChange = searchType => {
    return {
        type: UI_SEARCH_TYPE_CHANG,
        searchType,
    }
}

const receiveSearchResults = (json) => {
    return {
        type: RECEIVE_SEARCH,
        searchResults: json.items
    }
}


export const ui_searchqTextChange = searchq => dispatch => {
    dispatch(searchqTextChange(searchq));
}

export const ui_searchTypeChange = searchType => dispatch => {
    dispatch(searchTypeChange(searchType));
}


export const fetchSearchApi = (searchq, searchType) => dispatch => {
    dispatch(requestSearch());
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            type: searchType,
            q: searchq
        }),
    };
    return fetch('http://localhost:3002/api/search', requestOptions)
        .then(response => response.json())
        .then(json => {
            dispatch(receiveSearchResults(json.data));
            dispatch(requestSearchDone());
        })
}
