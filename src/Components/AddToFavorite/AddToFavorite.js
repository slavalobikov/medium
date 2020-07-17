import React from 'react';
import useFetch from "../../Hooks/useFetch";

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
    }
    return <div>
        <button onClick={handdleLike}>
            <span>&nbsp; {favoritesCountWithResponse}</span>
        </button>
    </div>
};

export default AddToFavorites