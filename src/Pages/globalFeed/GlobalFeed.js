import React, {Fragment, useEffect} from "react"
import Feed from "../../Components/Feed/Feed";
import useFetch from "../../Hooks/useFetch";
import {getPaginator, limit} from "../../utils";
import {stringify} from "query-string";
import Paginator from "../../common/Paginator/Paginator";

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
        {isLoading && <div>Загрузка...</div>}
        {error && <div>Произошла ошибка</div>}
        {!isLoading && response && (
            <Fragment>
                <Paginator
                    total={response.articlesCount}
                    limit={limit}
                    url={currentUrl}
                    currentPage={currentPage}
                />

                <Feed articles={response.articles} pageSize={offset} response={response}  limit={limit} offset={offset} />

            </Fragment>
        )}
    </div>
};

export default GlobalFeed;