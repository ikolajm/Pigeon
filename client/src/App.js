import React, { Component } from 'react';
import Layout from './components/Layout';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="contain">
        <Layout title="Pigeon" />
      </div>
    );
  }
}