import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom' //引入类型注解
import { lazy } from 'react' //路由懒加载
import { WalletTwoTone, HomeTwoTone, CrownTwoTone, DatabaseTwoTone, PropertySafetyTwoTone, AppstoreTwoTone, UnorderedListOutlined } from '@ant-design/icons';


//react不像vue，它没有meta元信息，
//需要自己在声明文件 RouteObject(ctrl+单击查看) 中的 IndexRouteObject接口 和 NonIndexRouteObject接口 中扩展meta信息
declare module 'react-router-dom' {
    interface IndexRouteObject {
        meta?: {
            roles?: string[],
            menu?: {
                label: React.ReactNode,
                icon: React.ReactNode
            }
        }
    }
    interface NonIndexRouteObject {
        meta?: {
            roles?: string[]
            menu?: {
                label: React.ReactNode,
                icon: React.ReactNode
            }
        }
    }
}



//懒加载路由
const LayoutView = lazy(() => import('../Layout/Layout'))
const Login = lazy(() => import('../views/Login/Login'))
const Home = lazy(() => import('../views/Home/Home'))
const RiderList = lazy(() => import('../views/RiderList/RiderList'))
const CheckList = lazy(() => import('../views/CheckList/CheckList'))
const BoxList = lazy(() => import('../views/BoxList/BoxList'))
const PackageList = lazy(() => import('../views/PackageList/PackageList'))
const InfoList = lazy(() => import('../views/InfoList/InfoList'))
const PayList = lazy(() => import('../views/PayList/PayList'))
const RechargeList = lazy(() => import('../views/RechargeList/RechargeList'))
const Athuorityme = lazy(() => import('../views/Athuorityme/Athuorityme'))
const Account = lazy(() => import('../views/Account/Account'))
import Test from '../views/Test';



const routes: RouteObject[] = [
    {//根路径重定向到 /oa/home
        path: '/',
        element: <Navigate to='/home' />
    },
    {//404页面
        path: '*',
        element: <div>404</div>
    }
    ,
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/test',
        element: <Test />
    }

]
//权限路由
export const permissionRoutes: RouteObject[] = [
    {
        path: '/index',
        element: <LayoutView />,
        children: [
            {
                path: 'home',
                element: <Home />,
                meta: {
                    menu: {
                        label: '主页',
                        icon: <UnorderedListOutlined />
                    }
                }
            },


        ],
        meta: {
            menu: {
                label: '首页',
                icon: <HomeTwoTone />
            }
        }
    },
    {
        path: '/vip',
        element: <LayoutView />,
        children: [
            {
                path: 'riderlist',
                element: <RiderList />,
                meta: {
                    menu: {
                        label: '快递员列表',
                        icon: <HomeTwoTone />
                    }
                }
            },
            {
                path: 'checklist',
                element: <CheckList />,
                meta: {
                    menu: {
                        label: '快递员添加',
                        icon: <HomeTwoTone />
                    }
                }
            }
        ],
        meta: {
            menu: {
                label: '会员',
                icon: <CrownTwoTone />
            }
        }
    },
    {
        path: '/box',
        element: <LayoutView />,
        children: [
            {
                path: 'boxlist',
                element: <BoxList />,
                meta: {
                    menu: {
                        label: '柜机列表',
                        icon: <UnorderedListOutlined />
                    }
                }

            }
        ],
        meta: {
            menu: {
                label: '柜机',
                icon: <DatabaseTwoTone />
            }
        }

    },
    {
        path: '/package',
        element: <LayoutView />,
        children: [
            {
                path: 'lsit',
                element: <PackageList />,
                meta: {
                    menu: {
                        label: '存取件管理',
                        icon: <UnorderedListOutlined />
                    }
                }
            }
        ],
        meta: {
            menu: {
                label: '包裹',
                icon: <WalletTwoTone />
            }
        }
    },
    {
        path: '/money',
        element: <LayoutView />,
        children: [
            {
                path: 'infolist',
                element: <InfoList />,
                meta: {
                    menu: {
                        label: '账户信息',
                        icon: <UnorderedListOutlined />
                    }
                }
            },
            {
                path: 'paylist',
                element: <PayList />,
                meta: {
                    menu: {
                        label: '充值信息',
                        icon: <UnorderedListOutlined />
                    }
                }
            },
            {
                path: 'rechargelist',
                element: <RechargeList />,
                meta: {
                    menu: {
                        label: '支付记录',
                        icon: <UnorderedListOutlined />
                    }
                }
            },
        ],
        meta: {
            menu: {
                label: '财务',
                icon: <PropertySafetyTwoTone />
            }
        }
    },
    {
        path: '/other',
        element: <LayoutView />,
        children: [
            {
                path: 'athuority',
                element: <Athuorityme />,
                meta: {
                    menu: {
                        label: '权限管理',
                        icon: <UnorderedListOutlined />
                    }
                }
            },
            {
                path: 'account',
                element: <Account />,
                meta: {
                    menu: {
                        label: '账户设置',
                        icon: <UnorderedListOutlined />
                    }
                }
            }
        ],
        meta: {
            menu: {
                label: '其他',
                icon: <AppstoreTwoTone />
            }
        }
    },
]


const router = createBrowserRouter([...routes, ...permissionRoutes])

export default router