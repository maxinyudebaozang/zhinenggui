/* import { useState } from "react"

// 默认情况下：如果修改的数据没有发生变化，函数组件并不会重新执行，保证性能
  // react程序内部可能会做一次自检，这次自检并不会影响到JSX

function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(1)
  }
  console.log(123)
  return (
    <>
      <button onClick={handleClick}>点击</button>
      { count }, { Math.random() }
    </>
  )
}

export default App */


// import { useState } from "react"

// function App() {
//   //const [count, setCount] = useState(0)
//   const [list, setList] = useState([
//     {id: 1, text: 'aaa'},
//     {id: 2, text: 'bbb'},
//     {id: 3, text: 'ccc'}
//   ])
//   const handleClick = () => {
//     //count++;  // ✖
//     // list.push({id: 4, text: 'dddd'})  // 直接修改了list  ✖
//     // setList(list)
//     setList([...list, {id: 4, text: 'dddd'}])   // ✔
//   }
//   return (
//     <>
//       <button onClick={handleClick}>点击</button>
//       <ul>
//         { list.map((item) => <li key={item.id}>{item.text}</li>) }
//       </ul>
//     </>
//   )
// }

// export default App



function Test() {

  // 高阶处理
  const handleClick = (num: number) => {
    return (e:any) => {
      console.log(num, e)
    }
  }
  // 箭头函数 (推荐使用)
  const handleClick2 = (e: any, num: number) => {
    console.log(num, e)
  }
  const handleClick3 = () => {
    console.log('123123')
  }
  return (
    <div>
      <h2>react操作事件</h2>
      <button onClick={handleClick(123)}>点击</button>
      <button onClick={(e) => handleClick2(e, 123)}>点击2</button>
      {/* <button onClick={handleClick()}>点击3</button> */}
      <button onClick={handleClick3}>点击4</button>
    </div>
  )
}

export default Test