import React, {useContext, useEffect, useState} from 'react';

import ArtikleForm from "../CreateArtikle/ArticleForm";
import useFetch from "../../Hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../context/currentUser";


const EditArticle = ({match}) => {

    const slug = match.params.slug;

    const [currentUserState] = useContext(CurrentUserContext);

    const apiURL = `articles/${slug}`;
    const [{response : fetchArticleResponse}, doFetchArticle ] = useFetch(apiURL);
    const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiURL);

    const handleSubmit = (article) => {
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })
    };

    useEffect(()=> {
        doFetchArticle()
    }, [doFetchArticle]);

    const [initialValues, setInitialValues] = useState(null);
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }
        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList:fetchArticleResponse.article.tagList,
        })
    }, [fetchArticleResponse]);

    useEffect(() => {
        if (!updateArticleResponse) {
            return
        }
        setIsSuccessfullSubmit(true)
    }, [updateArticleResponse]);

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to={`/`} />
    }

    if (isSuccessfullSubmit) {
        return  <Redirect to={`/articles/${slug}`} />
    }

    return (
        <ArtikleForm onSubmit={handleSubmit} errors={(updateArticleError && updateArticleError.errors) || {}}
            initialValues={initialValues} />
    )
};

export default EditArticle;