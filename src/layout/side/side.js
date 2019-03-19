import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu  = Menu.SubMenu ;
export default class Side extends Component {
    render() {
        return (
			<Sider>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{marginTop:"20px"}}>
					<Menu.Item key="1">
						<Link to="/overview">
							<Icon type="pie-chart" />
							<span>活动概览</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/signup">
							<Icon type="appstore-o" />
							<span>活动报名</span>
						</Link>
					</Menu.Item>
          <Menu.Item key="3">
						<Link to="/competition">
							<Icon type="database" />
							<span>排名积分</span>
						</Link>
					</Menu.Item>
          <SubMenu  key="4" title={<span><Icon type="appstore" /><span>活动管理</span></span>}>
            <Menu.Item key="4-1">
              <Link to="/act-manage/create-act">
                <Icon type="database" />
                <span>创建活动</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4-2">
              <Link to="/act-manage/modify-act">
                <Icon type="database" />
                <span>修改活动</span>
              </Link>
            </Menu.Item>
          </SubMenu>  
          <SubMenu key='5' title={<span><Icon type="appstore" /><span>社团管理</span></span>}>
          <Menu.Item key="5-1">
              <Link to="/society-manage/create-soc">
                <Icon type="database" />
                <span>创建社团</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5-2">
              <Link to="/society-manage/modify-soc">
                <Icon type="database" />
                <span>管理社团</span>
              </Link>
            </Menu.Item>
          </SubMenu> 
          <Menu.Item key="6">
						<Link to="/mine">
							<Icon type="database" />
							<span>个人中心</span>
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
        )
    }
}
