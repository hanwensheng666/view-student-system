import React, { Component } from 'react'
import './Error.scss'
import { Empty } from 'antd';

class Error extends Component{
  render(){
    return (
      <div>
        <Empty description={'sorry, '+ this.props.msg} />,
      </div>
    )
  }
}

export default Error;