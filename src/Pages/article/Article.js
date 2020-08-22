import React, {useContext, useEffect, useState} from "react"
import useFetch from "../../Hooks/useFetch";
import {NavLink} from "react-router-dom";
import Loading from "../../common/Loading/Loading";
import TagList from "../../common/TagList/TagList";
import {CurrentUserContext} from "../../context/currentUser";
import Redirect from "react-router-dom/es/Redirect";
import s from './Article.module.css'

const Article = (props) => {

    const slug = props.match.params.slug;
    const apiURL = `articles/${slug}`;
    const [{response, error, isLoading}, doFetch] = useFetch(apiURL);
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiURL)
    const [currentUserState] = useContext(CurrentUserContext);
    const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

    const isAuthor = () => {
        if (!response || !currentUserState.isLoggedIn) {
            return false
        }
        return  response.article.author.username === currentUserState.currentUser.username
    };

    useEffect(() => {
        doFetch()
    }, [doFetch]);

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'delete'
        })
    };
    useEffect(() => {
        if (!deleteArticleResponse) {
            return
        }
        setIsSuccessfullDelete(true)
    }, [deleteArticleResponse]);

    if (isSuccessfullDelete) {
        return  <Redirect to={'/'} />
    }

    return <div>
        <div>Baner xD
            {!isLoading && response && (
                <div>
                    <h1 className={s.dima}>{response.article.title}</h1>
                    <div>
                        <NavLink to={`/profile/${response.article.author.username}`}>
                            <img className={s.ava} src={response.article.author.image} alt=" "/>
                        </NavLink>
                        <div>
                            <NavLink to={`/profile/${response.article.author.username}`}>
                                {response.article.author.username}
                            </NavLink>

                            <span>{response.article.createdAt}</span>
                        </div>
                        {isAuthor() && (
                            <span>
                                <NavLink to={`/articles/${response.article.slug}/edit`} > Редактировать</NavLink>
                                <button onClick={deleteArticle}> Удалить пост</button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
        <div>
            {isLoading && <Loading/>}
            {error && <div>Ошибка</div>}
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