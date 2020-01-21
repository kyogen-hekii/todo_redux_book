import React from 'react';
// import {createStore} from 'redux';
import {render} from 'react-dom';
// import tasksReducer from './reducers/tasks'
import TodoApp from './containers/TodoApp'
import { Provider } from 'react-redux'

import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store/index'

// Store(stateの保持), Reducer(stateの変更,main?), Action(state変更の現象)
// rxc, rxr, rxa

//
// QA
//
// state.tasks.concat([action.task])の[]は何 値1つの配列を作っている
// actionの内部 typeとpayload
// payloadの内部 task※(payload:{task:'task1'})
// createStoreの第一引数は reducer
// createStoreでできるObjのメソッドは DSgetRR(dispatch,subscribe,getState,replaceReducer)
// dispatchの使い方 store.dispatch(actionCreator())_sd(ac)
// reducerのreturn {...state,state.tasks.concat([action.payload.task])}
// stateのtasks state.tasks
// actionのtask action.payload.task
// Reducerとは stateとActionから新しいstateを生成する関数(state名+Reducer)
// Reducerのreduceとは [1,2,3].reduce((f,s)=>f+s)//=>6。この関数をreducerという
// Reduxとは reduceの繰り返しのみでプログラムの実行を行うようにする仕組み(action.typeで別々の関数が走りデータがreduce(変更)される)
// storeの生成 createStore(reducer)
// subscribeとは handle関数をハンドルしておき、dispatchの中で呼ばれる
// createStore((state,action)=>{})これ何 (s,a)はreducer.index.jsにある
// store作るには createStore(reducer)
// middlewareの使い方 createStore(reducer,applyMiddleware(myMiddleware))

// index.jsにざっと実装
// ファイルを分ける
// react-reduxを導入(Provide store, connect)


// 手順
// 1. Reducerを作成rxc,rxr(e.g.ADD_TASKとtasksReducer)
// 2. ActionCreatorを作成(e.g.addTask=task=>({type:ADD_TASK,payload:task}))
// 3. Storeを作成createStore(reducer);store.dispatch(actionCreator);store.subscribe(handler)
// 4. viewで使用する変数をinitialStateに追加し、component追加

// ファイル分割手順
// index.js
// components/
// actions/
// reducers/
// 1. code ./src/types/tasks.js
// 2. code ./src/reducers/tasks.js
//   imp types追加, expdef追加(constからfunctionに変更)
// 3. code ./src/actions/tasks.js
//   imp types追加, exp追加
// 4. code ./src/components/TodoApp.js
//   imp R types追加, expdef追加(Hint:rfc)
// index.js
//   imp Comp reducers追加

// ContainerComponentとPresentationalComponentに分ける
// 1. code ./src/containers/TodoApp.js
// imp conn Comp actions追加 rcreduxでmstp,mdtp,expdef_connを追加
// mstp(state){return{task,tasks}}
// mdtp(dispatch){return{addTask(task){dispatch(addTask(task))}}}
// 2. code ./src/components/TodoApp.js
// TodoApp({task,tasks,inputTask,addTask})として引数=propsで受け取る
// store系の記述は全て削除

// 1.Reducer rxd
// reducerの引数は ステアク
// reducerのactionの構成は タイペイ
// reducerのreturnの仕方 stateとその上書き
// 2.ActionCreator rxa
// 3.Storeの作成=createStore(tasksReducer);
// 3-1.store.subscribe(() => renderApp(store));
// 4.renderの作成
// 5.renderApp(store);

// ざっと作成
// 1.reducer
// → expdefをtasksReducerに変更して、payloadをtasks:state.payload...に書き換える
// 2.action
// → type:ADD_TASKに書き換えて、payload:{task}に書き換える
// 3.store
// → store=creteStore(tasksReducer)
// 3-1.store.subscribe
// → unsubscribe=store.subscribe(()=>renderApp(store))
// 4.render
// → function_renderApp(store){render(<TodoApp_store={store}/>,doc.gEBI('root'))};renderApp(store);
// 5.component
// → function_TodoApp({store}){const{task,tasks}=store.getState();return(<div/>)}
// 6.renderApp(store)

// 1. reducer(rxc)(rxd)
// 2. action(rxa)
// 3. store
// 4. reunder
// 5. component
// 6. renderApp

// 手を動かしてみるとなんとなく書くことはできた。
// でも、覚えておくみたいな要素が多く、本当に今できるのか不安になり、
//　なんとなく身についていない感覚になる。そして嫌になっていく。
// カンペを作っておいて、これを見れば大丈夫みたいにしたいんだけど、
// 実はカンペってうまくまとめないといけないから、結構難しい。
// reducer一つとっても、やることが多くて、リスト化も面倒だし、
// 再現も面倒でしない気がしている。
// 

//-------
// (1)Reducer
//-------
// ./types/tasks.jsに移動
// export const ADD_TASK = 'ADD_TASK'
// export const INPUT_TASK = 'INPUT_TASK'

// ./reducers/tasks.jsに移動
// const initialState = {
//   task: '',
//   tasks: [],
// }
// const tasksReducer = (state = initialState, action) => {
//   switch (action.type) {
//   case ADD_TASK:
//     return {
//       ...state,
//       tasks: state.tasks.concat([action.payload.task]),
//     }
//   case INPUT_TASK:
//     return {
//       ...state,
//       task: action.payload.task
//     }
//   default:
//     return state
//   }
// }

//-------
// (2)Action Creator
//-------
// ./actions/tasks.jsに移動
// ※payloadはFSA(FluxStandardAction)の命名規則に従ったもの
// const addTask = task =>({
//   type: ADD_TASK,
//   payload: {
//     task
//   }
// });
// const inputTask = task =>({
//   type: INPUT_TASK,
//   payload: {
//     task
//   }
// })

//-------
// (3)Store
//-------
// dispatch, subscribe, getState, replaceReducerをもつ
// const store = createStore(tasksReducer);
const store = configureStore();

//-------
// (4)Component
//-------
// function TodoApp({store}){
//   const {task, tasks} = store.getState();
//   return (
//     <div>
//       <input type="text" onChange={e => store.dispatch(inputTask(e.target.value))}/>
//       <input type="button" value="add" onClick={() => store.dispatch(addTask(task))}/>
//       <ul>
//         {
//           tasks.map((item, i)=>{
//             return (
//               <li key={i}>{item}</li>
//             );
//           })
//         }
//       </ul>
//     </div>
//   );
// }

// renderで行えばよくなる
// function renderApp(store){
//   render(
//     <TodoApp store={store}/>,
//     document.getElementById('root')
//   );
// }

// 再描画処理
// store.subscribe(() => renderApp(store));
// renderApp(store);

// render(
//   <Provider store={store}>
//     <TodoApp/>
//   </Provider>,
//   document.getElementById('root')
// );

// import configureStore, { history } from './store/index'
// import { Route, Switch } from 'react-router' // react-router v4/v5
// import { ConnectedRouter } from 'connected-react-router'
console.log(store);
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/" component={TodoApp}/>
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// TypeError: tasks.map is not a function
