import { CREATE_TASK } from '../constants/actions'

const initialState = {
  fetching: false,
  data: [
    {
      title: 'abcdfs',
      checked: false
    },
    {
      title: 'two onesfdsfs',
      checked: false
    }
  ]
}

export default function todoList (state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      console.log('hi')
      return {
        ...state,
        ...{
          data: action.payload
        }
      }
    default:
      return state
  }
}
