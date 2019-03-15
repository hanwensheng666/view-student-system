import React, { Component } from 'react'
import {Button,Input} from 'antd'
import "../../style/ComponentManagement.css"

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { testHttp } from '../../api'
import { addCount } from '../../redux/actions'

class ComponentManagement extends Component {
    constructor(){
        super();
        this.state = {
            a:"。。。。。。。。。。"
        }
    }
    componentWillMount(){
        testHttp().then(res=>{
            this.setState({
                a:res.data.message
            })
        })
    }
    addCount(){
        //调用action
        let count = this.props.test.count+1;
        this.props.addCount(count)
    }
    render() {
        const { count } = this.props.test;
        const { a } = this.state;
        return (
            <div className="wrapCount">
              <div className="borderBottom">
                <span>组件名称&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Input placeholder="组件名称" style={{color:"black",width:"160px"}} />&nbsp;&nbsp;
                <Button>查询</Button>
              </div>
              <h2>{a}</h2>
              <h2>COUNT:{count}</h2>
              <Button onClick={()=>this.addCount()}>count++</Button>
            </div>
        )
    }
}

ComponentManagement.propTypes = {
    addCount:PropTypes.func.isRequired,
    test:PropTypes.object.isRequired
}
//将状态映射为属性
const mapStateToProps = state => ({
    test:state.test
})

export default connect(mapStateToProps,{addCount})(ComponentManagement)