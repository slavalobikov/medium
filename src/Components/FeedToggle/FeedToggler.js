import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";

import {CurrentUserContext} from "../../context/currentUser";
import s from './FeedToggler.module.css'

const FeedToggler = ({tagName}) => {

    const [currentUserState] = useContext(CurrentUserContext);

    return (
        <div className={s.FeedToggler}>
            { currentUserState.isLoggedIn &&
                <NavLink to={'/feed'}>Your Feed</NavLink>
            }
            <NavLink to={'/'} exact >Global Feed</NavLink>
            {tagName &&
                <NavLink to={`/tags/${tagName}`} exact >{tagName}</NavLink>
            }
        </div>
    )
};

export default FeedToggler;