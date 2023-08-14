import http from "../utils/http";
import type { AnyProps } from "../types/base";

// 登录接口
function login(data: AnyProps) {
    return http.post("/login", data);
}

//admin获取用户列表信息接口
// function usersData() {
//     return http.get("/users").then((res) => res.data);
// }
//更改的异步写法：
async function usersData() {
    const res = await http.get("/users");
    return res.data;
}

// ----------------------------------------------------
//获取包裹信息
async function packagedata() {
    const res = await http.get("/packages");
    return res.data;
}

//添加包裹信息
function addPackage(data: any) {
    return http.post(`/packages`, data); //
}

//更新包裹信息
function updatePackage(id: number, data: any) {
    return http.patch(`/packages/${id}`, data); //这边只需要局部更新就行了，所以用patch
}

//删除包裹信息
function deletePackage(id: number) {
    return http.delete(`/packages/${id}`);
}
// ----------------------------------------------------

//admin删除用户信息的接口
function deleteUser(id: number) { 
    return http.delete(`/users/${id}`);
}

//admin更新用户信息的接口
function updateUser(id: number, data: AnyProps) {
    return http.patch(`/users/${id}`, data); //这边只需要局部更新就行了，所以用patch
}

//admin添加用户信息的接口
function addUser(data: AnyProps) {
    return http.post('/users', data)
}

export {
    login,
    usersData,
    deleteUser,
    updateUser,
    addUser,
    packagedata,
    updatePackage,
    addPackage,
    deletePackage
};
