import React, { Component } from 'react';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';
import './App.css';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

// config for Styled Firebase UI

class App extends Component {

  state = {
    page: "people",
    user: null,
    userData: null
  }

  componentDidMount() {
    // add in auth event listener here!
  }

  componentWillUnmount() {
    // remove listener here
  }

  updatePage = (newPage) => {
    this.setState({
      page: newPage
    })
  }

  render() {
    return (
      <div>
        <Nav page={this.state.page} pageCallback={this.updatePage} user={this.state.user} />
        {this.state.user ?
          <Main page={this.state.page} pageCallback={this.updatePage} user={this.state.user} userData={this.state.userData} />
          :
          <div>Login here!</div>
        }
        <Footer />
      </div>
    );
  }

}

export default App;
