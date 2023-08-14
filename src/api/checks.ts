import http from "../utils/http"
import type { AnyProps } from '../types/base'

//infoList
async function addCheck(){
  const res = await http.get('/checks',
  )
  return res.data
}

function updateCheck(id: number, data: AnyProps) {
  return http.patch(`/checks/${id}`, data)
}

function addUser(data: AnyProps) {
  return http.post('/checks', data)
}

function deleteUser(id:any){
  return http.delete(`/checks/${id}`)
}

//PayList
async function addPay(){
  const res = await http.get('/pays',
  )
  return res.data
}

async function addrecharge(){
  const res = await http.get('/Recharges',
  )
  return res.data
}




export {
  addCheck,
  updateCheck,
  addUser,
  deleteUser,
  addPay,
  addrecharge
}