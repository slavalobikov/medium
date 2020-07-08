import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios'

import s from './Authentication.module.css'
import useFetch from "../../Hooks/useFetch";

const Authentication = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [{response, isLoading, error}, doFetch] = useFetch('users/login')
    console.log('dfdff',response,isLoading,error)

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email', email );
    console.log('password', password );
    //setIsSubmitting(true);
    doFetch({
        method: 'post',
        data: {
            user: {
                email: 'qqq@qq.com',
                password: '123'
            }
        }
    })
};
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


    return (
        <div className={s.content}>
            <div><h1 className={s.h}>Авторизация</h1></div>
            <div className={s.reg}><NavLink to={'/register'}>Нету аккаунта? Зарегистрируйтесь!</NavLink></div>
            <form>
                <div className={s.reg}><input type={'email'} className={s.inp} placeholder={'Почта'}
                    value={email} onChange={e => setEmail(e.target.value)}/></div>
                <div className={s.reg}><input type={'password'} className={s.inp} placeholder={'Пароль'}
                    value={password} onChange={e => setPassword(e.target.value)}/></div>
                <div className={s.reg}><button onClick={handleSubmit} disabled={isSubmitting}>Войти</button></div>

            </form>
        </div>
    )
};

export default Authentication;