import React, { Component } from 'react'
import { Carousel,Rate,Icon,Button,message,Comment, Avatar, Form, List, Input   } from 'antd';
import './ActDetial.scss'
import {
  signIn,
  getActDetial,
  likeActById
} from '@/api/activity'

import EditComment from '@/components/comment/EditComment'
const TextArea = Input.TextArea;


class ActDetial extends Component{
  state = {
    actId:'',
    act:{},
    banner:[]
  }
  componentDidMount(){
    let actId = this.props.location.state.act._id;
    this.setState({
      actId
    },()=>{
      this.getActDetial()
    })
  }
  async getActDetial(){
    let res = await getActDetial(this.state.actId)
    this.setState({
      act:res.results
    })
  }
  async signIn(actId){
    let res = await signIn({actId})
    if(res && res.code === 0){
      message.success('报名成功')
      this.getActDetial()
    }
  }
  async likeFn(actId){
    let res = await likeActById(actId)
    if(res && res.code === 0){
      this.getActDetial()
    }
  }
  render(){
    let {act} = this.state;
    return (
      <div className="act-detial">
        {/* 描述 */}
        <div className="act-detial__title">
          <div>{act.activityName}</div>
          <div className="act-detial__title__right">
            {
              act.isSignIn?<span>已报名 <Icon type="check-circle" /></span>:<Button onClick={()=>{this.signIn(this.state.actId)}}>马上报名</Button>
            }
          </div>
        </div>
        <div className="act-detial__act-info">
          <div className="act-detial__act-info__banner">
            <Carousel autoplay>
              <img className="act-detial__act-info__banner__img" src="https://p1.meituan.net/750.0.0/tdchotel/__24567842__1490663.jpg" alt=""/>
              <img className="act-detial__act-info__banner__img" src="https://p1.meituan.net/750.0.0/dnaimgdark/bbb3beeabc1654178deb654c65e997996319383.jpg" alt=""/>
            </Carousel>
          </div>
          <div className="act-detial__act-info__desc">
            <div className="act-detial__act-info__desc__rate">
              <Rate className="act-detial__act-info__desc__rate__r" defaultValue={2.5} disabled></Rate> 
              <div className="act-detial__act-info__desc__rate__score">
                <div className="act-detial__act-info__desc__rate__score__num">2.5分</div>
                <div className="act-detial__act-info__desc__rate__score__common-num">共有{act.comments?act.comments.length:'0'}条评价</div>
              </div>
            </div> 
            <div className="act-detial__act-info__desc__info">
              <div className="act-detial__act-info__desc__info__item">活动时间：{act.activityTime}</div>
              <div className="act-detial__act-info__desc__info__item">组织社团：{act.society?act.society.societyName:''}</div>
              <div className="act-detial__act-info__desc__info__item">活动负责人：{act.activityOrganizer?act.activityOrganizer.name:''}</div>
              <div className="act-detial__act-info__desc__info__item">报名人数：{act.activityParticipate?act.activityParticipate.length:'0'} 人</div>
              <div className="act-detial__act-info__desc__info__item">活动学分：{act.activityCredit}</div>
            </div>
            <div className="act-detial__act-info__desc__like">
              <span className="act-detial__act-info__desc__like__num">共有 {act.likes?act.likes.length:0} 人点赞</span>
              <Icon onClick={()=>{this.likeFn(this.state.actId)}} type="heart" theme="twoTone" twoToneColor={act.isLiked?"#eb2f96":"#ccc"} />
            </div>
          </div>
        </div>
        {/* 简介 */}
        <div className="act-detial__introduction">
          <h1 className="act-detial__introduction__title">活动介绍</h1>
          <div className="act-detial__introduction__content">
            {act.activityIntroduction}
          </div>
        </div>

        {/* 评论区 */}
        <div className="act-detial__comment">
          {act.comments && <EditComment reload={this.getActDetial.bind(this)} act={act}  />}
        </div>
      </div>
    )
  }
}

export default ActDetial;