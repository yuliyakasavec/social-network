import React, { useState } from "react";
import classes from "./Paginator.module.css";

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
  let pagesCount = Math.ceil(
    Math.ceil(totalItemsCount / 100) / pageSize
  );

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  const onPortionChange =(portion: number) => {
     return portion * portionSize + 1;
  }
  
  return (
      <div className={classes.paginator}>
        {
        portionNumber > 1 &&
        <>
        <button onClick={ () => { setPortionNumber(1) 
          onPageChanged(pages[0])}}>First page</button>
        <button className={classes.buttons} onClick={ () => { setPortionNumber(portionNumber - 1)}}>PREV</button>
        </>
        }
        {pages
        .filter(p => p>=leftPortionNumber && p<=rightPortionNumber )
        .map((p) => {
          return <span
              className={currentPage === p ? `${classes.pageNumber} ${classes.selectedPage}` : `${classes.pageNumber}`}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
        })}
        { portionCount > portionNumber &&
        <>
          <button className={classes.buttons} onClick={ () => { setPortionNumber(portionNumber + 1);
          onPageChanged(onPortionChange(portionNumber));
          }}>NEXT</button>
          <button onClick={ () => { setPortionNumber(portionCount) 
          onPageChanged(pages.at(-1) || 1)}}>Last page</button>
        </>
        }
      </div>
  )}

  export default Paginator;