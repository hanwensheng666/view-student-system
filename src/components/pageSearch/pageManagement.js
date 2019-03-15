import React, {Component} from 'react'
import {Button, Input, Select, DatePicker} from 'antd'

import IncreasePage from './IncreasePage.jsx'

import './index.scss'


const {RangePicker} = DatePicker
const {Option} = Select

class AnswerRecordSearch extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false
        };
        this.setModalVisible = this.setModalVisible.bind(this)
    }

    setModalVisible(modalVisible){
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }


    render() {
        const { modalVisible } = this.state
        return (
            <div className="searchBox">
                <div className="condition">
                    <div className="conditionItem">
                        <label htmlFor="time">创建时间：</label>
                        <RangePicker placeholder={['开始日期', '结束日期']}/>
                    </div>
                    <div className="conditionItem">
                        <label htmlFor="platform">所属渠道：</label>
                        <Select defaultValue="all" style={{width: 120}}>
                            <Option value="all">全部</Option>
                            <Option value="ikangapp">爱康APP</Option>
                            <Option value="tijianbao">体检宝APP</Option>
                            <Option value="zhifubao">支付宝小程序</Option>
                            <Option value="qudaoyi">渠道一</Option>
                            <Option value="qudaoer">渠道二</Option>
                        </Select>
                    </div>
                    <div className="conditionItem">
                        <label htmlFor="platform">页面状态：</label>
                        <Select defaultValue="all" style={{width: 120}}>
                            <Option value="all">全部</Option>
                            <Option value="生效">生效</Option>
                            <Option value="无效">无效</Option>
                        </Select>
                    </div>
                </div>
                <div className="conditionItem">
                    <label htmlFor="questionnaireName">页面名称：</label>
                    <Input placeholder="页面名称"  style={{width: 150}} />
                </div>
                <div className="operate">
                    <Button>查询</Button>
                    <Button type="primary" onClick={this.setModalVisible}>+新增页面</Button>
                </div>
                <IncreasePage setModalVisible={this.setModalVisible} modalVisible={modalVisible}/>
            </div>
        )
    }
}


export default AnswerRecordSearch
