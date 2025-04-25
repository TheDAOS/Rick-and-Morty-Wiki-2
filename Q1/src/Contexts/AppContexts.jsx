import { useEffect } from 'react';
import { createContext, useReducer } from 'react'

const AppContext = createContext()

function AppProvider({ children }) {

    const initialState = {
        page: 1,
        characters: [],
        randomCharacter: null,
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_PAGE':
                getData(action.payload);
                return { ...state, page: action.payload }

            case 'SET_CHARACTERS':
                return { ...state, characters: action.payload }

            case 'SET_RANDOM_CHARACTER':
                return { ...state, randomCharacter: action.payload }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    function getData(page) {
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('Fetched data:', data);
                dispatch({ type: 'SET_CHARACTERS', payload: data.results })
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    useEffect(() => {
        dispatch({ type: 'SET_PAGE', payload: state.page })
    }, [])

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }