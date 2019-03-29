import React, { Component } from 'react'
import { Carousel,Rate,Icon,Button,message,Comment, Avatar, Form, List, Input   } from 'antd';
import './Overview.scss'
import {
  getIndexBanner,
} from '@/api/activity'


class Overview extends Component{
  
  state={
    imgs:''
  }
  
  componentDidMount(){
    this.getIndexBanners()
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
          <img src={item.img.imgUrl+'?imageslim'} alt=""/> : 
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
            autoplayInterval={3000}
          >
            {swiperItem}
          </Carousel>
        </div>
      </div>
    )
  }
}

export default Overview;