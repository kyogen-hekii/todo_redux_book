import {ADD_TASK, INPUT_TASK} from '../types/tasks'

export const addTask = task =>({
  type: ADD_TASK,
  payload: {
    task
  }
});
export const inputTask = task =>({
  type: INPUT_TASK,
  payload: {
    task
  }
})
