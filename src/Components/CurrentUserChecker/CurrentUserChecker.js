import {useContext, useEffect} from 'react';
import useFetch from "../../Hooks/useFetch";
import {CurrentUserContext} from "../../context/currentUser";
import useLocalStorage from "../../Hooks/useLocalStorage";

const CurrentUserChecker = ({children}) => {
    const [{response}, doFetch] = useFetch('user');
    const [, setCurrentUserState] = useContext(CurrentUserContext);
    const [token] = useLocalStorage('token')

    useEffect(() => {
        if (!token) {
            setCurrentUserState(state => ({
                ...state,
                isLoggedIn:false
            }));
            return
        }
      doFetch();
        setCurrentUserState(state => ({
            ...state,
            isLoading:true
        }))
    }, [token, setCurrentUserState, doFetch]);

    useEffect(() => {
        if (!response) {
            return
        }
        setCurrentUserState(state => ({
            ...state,
            isLoggedIn:true,
            isLoading: false,
            currentUser: response.user
        }))
    }, [response, setCurrentUserState])
    return children
};

export default CurrentUserChecker;