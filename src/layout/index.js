import React, { Component } from 'react'
import { Layout } from 'antd';

import Side from './side/side'
import Header from './header/header'
import Content from './content/content';


class Container extends Component {

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header/>
                <Layout>
                    <Side/>
                    <Content/>
                </Layout>
            </Layout>
        )
    }
}


export default Container;