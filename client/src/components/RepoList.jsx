import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {console.log('inrepolist', props.repos)}
    {props.repos.map( (repo) => {
      return <Repo info={repo} key={repo.url}></Repo>;
    })}
  </div>
)

export default RepoList;