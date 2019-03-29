import React, { Component } from 'react'
import { Carousel,Rate,Icon,Button,message,Comment, Avatar, Form, List, Input   } from 'antd';
import './Overview.scss'
import {Link} from 'react-router-dom'
import {
  getIndexBanner,
} from '@/api/activity'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Overview extends Component{
  state={
    imgs:''
  }
  componentDidMount(){
    this.getIndexBanners()
    let socActNums = echarts.init(document.getElementById('socActNums'));
    socActNums.setOption({
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    })
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



  render(){
    let imgs = this.state.imgs
    const swiperItem = imgs &&imgs.map((item,index) => (
      <div key={index} className="view__carousel__img">
        {
          (item.img && item.img.imgUrl) ? 
          <Link to={`/act-detial/${item._id}`}><img style={{display:'block',width:'100%'}} src={item.img.imgUrl+'?imageMogr2/crop/700x/format/webp'} alt=""/></Link> : 
          <img src="https://p1.meituan.net/750.0.0/tdchotel/__24567842__1490663.jpg" alt=""/>
        }
      </div>
    ))
    return (
      <div className="view">
        <div className="view__carousel">
          <Carousel
            autoplay={true}
            infinite
            autoplayInterval={300000}
          >
            {swiperItem}
          </Carousel>
        </div>
        <div className="view__echarts">
          <div id="socActNums">数据加载中...</div>
        </div>
      </div>
    )
  }
}

export default Overview;