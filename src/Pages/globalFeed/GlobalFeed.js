import React, {Fragment, useEffect} from "react"

import s from './GlobalFeed.module.css'

import Feed from "../../Components/Feed/Feed";
import useFetch from "../../Hooks/useFetch";
import {getPaginator, limit} from "../../utils";
import {stringify} from "query-string";
import Paginator from "../../common/Paginator/Paginator";
import PopularTags from "../../Components/PopularTags/PopularTags";
import Loading from "../../common/Loading/Loading";
import ErrorMessage from "../../common/ErrorMessage/Error-message";
import FeedToggler from "../../Components/FeedToggle/FeedToggler";

const GlobalFeed = ({location, match}) => {

    const {offset, currentPage} = getPaginator(location.search);

    const stringyfiedParams = stringify({
        limit,
        offset
    });
    const apiURL = `articles?${stringyfiedParams}`;
    const currentUrl = match.url;
    const [{response, isLoading, error}, doFetch] = useFetch(apiURL);

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage]);

    return <div className={s.GlobalFeed}>
        {isLoading && <Loading/>}
        {error && <ErrorMessage />}
        {!isLoading && response && (
            <Fragment>
                <FeedToggler tagName={'foo'} />
                <Paginator
                    total={response.articlesCount}
                    limit={limit}
                    url={currentUrl}
                    currentPage={currentPage}
                />

                <Feed articles={response.articles} pageSize={offset} response={response}  limit={limit} offset={offset} />
                <PopularTags />
            </Fragment>

        )}
    </div>
};

export default GlobalFeed;