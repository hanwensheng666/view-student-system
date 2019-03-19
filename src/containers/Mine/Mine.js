import React, { Component } from 'react'
import './Mine.scss'

import { Avatar } from 'antd';

class Mine extends Component{
  
  render() {
    return (
      <div className="mine">
        <div className="mine-info">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          基本资料
        </div>
        <div className="mine-news">系统消息</div>
      </div>
    );
  }
}

export default Mine;