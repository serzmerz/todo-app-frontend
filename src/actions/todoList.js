import { CREATE_TASK } from '../constants/actions'

export const createTask = (payload) => dispatch => {
  dispatch({type: CREATE_TASK, payload})
};

