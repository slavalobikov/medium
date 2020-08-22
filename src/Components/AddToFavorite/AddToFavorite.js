import React from 'react';
import useFetch from "../../Hooks/useFetch";
import cn from "classnames";


import s from './AddToFavorite.module.css'

const AddToFavorites = ({isFavoritted, favoritesCount, articleSlug}) => {

    const apiURL = `articles/${articleSlug}/favorite`;
    const [{response}, doFetch] = useFetch(apiURL);
    const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
    const isFavoritesCountWithResponse = response ? response.article.favorited : isFavoritted;

    const handdleLike = (e) => {
        e.preventDefault();
        doFetch({
            method: isFavoritesCountWithResponse ? 'delete' : 'post'
        })
    };

    return <div className={s.like}>
        <button /*className={s.flex || (isFavoritesCountWithResponse && s.dima)}*/
            className={ cn({[s.flex]: true, [s.dima]: isFavoritesCountWithResponse
                })}
             onClick={handdleLike}>
            <img className={s.img} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ei-like.svg/1200px-Ei-like.svg.png'} alt=""/>
            <span className={s.likes}>{favoritesCountWithResponse}</span>
        </button>
    </div>
};

export default AddToFavorites