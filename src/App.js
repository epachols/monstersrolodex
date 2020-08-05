import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    
    //note that the below is the way to BIND the 'this' within our custom method handleChange, even though it wouldn't normally recognize the 'this' reference for a custom method (doesn't immediately inherit)
    //so we take the "this" inherited from the component class, and binds the handlechange 'this' to it, thus linking our custom method in properly.
    // this.handleChange = this.handleChange.bind(this);
    //TODO: importantly, we can use es6' tendency to SET CONTEXT to our advantage!
  }

  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }
  
  // handleChange(e) {
  //   this.setState({searchField: e.target.value})
  // }
  //taking advantage of lexical scoping rather than binding above.
  //because of how it defines where it belongs in lexical scoping, by using an arrow here we don't have to do this ridiculous massive contextual binding.
  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
      <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search for monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />{" "}
      </div>
    );
  }
}


export default App;
