import myImage from '../../assets/u491.svg'
import myImage1 from '../../assets/u493.svg'
import { useRequest } from 'ahooks'
import {
    Modal, Radio, Table, Tag, Button, Popconfirm, message, Space, Input, Form, Select
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { CheckItem } from '../../types/base'
import { PlusCircleFilled, MinusOutlined } from '@ant-design/icons'
import { addPay } from '../../api/checks'

const RechargeList = () => {
    const { data, error, loading, refresh } = useRequest(addPay)



    const columns: ColumnsType<CheckItem> = [
        {
            title: '交易号',
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
            title: '订单类型',
            dataIndex: 'dingdantype',
            key: 'dingdantype',
        },
        {
            title: '订单号',
            dataIndex: 'dingdanhao',
            key: 'dingdanhao',
        },
        {
            title: '应付金额',
            dataIndex: 'yingfujine',
            key: 'yingfujine',
        },
        {
            title: '支付渠道',
            dataIndex: 'zhifuqudao',
            key: 'zhifuqudao',
        },
        {
            title: '支付币种',
            dataIndex: 'zhifubizhong',
            key: 'zhifubizhong',
        },
        {
            title: '实际支付 CNY',
            dataIndex: 'shijizhifu',
            key: 'shijizhifu',
        },
        {
            title: '汇率',
            dataIndex: 'huilv',
            key: 'huilv',
        },
        {
            title: '创建时间',
            dataIndex: 'chuangjiantime',
            key: 'chuangjiantime',
        },
        {
            title: '完成时间',
            dataIndex: 'wanchengtime',
            key: 'wanchengtime',
        },
        {
            title: '状态',
            dataIndex: 'zhuangtai',
            key: 'zhuangtai',
        }
    ]
    if (error) {
        return <div>{error.message}</div>
    }
    if (loading) {
        return <div>loading...</div>
    }
    return (
        <>
           <div className=" h-12"><h2>充值记录</h2></div>
            <div className=" h-12 flex justify-between" >
                <div className="flex justify-center">
                    <Input type="text" className=" h-6 " placeholder="请输入手机号/ID"
                        // onChange={handleChangeFront}
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
        </>
    )
}

export default RechargeList