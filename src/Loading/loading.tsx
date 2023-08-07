import NProgress from 'nprogress' //导入进度条插件
import 'nprogress/nprogress.css'    //导入进度条样式
import { useEffect } from 'react';

import { Alert, Space, Spin } from 'antd'

const Loading = () => {

    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };

    }, []);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading...">
                <Alert
                    message="正在加载中..."
                    description="请耐心等待哦~"
                    type="info"
                />
            </Spin>
        </Space>
    )
}

export default Loading