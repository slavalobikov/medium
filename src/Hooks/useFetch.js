import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default (url) => {

    const baseURL = 'https://conduit.productionready.io/api/';

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({})
    const [token] = useLocalStorage('token');

    const doFetch = useCallback((options = {}) => {
        setOptions(options);
        setIsLoading(true);
    }, []);
    useEffect(() => {
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''
                }
            }
        };
        if (!isLoading) {
            return
        }
        axios(baseURL + url, requestOptions/* {
            method: 'post',
            data: {
                user: {
                    email: 'qqq@qq.com',
                    password: '123'
                }
            }
        }*/).then(res => {
            setIsLoading(false);
            setResponse(res.data)
        }).catch(error => {
            console.log('error', error)
            setIsLoading(false);
            setError(error.response.data)
        })
    }, [isLoading, url, options, token]);
        return [{isLoading, response, error}, doFetch]

}