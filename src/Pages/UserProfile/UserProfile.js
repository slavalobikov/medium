import React, {useEffect} from 'react';
import useFetch from "../../Hooks/useFetch";
import {NavLink} from "react-router-dom";
import UserArticle from "./components/UserArticles/UserArticles";

const UserProfile = ({location, match}) => {

    const slug = match.params.slug;
    const isFavorites = location.pathname.includes('favorites');

    const apiURL = `profiles/${slug}`;
    const [{response}, doFetch] = useFetch(apiURL);

    useEffect(() => {
        doFetch()
    }, [doFetch]);

    if (!response) {
        return null
    }

    return <div>
        <div>
            <img src={response.profile.image} alt=" "/>
            <h4>{response.profile.username}</h4>
            <p>{response.profile.bio}</p>
        </div>
        <div>
            <NavLink to={`/profile/${response.profile.username}`}>
                Мои посты
            </NavLink>
        </div>
        <div>
            <NavLink to={`/profile/${response.profile.username}/favorites`}>
                Отлайканные
            </NavLink>
        </div>
        <UserArticle username={response.profile.username} location={location}
                     isFavorites={isFavorites} url={match.url}/>
    </div>
};
export default UserProfile;
