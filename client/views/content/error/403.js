import React from 'react';
import { Button } from 'antd';
import './error.scss'

const Page403 = () => (
  <div className="error-403">
    <div className="error-image" />
    <div>
      <h1>403</h1>
      <p className="error-desc">抱歉，你无权访问该页面</p>
      <Button type="primary">返回首页</Button>
    </div>
  </div>
)

export default Page403
