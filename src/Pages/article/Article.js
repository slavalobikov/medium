import React, {useEffect} from "react"
import useFetch from "../../Hooks/useFetch";
import {NavLink} from "react-router-dom";
import Loading from "../../common/Loading/Loading";
import ErrorMessage from "../../common/ErrorMessage/Error-message";
import TagList from "../../common/TagList/TagList";

const Article = (props) => {

    const slug = props.match.params.slug;
    const apiURL = `articles/${slug}`;
    const [{response, error, isLoading}, doFetch] = useFetch(apiURL);

    useEffect(() => {
        doFetch()
    }, [doFetch]);

    return <div>
        <div>Baner xD
            {!isLoading && response && (
                <div>
                    <h1>{response.article.title}</h1>
                    <div>
                        <NavLink to={`/profile/${response.article.author.username}`}>
                            <img src={response.article.author.image} alt=" "/>
                        </NavLink>
                        <div>
                            <NavLink to={`/profile/${response.article.author.username}`}>
                                {response.article.author.username}
                            </NavLink>

                            <span>{response.article.createdAt}</span>
                        </div>

                    </div>
                </div>
            )}
        </div>
        <div>
            {isLoading && <Loading/>}
            {error && <ErrorMessage/>}
            {!isLoading && response && (
                <div>
                    <div><p>{response.article.body}</p></div>
                    <TagList tags={response.article.tagList} />
                </div>
            )}
        </div>
    </div>
};

export default Article;