import  { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch} = useWorkoutsContext()

    const logout = () => {
        //update global state and delete token from local storage = logout

        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return { logout }
}