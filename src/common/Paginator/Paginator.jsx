import React, {useState} from 'react'
import s from './Paginator.module.css'
import {NavLink} from "react-router-dom";
import classNames from 'classnames'


const PaginatorItem = ({url, page, currentPage}) => {

    const spanCl = classNames({
        'pageItem': true,
        'active': currentPage === page
    });

    return (
        <NavLink className={spanCl} to={`${url}?page=${page}`}><span>
            {page}
            </span></NavLink>
    )

}



let Paginator = (/*{totalItemsCount, pageSize, currentPage = 1, onPageChanged, portionSize = 10}*/
                    {total, limit, url, currentPage}
) => {

    /*let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i =1; i<= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


     return <div className={s.paginator}>
        <button disabled={portionNumber <= 1} onClick={() => { setPortionNumber(portionNumber - 1) }}>Предыдущие</button>

        {pages
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
            .map((p) => {
                return <span className={ cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber) }
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        <button disabled={portionCount <= portionNumber} onClick={() => { setPortionNumber(portionNumber + 1) }}>Следующие</button>


    </div>*/

    let pagesCount = Math.ceil(total / limit);
    let pages = [];
    for (let i =1; i<= pagesCount; i++) {
        pages.push(i);
    }


    return <div>
        {pages.map((p , index) => (
            <PaginatorItem page={p} currentPage={currentPage} url={url} key={p}  />
            )
        )}
    </div>

};



export default Paginator;