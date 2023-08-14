import myImage from '../../assets/u491.svg'
import myImage1 from '../../assets/u493.svg'
import { useRequest } from 'ahooks'
import './infoList.css'
import {
    Modal, Table,  Button, Popconfirm, message, Space, Input, Form, Select
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { CheckItem } from '../../types/base'
import { addCheck, addUser, deleteUser } from '../../api/checks'
import { debounce } from 'lodash'
import { useState } from 'react'
import { PlusCircleFilled} from '@ant-design/icons'


const InfoList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data, error, loading, refresh } = useRequest(addCheck)
    // const [form] = Form.useForm()
    const [form2] = Form.useForm()
    // const [open, setOpen] = useState(false)


    const confirm = (id: any) => {
        deleteUser(id).then((res) => {
            if (res.data) {
                message.success('删除成功')
                refresh() // 重新发起请求

                //怎么能够让界面同步发生改变
                //1. 修改data数据，因为data是状态，会导致函数组件重新渲染
                //2. 重新发起查询的请求，拉取数据库中最新的数据去更新视图 (多发一次请求，操作会比较容易一些)
            } else {
                message.warning('删除失败')
            }
        })
    }

    const cancel = () => { }
    // const onOpen = (name: string, role: string, id: number) => {
    //     setOpen(true)
    //     form.setFieldsValue({ name, role, id })
    // }
    const columns: ColumnsType<CheckItem> = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: '会员类型',
            dataIndex: 'viptype',
            key: 'viptype',
        },
        {
            title: '手机号',
            dataIndex: 'iphonnumber',
            key: 'iphonnumber',
        },
        {
            title: '账户余额',
            dataIndex: 'moneyyue',
            key: 'moneyyue',
        },
        {
            title: '可用余额',
            dataIndex: 'keyongyue',
            key: 'keyongyue',
        },
        {
            title: '待收',
            dataIndex: 'daishou',
            key: 'daishou',
        },
        {
            title: '冻结',
            dataIndex: 'dongjie',
            key: 'dongjie',
        },
        {
            title: '创建时间',
            dataIndex: 'chuangjiantime',
            key: 'chuangjiantime',
        },
        {
            title: '最近登录时间',
            dataIndex: 'denglutime',
            key: 'denglutime',
        },
        {
            title: '状态',
            dataIndex: 'zhuangtai',
            key: 'zhuangtai',
            // render: (_, record) => {
            //     // 1. _ -> 当前字段  2. record -> 当前整条数据
               
            //     const suoding = (record:any) =>{
                   
            //     }
            //     const disabled:any = () =>{
            //         disabled ? false : true
                    
            //     }
            //     return (
            //         <Space>
            //             <Popconfirm
            //                 title="操作"
            //                 description="是否要锁定当前会员?"
            //                 onConfirm={() => suoding(record)}
            //                 onCancel={cancel}
            //                 okText="确定"
            //                 cancelText="取消"
                            
            //             >
            //          <Button  className='rounded-full' disabled={disabled} >
            //              正常
            //          </Button>
            //             </Popconfirm>
            //         </Space>
            //     )
            // }
        },
        {
            title: '操作',
            dataIndex: 'caozuo',
            key: 'caozuo',
            render: (_, record) => {
                // 1. _ -> 当前字段  2. record -> 当前整条数据
                return (
                    <Space>
                        <Popconfirm
                            title="操作"
                            description="是否要注销当前会员?"
                            onConfirm={() => confirm(record.id)}
                            onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="primary" danger className='rounded-full' >
                                会员注销
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },

    ]


    const onModalOpen = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleReset = () => {
        form2.resetFields()
    }
    const onFinish2 = (values: any) => {
        console.log('Success:', values)
        console.log(123)
        // values.password = values.ID.lengh()
        addUser(values).then((res) => {
            if (res.data) {
                message.success('添加成功')
                handleReset()
                handleCancel()
                refresh()
            }
            else {
                message.warning('添加失败')
            }
        })
    }

    const onFinishFailed2 = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const handleChangeFront: any = debounce((e) => { //防抖
        // console.log(data)
        // console.log(e.target.value)


        if (data) {
            data.map(() => {

            })
        }
        else {
            console.log(456)
        }
    }, 200);
    if (error) {
        return <div>{error.message}</div>
    }
    if (loading) {
        return <div>loading...</div>
    }
    return (
        <>
            <div className=" h-12"><h2>账户信息</h2></div>
            <div className=" h-12 flex justify-between" >
                <div className="flex justify-center">
                    <Input type="text" className=" h-6 " placeholder="请输入手机号/ID"
                        onChange={handleChangeFront}
                    //value={handlevalue}
                    />
                    <div className='fangDaJing'>
                        <img src={myImage} /></div>
                    <div className='gaoJiSouSuo'>
                        <p><img src={myImage1} /></p>高级搜索</div></div>
                {/* <div className=" float-right space-x-2">
                    <Space>
                        {'5/400'}
                        <Button >上一页</Button>
                        <Button >下一页</Button>
                    </Space>
                </div> */}
            </div>
            <Table
                rowKey="id"
                dataSource={data}
                columns={columns}
            />
            <Button
                type="primary"
                icon={<PlusCircleFilled />}
                onClick={onModalOpen}
            >
                会员添加
            </Button>
            <Modal
                title="会员添加"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish2}
                    onFinishFailed={onFinishFailed2}
                    autoComplete="off"
                    form={form2}
                    className="pt-7"
                >

                    <Form.Item
                        label="ID"
                        name="ID"
                        rules={[
                            { required: true, message: 'ID不能为空!' },
                            // { type: ID, message: '请输入正确的类型!' },

                        ]}
                    >
                        <Input placeholder="请输入ID" />
                    </Form.Item>

                    <Form.Item
                        label="会员类型"
                        name="viptype"
                        rules={[
                            { required: true, message: '会员类型不能为空!' },

                        ]}
                    ><Select
                            placeholder="请选择类型"
                            options={[
                                { value: '快递员', label: '快递员' },
                                { value: '普通会员', label: '普通会员' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="手机号"
                        name="iphonnumber"
                        rules={[{ required: true, message: '手机号不能为空!' }]}
                    >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item
                        label="账户余额"
                        name="moneyyue"
                        rules={[{ required: true, message: '请输入账户余额!' }]}
                    >
                        <Input placeholder="请输入账户余额" />
                    </Form.Item>

                    <Form.Item
                        label="可用余额"
                        name="keyongyue"
                        rules={[{ required: true, message: '请输入账户可用余额!' }]}
                    >
                        <Input placeholder="请输入账户可用余额" />
                    </Form.Item>

                    <Form.Item
                        label="待收"
                        name="daishou"
                        rules={[{ required: true, message: '初次创建请写0!' }]}
                    >
                        <Input placeholder="初次创建请写0" />
                    </Form.Item>

                    <Form.Item
                        label="冻结"
                        name="dongjie"
                        rules={[{ required: true, message: '账号冻结资金!' }]}
                    >
                        <Input placeholder="账号冻结资金" />
                    </Form.Item>

                    <Form.Item
                        label="创建时间"
                        name="chuangjiantime"
                        rules={[{ required: true, message: '创建时间!' }]}
                    >
                        <Input placeholder="创建时间" />
                    </Form.Item>

                    <Form.Item
                        label="登录时间"
                        name="denglutime"
                        rules={[{ required: true, message: '登录时间!' }]}
                    >
                        <Input placeholder="登录时间" />
                    </Form.Item>

                    <Form.Item
                        label="状态"
                        name="zhuangtai"
                        rules={[{ required: true, message: '状态!' }]}
                    >
                        <Input placeholder="状态" />
                    </Form.Item>

                    <Form.Item
                        label="操作"
                        name="caozuo"
                        rules={[{ required: true, message: '···!' }]}
                    >
                        <Input placeholder="···" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space className="float-right">
                            <Button onClick={handleReset}>
                                重置
                            </Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default InfoList