import React, {Fragment, useEffect} from "react"
import Feed from "../../Components/Feed/Feed";
import useFetch from "../../Hooks/useFetch";
import {getPaginator, limit} from "../../utils";
import {stringify} from "query-string";
import Paginator from "../../common/Paginator/Paginator";
import PopularTags from "../../Components/PopularTags/PopularTags";
import Loading from "../../common/Loading/Loading";
import ErrorMessage from "../../common/ErrorMessage/Error-message";
import FeedToggler from "../../Components/FeedToggle/FeedToggler";

const TagFeed = ({location, match}) => {

    const tagName = match.params.slug;

    const {offset, currentPage} = getPaginator(location.search);

    const stringyfiedParams = stringify({
        limit,
        offset,
        tag: tagName
    });
    const apiURL = `articles?${stringyfiedParams}`;
    const currentUrl = match.url;
    const [{response, isLoading, error}, doFetch] = useFetch(apiURL);

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage, tagName]);

    return <div>
        {isLoading && <Loading/>}
        {error && <ErrorMessage />}
        {!isLoading && response && (
            <Fragment>
                <FeedToggler tagName={tagName} />
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

export default TagFeed;