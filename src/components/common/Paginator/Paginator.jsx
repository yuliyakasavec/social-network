import React from "react";
import classes from "./Paginator.module.css";

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
  let pagesCount = Math.ceil(
    Math.ceil(totalUsersCount / 100) / pageSize
  );

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  
  return (
      <div>
        {pages.map((p) => {
          return <span
              className={currentPage === p ? classes.selectedPage : ""}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
        })}
      </div>
  )}

  export default Paginator;