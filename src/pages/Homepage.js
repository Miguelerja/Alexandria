import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        
      </div>
    )
  }
}

export default withAuth(Homepage);
