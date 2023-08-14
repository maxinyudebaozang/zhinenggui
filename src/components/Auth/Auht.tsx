//做权限的前置守卫
import { message } from "antd"
import { permissionRoutes } from "../../router"
import { useLocation, matchRoutes, Navigate } from "react-router-dom"
import users from '../../stores/users' //引入状态管理相结合

//cnpm i jwt-decode 解密
import jwt_decode from 'jwt-decode' //解密token

import type { UsersInfo } from '../../types/base'

interface AuthProps {
    children: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({ children }) => {
    const location = useLocation()
    const matchs = matchRoutes(permissionRoutes, location)
    // console.log(matchs)
    const roles = matchs && matchs[matchs.length - 1].route.meta?.roles
    // console.log(roles)
    const role = ('role' in users.info && users.info.role) as string
    const token = ('token' in users.info && users.info.token) as string
    const name = ('name' in users.info && users.info.name) as string

    try {
        //对token做校验（前端做的token校验，也可以后端做token校验）
        // 如果校验通过，用户是登录状态
        if ((jwt_decode(token) as UsersInfo).name === name) {
            console.log('token校验成功,有效')
            //登录的用户根据不同的角色，访问不同的页面
            if (roles?.includes(role)) {
                return (
                    <>
                        {children}
                    </>
                )
            } else {
                message.warning('您没有权限!')

                return (
                    <>
                        <h1 className="w-screen text-red-600 text-2xl underline">您没有权限!</h1>
                    </>
                )

            }
        }
    } catch (err) {
        message.warning('token校验失败')

        return (
            <>
                <h1 className="w-screen text-red-600 text-2xl underline">您还没有登录!</h1>
                <Navigate to="/login" />
            </>
        )

    }

    console.log(token, jwt_decode(token))


}

export default Auth