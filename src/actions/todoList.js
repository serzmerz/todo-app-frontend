const Types = {
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_CHECKED_TASK: 'UPDATE_CHECKED_TASK',
  UPDATE_TITLE_TASK: 'UPDATE_TITLE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  FILTER_TASK: 'FILTER_TASK'
}

export default Types

export const createTask = payload => ({ type: Types.CREATE_TASK, payload })
export const updateCheckedTask = payload => ({ type: Types.UPDATE_CHECKED_TASK, payload })
export const updateTitleTask = (item, title) => ({ type: Types.UPDATE_TITLE_TASK, payload: {item, title} })
export const deleteTask = id => ({ type: Types.DELETE_TASK, id })
export const filterTask = payload => ({ type: Types.FILTER_TASK, payload })
