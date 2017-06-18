import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Repo from './components/Repo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() { 
    this.getTopByForks();
  }

  getTopByForks() {
    $.ajax('/repos',
      {
        type: 'GET',
        success: (data) => {
          this.setState({repos: data});
        }   
      }
    )
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax('/repos/import',
      {
        type: 'POST',
        data: {'username': term},
        success: (response) => {
          console.log(response);
        }
      }
    );
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));