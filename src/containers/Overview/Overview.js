import React, { Component } from 'react'
import { Carousel,Rate,Icon,Button,message,Comment, Avatar, Form, List, Input} from 'antd';
import './Overview.scss'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/pie';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


import {
  getIndexBanner,
  getActSortByRate,
  getActNumGroupByClass,
  getActNumGroupBySoc
  // getActNumByMounth
} from '@/api/activity'
class Overview extends Component{
  state={
    imgs:'',
    list:'',
    classNum:'',
    classNo:[],
    partNum:[],
    socNumArr:[],
    socActNum:[]
  }
  componentDidMount(){
    this.news()
    this.classNum()
    this.getIndexBanners()
    this.getActNumGroupBySoc()
  }

  async classNum(){
    let res = await getActNumGroupByClass()
    if(res && res.code===0){
      let classNum= res.results
      let classNo = classNum.map(item=>{
        return item.socName
      })
      let partNum = classNum.map(item=>{
        return  Number(item.number)
      })
      this.setState({classNo,partNum},()=>{
        let socActNums = echarts.init(document.getElementById('classPart'));
        socActNums.setOption({
          title: { 
            text: '各班活动参与人数(最近10个活动)',
            bottom:10,
            left:'center'
          },
          tooltip: {},
          xAxis: {},
          yAxis: {data: this.state.classNo},
          series: [{
              name: '参与人数',
              type: 'bar',
              data:this.state.partNum
          }]
        })
      })
    }
    }


  
  async getIndexBanners(){
    let res = await getIndexBanner()
    if(res && res.code===0){
     let imgs= res.results
      this.setState({imgs})
    }
  }
  async getActNumGroupBySoc(){
    let res = await getActNumGroupBySoc()
    if(res && res.code===0){
      let arr = res.results;
      let socNumArr = arr.map(item=>item.socName)
      let socActNum = arr.map(item=>{
        return {
          name:item.socName,
          value:item.number
        }
      })
      this.setState({socNumArr,socActNum},()=>{
        let option = {
          title : {
            text: '各社团活动占比',
            x:'center',
            bottom:10,
            left:'25%'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: this.state.socNumArr,
          },
          series : [
            {
              name: '社团',
              type: 'pie',
              radius : '55%',
              center: ['40%', '50%'],
              data: this.state.socActNum,
              itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        let socActNums = echarts.init(document.getElementById('socActNums'));
        socActNums.setOption(option)
      })
    }
  }
  async news(){
    let res = await getActSortByRate()
    if(res && res.code===0){
     let list= res.results
      this.setState({list})
      console.log(this.state.list)
    }
  }

  goDetial(path){
    this.props.history.push(path)
  }
  render(){
    let {imgs,list} = this.state
    const swiperItem = imgs &&imgs.map((item,index) => (
      <div key={index} className="view__carousel__img">
        {
          (item.img && item.img.imgUrl) ? 
          <img 
            style={{
              width:'100%',
              height:'100%'
            }}
            onClick={()=>{this.goDetial(`/act-detial/${item._id}`)}} 
            src={item.img.imgUrl+'?imageMogr2/crop/700x/format/webp'}
            alt=""
          /> : 
          <img  src="https://p1.meituan.net/750.0.0/tdchotel/__24567842__1490663.jpg" alt=""/>
        }
      </div>
    ))

    // const lists= list &&list.map(item => item.activityName)
    return (
      <div className="view">
        <div className="view__top">
          <div className="view__top__carousel">
            <Carousel
              autoplay={false}
              infinite
              autoplayInterval={300000}
            >
              {swiperItem}
            </Carousel>
          </div>
          <div className="view__top__list">
            <List
              size="small"
              header={<div>活动热度排名</div>}
              header={<div className="view__top__list__items">
                  <div className="view__top__list__items__name">活动热度排名</div>
                  <div>参与人数</div>
                  <div>评分</div>
                  <div>赞</div>
                </div>}
              bordered
              dataSource={list}
              renderItem={item => (<List.Item>
                <div className="view__top__list__items">
                  <div className="view__top__list__items__name">{item.activityName}</div>
                  <div>{item.parts}人</div>
                  <div>{item.avaRate}分</div>
                  <div>{item.likes}</div>
                </div>
              </List.Item>)}
            />
          </div>
        </div>
        <div className="view__echarts">
          <div id="classPart">数据加载中...</div>
          <div id="socActNums">数据加载中...</div>
        </div>
      </div>
    )
  }
}

export default Overview;