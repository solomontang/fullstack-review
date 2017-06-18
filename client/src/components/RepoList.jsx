import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => (
  <div>
    There are {props.repos.length} repos.
    <h2>Top 25 Repos in Database</h2>
    <ol>
      {props.repos.map( (repo, index) => {
        return <Repo info={repo} key={index}></Repo>;
      })}
    </ol>
  </div>
)

export default RepoList;