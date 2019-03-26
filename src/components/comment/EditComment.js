import {
  Comment, Avatar, Form, Button, List, Input,
} from 'antd';
import moment from 'moment';
import React, { Component } from 'react'
import {addComment} from "@/api/activity"
const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class EditComment extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  }
  componentWillMount(){
    let {comments} = this.props.act
    let formatComments = comments && comments.map(item=>{
      return {
        author: item.name,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <p>{item.text}</p>,
        datetime: item.date,
      }
    })
    this.setState({
      comments:[...formatComments]
    })
  }
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
    });
    this.addComment()
    // setTimeout(() => {
    //   this.setState({
    //     submitting: false,
    //     value: '',
    //     comments: [
    //       {
    //         author: 'Han Solo',
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //         content: <p>{this.state.value}</p>,
    //         datetime: moment().fromNow(),
    //       },
    //       ...this.state.comments,
    //     ],
    //   });
    // }, 1000);
  }
  async addComment(){
    let res = await addComment({
      actId:this.props.act._id,
      text:this.state.value
    })
    if(res){
      console.log(res.results)
      this.setState({
        submitting: false,
        value: ''
      });
      this.props.reload()
    }
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          )}
          content={(
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          )}
        />
      </div>
    );
  }
}

export default EditComment;