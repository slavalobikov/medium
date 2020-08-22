import React from 'react';
import {NavLink} from "react-router-dom";

import s from './Feed.module.css'
import TagList from "../../common/TagList/TagList";
import AddToFavorites from "../AddToFavorite/AddToFavorite";


const Feed = ({articles, pageSize, response, limit, offset}) => {
    return (
        <div className={s.feedMost}>
            {articles.map((article, index) => (
                <div className={s.feed} key={index}>
                    <div className={s.author}>
                        <div className={s.authName}>
                            <NavLink className={s.username} to={`/profile/${article.author.username}`}>
                                {article.author.username}
                            </NavLink>
                            <span className={s.createdAt}>{article.createdAt}</span>
                        </div>
                        <div className={s.img}><NavLink to={`/profile/${article.author.username}`}>
                            <img className={s.ava} src={article.author.image} alt=" "/>
                        </NavLink></div>
{/*                        <div>
                            <AddToFavorites isFavoritted={article.favorited} favoritesCount={article.favoritesCount}
                                articleSlug={article.slug}/>
                        </div>*/}
                    </div>
                    <div>
                        <NavLink to={`/articles/${article.slug}`}>
                            <h1>{article.title}</h1>
                            <p>{article.description}</p>
                            <span>Читать подробнее..</span>
                                <TagList tags={article.tagList} />
                        </NavLink>
                    </div>
                    <div>
                        <AddToFavorites isFavoritted={article.favorited} favoritesCount={article.favoritesCount}
                                        articleSlug={article.slug}/>
                    </div>
                </div>
            ))}

        </div>
    )
};

export default Feed;