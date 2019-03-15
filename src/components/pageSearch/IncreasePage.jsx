import React ,{Component}from 'react'
import {Select, Input, Modal} from 'antd'


const Option = Select.Option

class IncreaseProblem extends Component{
  constructor(){
    super();
    this.state = {
      value: null
    }
  }


    onChangeQuestionnaireTitle(){

    }

    onBlur(){

    }

  handleChange(value){
    console.log(value)
    this.setState({
      value
    })
  }

  changeYear(value){
    console.log('changed', value)
  }

  render(){
    const { setModalVisible, modalVisible } = this.props;
    return (
        <Modal
            title="新增页面"
            centered
            visible={modalVisible}
            okText="保存"
            cancelText="取消"
            onOk={()=>setModalVisible(false)}
            onCancel={()=>setModalVisible(false)}
            >
              <ul className="select_content">
                <li>
                  <span>页面名称：</span>
                  <Input
                      placeholder="页面title位置，不多于20个字"
                      onChange={ this.onChangeQuestionnaireTitle }
                      onBlur={this.onBlur}/>
                </li>
                <li>
                  <span>页面描述：</span>
                  <Input
                      placeholder="备注，不展示，不多于20个字"
                      onBlur={this.onBlur}/>
                </li>
                <li>
                  <span>页面名称：</span>
                  <Select
                      className="select_way"
                      defaultValue={'请选择'}
                      onChange={this.handleChange.bind(this)}>
                    <Option value="请选择">请选择</Option>
                    <Option value="渠道一">渠道一</Option>
                    <Option value="渠道二">渠道二</Option>
                    <Option value="渠道三">渠道三</Option>
                  </Select>
                </li>
              </ul>
        </Modal>
    )
  }
}



export default IncreaseProblem
