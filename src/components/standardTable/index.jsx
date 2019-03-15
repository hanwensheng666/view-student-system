import React, {PureComponent, Fragment} from 'react'
import {Table, Pagination} from 'antd'
import './index.scss'

export default class standardTable extends PureComponent {
    render() {
        const {rowKey, columns, list, pager} = this.props
        return (
            <Fragment>
                <Table
                    bordered
                    rowKey={rowKey}
                    columns={columns}
                    dataSource={list}
                    pagination={false}
                />
                <Pagination
                    total={pager.total}
                    showTotal={(total, pageSize) => {
                        let totalPage = Math.ceil(total / 10)
                        return `共${totalPage}页，共${total}条数据`
                    }}
                    pageSize={pager.pageSize || 10}
                    defaultCurrent={1}
                    current={pager.current || 1}
                    {...pager}
                />
            </Fragment>
        )
    }
}
