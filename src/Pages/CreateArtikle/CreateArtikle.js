import React, {useContext, useEffect, useState} from 'react';
import ArtikleForm from "./ArticleForm";
import useFetch from "../../Hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../context/currentUser";

const CreateArtikle = () => {

    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

    const apiURL = `articles`;
    const [{response, error}, doFetch] = useFetch(apiURL);

    const [currentUserState] = useContext(CurrentUserContext);

    const initialValues = {
        title: '',
        body: '',
        description: '',
        tagList: [],

    };
    const handleSubmit = article => {
        console.log(article);
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    };

    useEffect(() => {
       if (!response) {
           return
       }
       setIsSuccessfullSubmit(true)
    }, [response]);

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to={'/'} />
    }

    if (isSuccessfullSubmit) {
        return  <Redirect to={`/articles/${response.article.slug}`} />
    }

  return <div>
      <ArtikleForm errors={(error && error.errors) || {}} initialValues={initialValues} onSubmit={handleSubmit}   />
  </div>
};

export default CreateArtikle;