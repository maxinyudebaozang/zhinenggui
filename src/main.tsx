import { Suspense } from "react";
import Loading from './Loading/loading';
import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './Layout/Layout.tsx'
import { RouterProvider } from 'react-router-dom'//引入路由
import './index.css'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)
