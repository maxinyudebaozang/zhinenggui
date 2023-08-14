import React, { useState } from 'react';
import { Button, Input, Modal, Space, Table, Drawer, Form, Select, message, Popconfirm } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { packagedata, addPackage, updatePackage, deletePackage } from '../../api/users';
import { useRequest } from 'ahooks';
import Loading from '../../Loading/loading';





const PackageList: React.FC = () => {



    const { data, error, loading, refresh } = useRequest(packagedata);//请求数据
    // useRequest 提供了 refresh 方法，使我们可以使用上一次的参数，重新发起请求
    // console.log(data)

    const [form] = Form.useForm();//拿到表单数据
    //搜索框事件
    const { Search } = Input;

    //搜索框搜索事件的完成
    const onSearch = (value: any) => {
        console.log(value)
        packagedata().then(res => {
            console.log(res)
            if (res.data) {
                message.success('查询成功')
                refresh()
            } else {
                message.warning('查询失败')
            }
        })
    };






    // --------抽屉--添加操作

    const [open, setOpen] = useState(false);
    /* const showDrawer: any = (box: any, state: string[], id: number, paijianren: string, paitel: number, shoujianren: string, shoutel: number) => {
        setOpen(true)
        form.setFieldsValue({ box, state, id, paijianren, paitel, shoujianren, shoutel }) //设置表单回显数据
    } */
    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false);
    };

    // --------抽屉

    // ----高级搜索的弹框
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const handleOk1 = () => {
        setIsModalOpen1(false);
    };

    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    // ----高级搜索
    //---删除包裹
    const confirm = (id: number) => {
        console.log(id)
        deletePackage(id).then(res => {
            console.log(id)
            if (res.data) {
                message.success('删除成功')
                //怎么能够让界面同步发生改变
                //  1.修改data数据，因为data是状态，会导致函数组件重新渲染
                //  2.重新发起查询请求，拉去数据库中最新的数据去更新视图（多发一次请求，操作较为容易些）
                refresh()
            } else {
                message.warning('删除失败')
            }
        })
    }
    const cancel = () => {
        message.warning('取消删除');
    };
    //---删除包裹
    // ---修改状态的弹框
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const showModal2 = (record: any, id: any) => {
        setIsModalOpen2(true);
        form.setFieldsValue({ record, id }) //设置表单回显数据
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const onFinish2 = (values: any) => {//表单提交

        //修改用户信息
        updatePackage(values.id, { state: values.state }).then((res) => {
            if (res.data) {
                message.success('修改成功')
                setIsModalOpen2(false) //关闭模态框
                refresh()
            } else {
                message.warning('修改失败')
            }
        })
    }
    const onFinishFailed2 = (errorInfo: any) => { //表单提交失败
        console.log('Failed:', errorInfo);

    }

    // ---修改状态


    // ---表格类型---
    // interface DataType {
    //     id: number|string;
    //     key: string;
    //     box: number;
    //     paijianren: string;
    //     paitel: string;
    //     shoujianren: string;
    //     shoutel: string;
    //     address: string;
    //     state: string[];
    // }
    // ---表格类型---




    // ---表格数据---
    const columns: ColumnsType<any> = [
        {
            title: '箱格',
            dataIndex: 'box',
            key: 'box',
            render: (text) => <a>{text}</a>
        },
        {
            title: '派件人',
            dataIndex: 'paijianren',
            key: 'paijianren',
            render: (_, record) => (
                <Space size="middle">
                    <a>{record.paijianren}</a>
                    <a>{record.paitel}</a>
                </Space>
            )
        },
        {
            title: '取件人',
            dataIndex: 'shoujianren',
            key: 'shoujianren',
            render: (_, record) => (
                <Space size="middle">
                    <a>{record.shoujianren}</a>
                    <a>{record.shoutel}</a>
                </Space>
            )
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: (_, record) => (
                record.state
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {

                return (
                    <Space size="large" >
                        <Button type='link'>查看详情</Button>
                        <Button type='link'>重发取货码</Button>
                        <Button type='link'>催促顾客取件</Button >
                        <Button type='link' onClick={() =>
                            showModal2(record.state, record.id)
                        }
                        >
                            修改状态
                        </Button>
                        <Popconfirm
                            title="删除包裹信息"
                            description="确定要删除吗？"
                            onConfirm={() => confirm(record.id)}
                            onCancel={cancel}
                            okText="确认"
                            cancelText="qu'xia"
                        >
                            <Button type='primary' danger >删除包裹</Button>
                        </Popconfirm>
                    </Space >
                )
            }
        },
        // ---表格数据---
    ];


    if (error) {
        return <div>{error.message}</div>;
    }
    if (loading) {
        return <div><Loading /></div>;
    }

    //添加包裹的表单操作

    const onFinish = (values: any) => {//表单提交
        console.log('Success:', values);
        // 添加用户信息
        addPackage(
            values
        ).then((res) => {
            if (res.data) {
                message.success('添加成功')
                onClose()
                refresh()
            } else {
                message.warning('添加失败')
            }
        })
    }
    const onFinishFailed = (errorInfo: any) => { //表单提交失败
        console.log('Failed:', errorInfo);

    }
    //


    return (
        <>
            <div>
                <div>
                    <Space size="large">
                        <Search placeholder="请输入箱格/手机号/姓名/单号" allowClear onSearch={onSearch} />
                        <Button type="dashed" onClick={showModal1}>
                            高级搜索
                        </Button>
                        <Modal title="Basic Modal" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                        <Button type="primary" className="ml-24" onClick={() => showDrawer()}>
                            添加包裹信息
                        </Button>
                        <Drawer
                            title="添加包裹信息"
                            placement="top"
                            closable={false}
                            onClose={onClose}
                            open={open}
                            height={500}
                        >
                            <Form
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            // form={form} //表单数据
                            >
                                <Form.Item
                                    label="箱格"
                                    name="box"
                                    rules={[
                                        { required: true, message: '箱格不能为空!' },
                                    ]}
                                >
                                    <Input placeholder="请输入箱格" />
                                </Form.Item>
                                <Form.Item
                                    label="派件人"
                                    name="paijianren"
                                    rules={[
                                        { required: true, message: '派件人不能为空!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="电话"
                                    name="paitel"
                                    rules={[
                                        { required: true, message: '电话不能为空!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="取件人"
                                    name="shoujianren"
                                    rules={[
                                        { required: true, message: '取件人不能为空!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="电话"
                                    name="shoutel"
                                    rules={[
                                        { required: true, message: '电话不能为空!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="包裹状态"
                                    name="state"
                                    rules={[{ required: true, message: '请选择包裹状态!' }]}
                                >
                                    <Select
                                        options={[
                                            { value: '待取件', label: '待取件' },
                                            { value: '已取件', label: '已取件' },
                                        ]}>
                                    </Select>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        添加
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Drawer>
                    </Space>
                </div >
                <div>
                    <Table
                        rowKey='id'
                        className='m-4'
                        dataSource={data}
                        columns={columns}
                    />

                    <Modal title="修改状态" open={isModalOpen2} footer={null} onCancel={handleCancel2}>
                        <Form
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            onFinish={onFinish2}
                            onFinishFailed={onFinishFailed2}
                            form={form} //表单数据
                        >
                            <Form.Item
                                label="id"
                                name="id"
                            // hidden //不让用户看到，加隐藏
                            >
                                <input />
                            </Form.Item>
                            <Form.Item
                                label="包裹状态"
                                name="state"
                                rules={[{ required: true, message: '请选择包裹状态!' }]}
                            >
                                <Select
                                    options={[
                                        { value: '待取件', label: '待取件' },
                                        { value: '已取件', label: '已取件' },
                                    ]}>
                                </Select>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 15, span: 16 }}>
                                <Space>
                                    <Button type="default" htmlType="submit" >
                                        重置
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        确定
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default PackageList