import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from "react-router-dom";

import s from './Authentication.module.css'
import useFetch from "../../Hooks/useFetch";

const Authentication = (props) => {

    const isLogin = props.match.path === '/login';

    const pageTitle = isLogin ? 'Авторизация' : 'Регистрация';
    const descriptionLink = isLogin
        ? <NavLink to={'/register'}>Нету аккаунта? Зарегистрируйтесь!</NavLink>
        : <NavLink to={'/login'}>У вас уже есть аккаунт?</NavLink>;
    const apiURL = isLogin ? 'users/login': 'users';
    const buttonText = isLogin ? 'Войти' : 'Зарегистрироваться';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
    //const [isSubmitting, setIsSubmitting] = useState(false);

    const [{response, isLoading, error}, doFetch] = useFetch(apiURL);
/*
    console.log('dfdff',response,isLoading,error);
*/

const handleSubmit = (e) => {
    e.preventDefault();
    const user = isLogin ? {email, password} : {email, password, username}
    doFetch({
        method: 'post',
        data: {
            user
        }
    })
};

useEffect(() => {
    if (!response ) {
        return
    }
    localStorage.setItem('token', response.user.token);
    setIsSuccessfulSubmit(true);
}, [response]);
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
    });*/
    if (isSuccessfulSubmit) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className={s.content}>
            <div><h1 className={s.h}>{pageTitle}</h1></div>
            <div className={s.reg}>{descriptionLink}</div>
            <form>
                {!isLogin &&
                    <div className={s.reg}><input className={s.inp} type="text" placeholder={'Имя пользователя'}
                        value={username} onChange={e => setUsername(e.currentTarget.value)}/></div>
                }
                <div className={s.reg}><input type={'email'} className={s.inp} placeholder={'Почта'}
                    value={email} onChange={e => setEmail(e.target.value)}/></div>
                <div className={s.reg}><input type={'password'} className={s.inp} placeholder={'Пароль'}
                    value={password} onChange={e => setPassword(e.target.value)}/></div>
                <div className={s.reg}><button onClick={handleSubmit} disabled={isLoading}>{buttonText}</button></div>
            </form>
        </div>
    )
};

export default Authentication;