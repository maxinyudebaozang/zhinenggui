//登录页
// import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { login } from '../../api/users';
import { useNavigate } from 'react-router-dom' //编程式路由跳转
import users from '../../stores/users';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        // console.log('Success:', values);
        login(values).then(res => {
            // console.log(res)
            if (res.data.errcode === 0) {
                messageApi.success('登录成功')
                users.updataInfo({
                    name: res.data.name,
                    role: res.data.role,
                    token: res.data.token
                })
                setTimeout(() => {
                    navigate('/index/home')
                }, 1000)
            } else {
                messageApi.warning('登陆失败')
            }
        })

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <Form
                className='mx-auto relative top-52 '
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        { required: true, message: '请输入邮箱!' },
                        { type: 'email', message: '请输入正确的邮箱格式!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </>


    )
}

export default Login