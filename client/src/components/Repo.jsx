import React from 'react';

const Repo = (props) => (
  <li>
    <div>
      <h2>{props.info.repoTitle}</h2>
      <p>
        Author: {props.info.username}
        <span>   Forks: {props.info.forks}</span>
      </p>
      <a href={props.info.url}>{props.info.url}</a>
    </div>
  </li>
)

export default Repo;