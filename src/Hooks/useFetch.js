import {useEffect, useState} from "react";
import axios from "axios";

export default (url) => {

    const baseURL = 'https://conduit.productionready.io/api/';

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({})

    const doFetch = (options = {}) => {
        setOptions(options);
        setIsLoading(true);
    };
    useEffect(() => {
        if (!isLoading) {
            return
        }
        axios(baseURL + url, options/* {
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
    }, [isLoading, url, options]);
        return [{isLoading, response, error}, doFetch]

}