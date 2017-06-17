import React from 'react';

const Repo = (props) => (
  <ul>
    <h1>Top 25 Repos in Database</h1>
    <div>
      <h2>{props.info.repoTitle}</h2>
      <p>
        Author: {props.info.username}
        <span>   Forks: {props.info.forks}</span>
      </p>
      <a href={props.info.url}>{props.info.url}</a>
    </div>
  </ul>
)

export default Repo;