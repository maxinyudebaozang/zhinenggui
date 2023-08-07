import { makeAutoObservable } from 'mobx';  //监控，可观察
import { makePersistable } from "mobx-persist-store" //本次存储持久化
import { UsersInfo } from '../types/base';


class Users {
    constructor() {
        makeAutoObservable(this)

        makePersistable(this, {
            name: 'mobx:users', //本地存储的key，随意写
            properties: ['info'], //本地存储的哪个属性
            storage: window.localStorage
        })
    }
    info = {

    }
    updataInfo = (payload: UsersInfo) => {
        this.info = payload
    }

    //清空用户信息
    clearInfo = () => {
        this.info = {}
    }
}

const users = new Users();

export default users;