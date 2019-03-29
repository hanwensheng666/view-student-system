import React, { Component } from 'react'
import { Carousel,Rate,Icon,Button,message,Comment, Avatar, Form, List, Input} from 'antd';
import './Overview.scss'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


import {
  getIndexBanner,
  getActSortByRate,
  getActNumGroupByClass,
  getActNumByMounth
} from '@/api/activity'
class Overview extends Component{
  
  state={
    imgs:'',
    list:'',
    classNum:'',
    name:[],
    value:[],
  }
  
  componentDidMount(){
    this.news()
    this.classNum()
    this.getIndexBanners()
    let socActNums = echarts.init(document.getElementById('socActNums'));
    socActNums.setOption({
      title: { text: '各班活动参与人数' },
      tooltip: {},
      xAxis: {
        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        data: this.state.name
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          // data:[5, 20, 36, 10, 10, 20]
           data:this.state.name
      }]
    })
  }

  async classNum(){
      let res = await getActNumGroupByClass()
      console.log(res,'33')
      if(res && res.code===0){
        let classNum= res.results
        let name = classNum.map(item=>{
          return item.socName
        })
        let value = classNum.map(item=>{
          return  Number(item.number)
        })
        
        this.setState({name,value})
        console.log(this.state.name,this.state.value,'x',)
      }
    }


  
  async getIndexBanners(){
    let res = await getIndexBanner()
    console.log(res)
    if(res && res.code===0){
     let imgs= res.results
      this.setState({imgs})
      console.log(this.state.imgs)
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


  render(){
    let {imgs,list} = this.state
    const swiperItem = imgs &&imgs.map((item,index) => (
      <div key={index} className="view__carousel__img">
        {
          (item.img && item.img.imgUrl) ? 
          <img src={item.img.imgUrl+'?imageMogr2/crop/700x/format/webp'} alt=""/> : 
          <img src="https://p1.meituan.net/750.0.0/tdchotel/__24567842__1490663.jpg" alt=""/>
        }
      </div>
    ))

    const lists= list &&list.map((item,index) => (
      <div key={index} className="view__echarts__list__news">
        {
          <div>
            <span className="view__echarts__list__news__span">{item.activityName}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>热度：{item.avaRate}</span>
          </div>
        }
      </div>
    ))
    return (
      <div className="view">
        <div className="view__carousel">
          <Carousel
            autoplay={true}
            infinite
            autoplayInterval={3000}
          >
            {swiperItem}
          </Carousel>
        </div>
        <div className="view__echarts">
          <div id="socActNums">数据加载中...</div>
          <div id="socActNums">数据加载中...</div>
          <div id="view__echarts__list">
            <h3>活动热度排名</h3>
            {lists}
          </div>
        </div>
      </div>
    )
  }
}

export default Overview;