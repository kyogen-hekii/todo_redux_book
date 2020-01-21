import {ADD_TASK, INPUT_TASK} from '../types/tasks'

const initialState = {
  task: '',
  tasks: [],
}
// expdef追加(constからfunctionに変更)
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_TASK:
    return {
      ...state,
      tasks: state.tasks.concat([action.payload.task]),
    }
  case INPUT_TASK:
    return {
      ...state,
      task: action.payload.task
    }
  default:
    return state
  }
}
