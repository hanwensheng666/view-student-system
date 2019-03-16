import React, { Component } from 'react'
import './Error.scss'

class Error extends Component{
  render(){
    return (
      <div>
        sorry,{this.props.msg}
      </div>
    )
  }
}

export default Error;