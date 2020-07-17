import React, {Fragment, useContext} from 'react'
import {NavLink} from "react-router-dom";
import s from './TopBar.module.css'
import {CurrentUserContext} from "../../context/currentUser";

const TopBar = () => {

    const [currentUserState] = useContext(CurrentUserContext);

    currentUserState.isLoggedIn && console.log(currentUserState.currentUser.image)
    return (
    <nav >
        <div className={s.logo}>
            <NavLink to={'/'}>LOGO</NavLink>
        </div>
        <div className={s.item}>
            <NavLink activeClassName={s.active} className={s.hh} to={'/'} exact>Домой</NavLink>
            {currentUserState.isLoggedIn === false && (
                <Fragment>
                    <NavLink activeClassName={s.active} className={s.hh} to={'/login'} >Войти</NavLink>
                    <NavLink activeClassName={s.active} className={s.hh} to={'/register'}>Зарегистрироваться</NavLink>
                </Fragment>
            ) }

            {currentUserState.isLoggedIn && (
                <Fragment>
                    <NavLink activeClassName={s.active} className={s.hh} to={'/articles/new'} >Новый пост</NavLink>
                    <NavLink activeClassName={s.active} className={s.hh} to={'/settings'} >Настройки</NavLink>
                    <NavLink activeClassName={s.active} className={s.hh}
                             to={`/profiles/${currentUserState.currentUser.username}`} >
                        <img src={currentUserState.currentUser.image
                        || 'https://kacabiru.files.wordpress.com/2010/11/smilelaughuy0.png'}
                             alt={currentUserState.currentUser.username}/>
                        {'   '}
                        {currentUserState.currentUser.username}
                    </NavLink>

                </Fragment>
            )}

        </div>
    </nav>
    )
};

export default TopBar;