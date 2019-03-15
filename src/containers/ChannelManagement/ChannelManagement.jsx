import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Input} from 'antd';
import "../../style/ChannelManagement.css";


class Page2 extends Component {
    render() {
        let {count} = this.props.test
        return (
            <div className="wrapCount">
                <div className="borderBottom">
                    <span>渠道名称&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input placeholder="渠道名称" style={{color:"black",width:"160px"}} />&nbsp;&nbsp;
                    <Button>查询</Button>
                </div>


                <h2>count:{count}</h2>
            </div>
        )
    }
}

Page2.propTypes = {
    test:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    test:state.test
})
export default  connect(mapStateToProps,{})(Page2)