import React, {useEffect} from 'react';
import useFetch from "../../Hooks/useFetch";
import Loading from "../../common/Loading/Loading";
import ErrorMessage from "../../common/ErrorMessage/Error-message";
import {NavLink} from "react-router-dom";
import s from './PopularTags.module.css'

const PopularTags = () => {

    const [{response, isLoading, error}, doFetch] = useFetch('tags');

    useEffect(() => {
        doFetch()
    }, [doFetch]);

    if (isLoading || !response) {
        return <Loading />
    }
    if (error) {
        return <ErrorMessage />
    }

    return <div className={s.PopularTags}>
        <p>Топ тэгов:</p>
        <div className={s.grid}>
            {response.tags.map(tag => (
                <NavLink className={s.tag} to={`/tags/${tag}`} key={tag}>
                    {tag}
                </NavLink>
            ))}
        </div>
    </div>

};

export default PopularTags;