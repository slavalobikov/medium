import React, {Fragment, useEffect} from 'react';
import {getPaginator, limit} from "../../../../utils";
import {stringify} from "query-string";
import useFetch from "../../../../Hooks/useFetch";
import Loading from "../../../../common/Loading/Loading";
import ErrorMessage from "../../../../common/ErrorMessage/Error-message";
import Feed from "../../../../Components/Feed/Feed";
import Paginator from "../../../../common/Paginator/Paginator";


const getAPIURL = ({username, offset, isFavorites}) => {
    const params = isFavorites
        ? {limit, offset, favorited: username}
        : {limit, offset, author: username};
    return `articles?${stringify(params)}`
};


const UserArticle = ({username, location, isFavorites, url}) => {


    const {offset, currentPage} = getPaginator(location.search);

    const apiURL = getAPIURL({username, offset, isFavorites});
    const [{response, isLoading, error}, doFetch] = useFetch(apiURL);

    useEffect(() => {
        doFetch()
    }, [doFetch, isFavorites]);

    return <div>
        {isLoading && <Loading/>}
        {error && <div>error </div>}
        {!isLoading && response && (
            <Fragment >
                <Paginator total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
                <Feed articles={response.articles} />
            </Fragment>
        )}
    </div>
};

export default UserArticle;
