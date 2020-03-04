import React, { Component } from 'react';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';
import './App.css';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

// config for Styled Firebase UI
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

class App extends Component {

  state = {
    page: "people",
    user: null,
    userData: null
  }

  componentDidMount() {
    this.unregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        let uid = firebaseUser.uid;
        // use uid to check whether data about this person exists
        let dbRef = firebase.database().ref("/users").child(uid);
        dbRef.on("value", (snapshot => {
          let userData = snapshot.val();
          this.setState({
            user: firebaseUser,
            userData: userData
          });
        }));
      } else {
        this.setState({
          user: null
        })
      }
    });
  }

  componentWillUnmount() {
    this.unregFunc();
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
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        }
        <Footer />
      </div>
    );
  }

}

export default App;
