import React from 'react';
import {NavLink} from "react-router-dom";

import s from './Feed.module.css'


const Feed = ({articles, pageSize, response, limit, offset}) => {
    return (
        <div>

            {articles.map((article, index) => (
                <div key={index}>
                    <div className={s.author}>
                        <div className={s.img}><NavLink to={`/profile/${article.author.username}`}>
                            <img src={article.author.image} alt=" "/>
                        </NavLink></div>
                        <div className={s.authName}>
                            <NavLink to={`/profile/${article.author.username}`}>
                                {article.author.username}
                            </NavLink>
                            <span>{article.createdAt}</span>
                        </div>
                    </div>
                    <div>
                        <NavLink to={`/articles/${article.slug}`}>
                            <h1>{article.title}</h1>
                            <p>{article.description}</p>
                            <span>Читать подробнее..</span>
                            {article.tagList.map(tag => (
                                <span key={tag}>{tag}</span>))}
                        </NavLink>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Feed;