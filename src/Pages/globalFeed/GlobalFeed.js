import React, {useEffect} from "react"
import Feed from "../../Components/Feed/Feed";
import useFetch from "../../Hooks/useFetch";

const GlobalFeed = () => {

    const apiURL = 'articles?limit=10&offset=0';
    const [{response, isLoading, error}, doFetch] = useFetch(apiURL);

    console.log(response)
    useEffect(() => {
        doFetch()
    }, [doFetch])

    return <div>
        {isLoading && <div>Загрузка...</div>}
        {error && <div>Произошла ошибка</div>}
        {!isLoading && response && (
            <Feed articles={response.articles} />
        )}
        </div>
};

export default GlobalFeed;