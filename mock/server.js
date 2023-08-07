//------------------------------------从npm官方(npmjs.com)搜json-server，在下面例子Simple example中复制的
// server.js

// const jsonServer = require('json-server')复制过来的是cjs风格，会报错
import jsonServer from 'json-server' //自己改成esm风格
import fs from 'node:fs'
import jwt from 'jsonwebtoken'



const secretKey = 'abcdef'
const server = jsonServer.create()
const router = jsonServer.router('./mock/db.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

// 自定义接口开始
//底层就是express，所以可以用express的写法
/* server.get('/test', (req, res) => {// get请求
    console.log(req.query)
    res.send({errcode: 0, msg: 'success', data: {name: 'test'}})
}) */

//登录是产生token的，不需要做拦截
server.post('/login', (req, res) => {// post请求
    // console.log(req.body) //可以拿到数据，就可以做登录功能了 
    /* if (req.body.email === 'admin@qq.com' && req.body.password === 'admin') {
        res.send({ errcode: 0, msg: 'success', data: { name: 'test' } })
    } else {
        res.send({ errcode: -1, msg: 'fail', data: {} })
    } */

    const { users } = JSON.parse(fs.readFileSync('./mock/db.json').toString())//读取文件
    // console.log(users)
    const ret = users.find((item) => item.email === req.body.email && item.password === req.body.password)

    if (ret) {
        jwt.sign({ name: ret.name }, secretKey, function (err, token) {
            res.send({ errcode: 0, msg: 'ok', name: ret.name, role: ret.role, token })
        })
    } else {
        res.send({ errcode: -1, msg: 'error' })
    }
})
// 自定义接口结束

server.use((req, res, next) => {

    const token = req.headers.authorization

    jwt.verify(token, secretKey, function (err, decode) {
        if (err) {
            res.json({
                errcode: -1,
                msg: 'token错误'
            })
        } else {
            next()
        }
    })
})

server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
})
//------------------------------------


