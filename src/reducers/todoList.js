import Types from '../actions/todoList'

const initialState = {
  fetching: false,
  count: 2,
  filter: {
    index: 0,
    flag: [true, false]
  },
  data: [
    {
      id: 1,
      title: 'abcdfs',
      checked: false
    },
    {
      id: 2,
      title: 'two onesfdsfs',
      checked: false
    }
  ]
}

const updateObjectInArray = (array, replaceItem) => (
  array.map(item => (
    item.id !== replaceItem.id
    ? item
    : replaceItem
    )
  )
)

const updateCheckedItem = (array, item) => updateObjectInArray(array, {...item, checked: !item.checked})

const updateTitleItem = (array, item, title) => updateObjectInArray(array, {...item, title})

const removeItem = (array, id) => array.filter(item => item.id !== id)

export default function todoList(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_TASK:
      return {
        ...state,
        ...{
          count: state.count + 1,
          data: [...state.data, {id: state.count + 1, ...action.payload}]
        }
      }
    case Types.UPDATE_CHECKED_TASK:
      return {
        ...state,
        ...{
          data: updateCheckedItem(state.data, action.payload)
        }
      }
    case Types.UPDATE_TITLE_TASK:
      return {
        ...state,
        ...{
          data: updateTitleItem(state.data, action.payload.item, action.payload.title)
        }
      }
    case Types.FILTER_TASK:
      return {
        ...state,
        ...{
          filter: action.payload
        }
      }
    case Types.DELETE_TASK:
      return {
        ...state,
        ...{
          data: removeItem(state.data, action.id)
        }
      }
    default:
      return state
  }
}
