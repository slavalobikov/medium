import React, {useEffect, useState, useContext} from 'react';
import {NavLink, Redirect} from "react-router-dom";

import s from './Authentication.module.css'
import useFetch from "../../Hooks/useFetch";
import useLocalStorage from "../../Hooks/useLocalStorage";
import {CurrentUserContext} from "../../context/currentUser";

const Authentication = (props) => {

    const isLogin = props.match.path === '/login';

    const pageTitle = isLogin ? 'Авторизация' : 'Регистрация';
    const descriptionLink = isLogin
        ? <NavLink to={'/register'}>Нету аккаунта? Зарегистрируйтесь!</NavLink>
        : <NavLink to={'/login'}>У вас уже есть аккаунт?</NavLink>;
    const apiURL = isLogin ? 'users/login' : 'users';
    const buttonText = isLogin ? 'Войти' : 'Зарегистрироваться';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

    const [{response, isLoading, error}, doFetch] = useFetch(apiURL);
    const [/*token*/, setToken] = useLocalStorage('token');
/*
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
*/
    const [, dispatch] = useContext(CurrentUserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = isLogin ? {email, password} : {email, password, username};
        doFetch({
            method: 'post',
            data: {
                user
            }
        })
    };

    useEffect(() => {
        if (!response) {
            return
        }
        setToken(response.user.token);
        setIsSuccessfulSubmit(true);
        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
/*        setCurrentUserState(state => ({ // До использования useReducer
            ...state,
            isLoggedIn: true,
            isLoading:false,
            currentUser: response.user
        }))*/
    }, [response, setToken, dispatch]);
    /*useEffect(() => {
        if (!isSubmitting) {
          return
        }
    axios('https://conduit.productionready.io/api/users/login', {
        method: 'post',
        data: {
            user: {
                email: 'qqq@qq.com',
                password: '123'
            }
        }
    }).then(res => {
        console.log('successs', res)
        setIsSubmitting(false);
    }).catch(error => {
        console.log('error', error)
        setIsSubmitting(false);

    })
    });*/ // Мб пригодится в Магазе
    if (isSuccessfulSubmit) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className={s.content}>
            <div><h1 className={s.h}>{pageTitle}</h1></div>
            <div className={s.reg}>{descriptionLink}</div>
            <form>
                {!isLogin &&
                <div className={s.reg}>
                    {error && <div>{error.errors.username}</div>}
                    <input className={s.inp} type="text" placeholder={'Имя пользователя'}
                                              value={username} onChange={e => setUsername(e.currentTarget.value)}/>
                </div>
                }
                <div className={s.reg}>
                    {error && <div>{error.errors.email || 'Логин или пароль не подходят'}</div>}
                    <input type={'email'} className={s.inp} placeholder={'Почта'}
                                              value={email} onChange={e => setEmail(e.target.value)}/></div>
                <div className={s.reg}>
                    {error && <div>{error.errors.password}</div>}
                    <input type={'password'} className={s.inp} placeholder={'Пароль'}
                                              value={password} onChange={e => setPassword(e.target.value)}/></div>
                <div className={s.reg}>
                    <button onClick={handleSubmit} disabled={isLoading}>{buttonText}</button>
                </div>
            </form>
        </div>
    )
};

export default Authentication;