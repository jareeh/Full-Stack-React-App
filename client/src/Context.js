import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';
import config from './config'

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  render() {

    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        api: this.api
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if(user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          authenticatedPassword: password
        } 
      })
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }

  api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if(requiresAuth){
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

export default withContext;