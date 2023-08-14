import React from 'react';
import { Suspense } from "react";
import { Layout, FloatButton } from "antd";
import { Outlet, Link } from "react-router-dom";
import {  Avatar, Dropdown, Menu, Breadcrumb } from 'antd';
import { useNavigate,  useLocation } from "react-router-dom";
import Loading from '../Loading/loading';
import type { MenuProps } from 'antd';
// import { WalletTwoTone, HomeTwoTone, CrownTwoTone, DatabaseTwoTone, PropertySafetyTwoTone, AppstoreTwoTone, UnorderedListOutlined } from '@ant-design/icons';
import { permissionRoutes } from "../router";
import { FileTextOutlined } from '@ant-design/icons';
import users from '../stores/users';
import { DownOutlined, } from '@ant-design/icons';


type MenuItem = Required<MenuProps>['items'][number];




const { Header, Sider, Content } = Layout;
// 公共的头和侧边栏

const LayoutView = () => {
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.pathname)
    //退出登录，需要清空token和状态管理
    const handleLogout = () => {
        users.clearInfo()
        navigate('/login')
    }
    const name = ('name' in users.info && users.info.name) as string


    const siderStyle: React.CSSProperties = {
        backgroundColor: '#fff',
    };


    const menuItems: MenuItem[] = []

    //     {
    //         label: '首页',
    //         key: '1',
    //         icon: <HomeTwoTone />,
    //         children: [
    //             {
    //                 label: '主页',
    //                 key: '主页',
    //                 icon: <UnorderedListOutlined />,
    //             }
    //         ]
    //     },
    //     {
    //         label: '会员',
    //         key: '2',
    //         icon: <CrownTwoTone />,
    //         children: [
    //             {
    //                 label: '快递员列表',
    //                 key: '快递员列表',
    //                 icon: <UnorderedListOutlined />,
    //             },
    //             {
    //                 label: '快递员添加',
    //                 key: '快递员添加',
    //                 icon: <UnorderedListOutlined />,
    //             }
    //         ]
    //     },
    //     {
    //         label: '柜机',
    //         key: '3',
    //         icon: <DatabaseTwoTone />,
    //         children: [
    //             {
    //                 label: '柜机列表',
    //                 key: '柜机列表',
    //                 icon: <UnorderedListOutlined />,
    //             }
    //         ]
    //     },
    //     {
    //         label: '包裹',
    //         key: '4',
    //         icon: <WalletTwoTone />,
    //         children: [
    //             {
    //                 label: '存取件管理',
    //                 key: '存取件管理',
    //                 icon: <UnorderedListOutlined />,
    //             }
    //         ]
    //     },
    //     {
    //         label: '财务',
    //         key: '5',
    //         icon: < PropertySafetyTwoTone />,
    //         children: [
    //             {
    //                 label: '账户信息',
    //                 key: '账户信息',
    //                 icon: <UnorderedListOutlined />,
    //             },
    //             {
    //                 label: '充值记录',
    //                 key: '充值记录',
    //                 icon: <UnorderedListOutlined />,
    //             },
    //             {
    //                 label: '支付记录',
    //                 key: '支付记录',
    //                 icon: <UnorderedListOutlined />,
    //             },
    //         ]
    //     },
    //     {
    //         label: '其他',
    //         key: '6',
    //         icon: <AppstoreTwoTone />,
    //         children: [
    //             {
    //                 label: '权限管理',
    //                 key: '权限管理',
    //                 icon: <UnorderedListOutlined />,
    //             },
    //             {
    //                 label: '账号设置',
    //                 key: '账号设置',
    //                 icon: <UnorderedListOutlined />,
    //             }
    //         ]
    //     }
    // ]
    permissionRoutes.forEach((item) => {
        if (item.meta?.menu) {
            const formatItem: MenuItem = {
                key: item.path!,
                label: item.meta.menu.label,
                icon: item.meta.menu.icon,
                children: []
            }
            if (item.children) {
                item.children.forEach((child) => {
                    if (child.meta?.menu) {
                        formatItem.children.push({
                            key: child.path!,
                            label:
                                <Link to={item.path + '/' + child.path}>
                                    {child.meta.menu.label}
                                </Link>,
                            icon: child.meta.menu.icon,
                        })
                    }
                })
            }
            menuItems.push(formatItem)
        }
    }
    )

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer"   >
                    个人中心
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a rel="noopener noreferrer" onClick={handleLogout}>
                    退出登录
                </a>
            )
        }
    ]

    const ret = location.pathname.match(/^(\/[a-z]+)\/([a-z]+)/)
    const openKeys = ret ? ret[1] : ''
    const selectedKeys = ret ? ret[2] : ''
    // console.log(location)
    const breadItems: { title: React.ReactNode }[] = []
    permissionRoutes.forEach((item) => {
        if (item.path === openKeys) {
            breadItems.push({
                title: item.meta?.menu?.label
            })
            if (item.children) {
                item.children.forEach((child) => {
                    if (child.path === selectedKeys) {
                        breadItems.push({
                            title: child.meta?.menu?.label
                        })
                    }
                })
            }
        }
    })
    return (
        <Layout>
            <Header className="bg-slate-200 flex justify-between items-center space-x-3 ">
                <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
                    {name.slice(0, 5).toUpperCase()}
                </Avatar>
                <Dropdown menu={{ items }} placement="bottom" arrow>
                    <span className="cursor-pointer">
                        {name}
                        <DownOutlined />
                    </span>
                </Dropdown>
            </Header>
            <Layout>
                <Sider className="h-screen" style={siderStyle} >
                    <Menu
                        // defaultSelectedKeys={['1']} //默认选中的菜单
                        // defaultOpenKeys={['1']} //默认展开的菜单
                        mode="inline"
                        theme="light"
                        items={menuItems}
                    />

                </Sider>
                <Content className="bg-zinc-50">
                    <Breadcrumb className="p-4" items={breadItems} />
                    <div className="bg-white h-full p-4">
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </Content>
            </Layout>
            <FloatButton
                icon={<FileTextOutlined />}
                description="我是使用说明书"
                // shape="square"
                style={{ right: 44, width: 80, height: 80 }}
            // onClick={zhankai}
               // trigger={onclick}
            />
        </Layout>

    )
}

export default LayoutView