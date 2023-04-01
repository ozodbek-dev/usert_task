import { Space, Spin } from 'antd'
import React from 'react'

export default function Loader() {
  return (
    <div className='loader'>
      <Space direction="vertical" style={{ width: '100%' }}>
     
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
  </Space>
    </div>
  )
}
