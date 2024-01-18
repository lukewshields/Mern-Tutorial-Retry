import { createContext, useReducer } from 'react'
import { useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user:null
    })

    //only do this when component first rednders
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) //parse into object can use in js

        //intial user state only updates if we have user in local storage aka stay logged in when refresh
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}