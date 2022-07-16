import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Landing extends Component {
  render() {
    return (
      <Link to="/home" ><button> Conocé a tu amigo </button> </Link>
    )
  }
}

export default Landing