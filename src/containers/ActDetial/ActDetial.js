import React, { Component } from 'react'
import { Carousel,Rate,Icon,Button,message   } from 'antd';
import './ActDetial.scss'
import {
  signIn,
  getActDetial,
  likeActById
} from '@/api/activity'

import EditComment from '@/components/comment/EditComment'
import PartList from '@/components/partList/PartList'



class ActDetial extends Component{
  state = {
    actId:'',
    act:{},
    banner:[]
  }
  componentDidMount(){
    let actId = this.props.match.params.actId;
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
            <Carousel autoplay={false}>
              {
                this.state.act.banner&&this.state.act.banner.map(item=>{
                  return <img 
                    key={item._id}
                    className="act-detial__act-info__banner__img"  
                    src={item.imgUrl+'?imageMogr2/thumbnail/x300'+(window.is_support_webp?'/format/webp':'')} 
                    alt=""
                  />
                })
              }
            </Carousel>
          </div>
          <div className="act-detial__act-info__desc">
            <div className="act-detial__act-info__desc__rate">
              <Rate className="act-detial__act-info__desc__rate__r" value={act.avaRate} disabled></Rate> 
              <div className="act-detial__act-info__desc__rate__score">
                <div className="act-detial__act-info__desc__rate__score__num">{act.avaRate}分</div>
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

        <div className="act-detial__interactive">
          {/* 评论区 */}
          <div className="act-detial__interactive__comment">
            {act.comments && <EditComment reload={this.getActDetial.bind(this)} act={act}  />}
          </div>
          {/* 参与人员名单 */}
          <div className="act-detial__interactive__part-list">
            <PartList act={act} />
          </div>
        </div>
        
      </div>
    )
  }
}

export default ActDetial;