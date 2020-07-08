import React from 'react'
import {NavLink} from "react-router-dom";
import s from './TopBar.module.css'

const TopBar = () => {
    return (
    <nav>
        <div className={s.logo}>
            <NavLink to={'/'}>LOGO</NavLink>
        </div>
        <div className={s.item}>
            <NavLink activeClassName={s.active} className={s.hh} to={'/home'}>Домой</NavLink>
            <NavLink activeClassName={s.active} className={s.hh} to={'/login'} >Войти</NavLink>
            <NavLink activeClassName={s.active} className={s.hh} to={'/reg'}>Зарегистрироваться</NavLink>
        </div>

    </nav>
    )
};

export default TopBar;