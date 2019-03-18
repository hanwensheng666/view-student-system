import React, { Component } from 'react'
import './PageHolder.scss'
import { Empty } from 'antd';

class PageHolder extends Component{
  render(){
    return (
      <div className="page-holder">
        <Empty  description="客官稍等，内容马上到来~" />,
      </div>
    )
  }
}

export default PageHolder;