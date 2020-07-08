import React from 'react';
import {NavLink} from "react-router-dom";

import s from './Authentication.module.css'

const Authentication = () => {
    return (
        <div className={s.content}>
            <div><h1 className={s.h}>Авторизация</h1></div>
            <div className={s.reg}><NavLink to={'/register'}>Нету аккаунта? Зарегистрируйтесь!</NavLink></div>
            <form>
                <div className={s.reg}><input type={'email'} className={s.inp} placeholder={'Почта'}/></div>
                <div className={s.reg}><input type={'password'} className={s.inp} placeholder={'Пароль'}/></div>
                <div className={s.reg}><button>Войти</button></div>

            </form>
        </div>
    )
};

export default Authentication;