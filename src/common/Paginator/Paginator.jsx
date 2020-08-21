import React from 'react'
import s from './Paginator.module.css'
import {NavLink} from "react-router-dom";


const PaginatorItem = ({url, page, currentPage}) => {



    return (
        <NavLink className={currentPage === page && s.active} to={`${url}?page=${page}`}><span>
            {page}
            </span></NavLink>
    )

};



let Paginator = (/*{totalItemsCount, pageSize, currentPage = 1, onPageChanged, portionSize = 10}*/
                    {total, limit, url, currentPage}
) => {


    let pagesCount = Math.ceil(total / limit);
    let pages = [];
    for (let i =1; i<= pagesCount; i++) {
        pages.push(i);
    }


    return <div className={s.paginator}>
        {pages.map((p , index) => (
            <PaginatorItem page={p} currentPage={currentPage} url={url} key={p}  />
            )
        )}
    </div>

};



export default Paginator;