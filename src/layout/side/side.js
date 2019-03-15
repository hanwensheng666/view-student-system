import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

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
					<Menu.Item key="4">
						<Link to="/act-manage">
							<Icon type="database" />
							<span>活动管理</span>
						</Link>
					</Menu.Item>
          <Menu.Item key="5">
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
