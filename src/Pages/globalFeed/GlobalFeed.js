import React, {Fragment, useEffect} from "react"
import Feed from "../../Components/Feed/Feed";
import useFetch from "../../Hooks/useFetch";
import {getPaginator, limit} from "../../utils";
import {stringify} from "query-string";
import Paginator from "../../common/Paginator/Paginator";
import PopularTags from "../../Components/PopularTags/PopularTags";
import Loading from "../../common/Loading/Loading";
import ErrorMessage from "../../common/ErrorMessage/Error-message";

const GlobalFeed = ({location, match}) => {

    const {offset, currentPage} = getPaginator(location.search);
    console.log('ff', offset, currentPage);

    const stringyfiedParams = stringify({
        limit,
        offset
    });
    const apiURL = `articles?${stringyfiedParams}`;
    const currentUrl = match.url;
    const [{response, isLoading, error}, doFetch] = useFetch(apiURL);

    //console.log(response)
    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage]);

    return <div>
        {isLoading && <Loading/>}
        {error && <ErrorMessage />}
        {!isLoading && response && (
            <Fragment>
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