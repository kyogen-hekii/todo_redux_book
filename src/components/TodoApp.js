// rfc
// actionsをimp, expdef追加
import React from 'react'
// import {inputTask, addTask} from '../actions/tasks'

// storeを受け取るのではなく、propsとして全てを受け取る
// functional componentの場合,引数=props
// 以下のようなmstp,mdtpをconnectしている
// mstp
// return {task: state.task,tasks: state.tasks};
// mdtp
// return {addTask(task){dispatch(addTask(task));},inputTask(task){dispatch(inputTask(task));}}
// これにより,dispatch等はpresentational component側では不要になる
// <input type="text" onChange={e => store.dispatch(inputTask(e.target.value))}/>
// <input type="button" value="add" onClick={() => store.dispatch(addTask(task))}/>
// connectによって、storeとcomponentを結びつけているからこのように分離できる

//export default function TodoApp({store}){
export default function TodoApp({task,tasks,inputTask,addTask}){
  // const {task, tasks} = store.getState();
  //今はこれじゃないと呼び出せない
  //console.log(tasks.tasks);
  console.log('task:'+task)
  console.log('tasks:'+tasks)
  console.log('inputTask:'+inputTask)
  return (
    <div>a</div>
  );
  return (
    <div>
      <input type="text" onChange={e => inputTask(e.target.value)}/>
      <input type="button" value="add" onClick={() => addTask(task)}/>
      <ul>
        {
          tasks.map((item, i)=>{
            return (
              <li key={i}>{item}</li>
            );
          })
        }
      </ul>
    </div>
  );
}
