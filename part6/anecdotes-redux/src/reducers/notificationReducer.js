import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		displayNotification(state, action) {
			const content = action.payload
			return content
		}
	}
})

// must be outside of the setNotification function, oherwise resetting doesn't work
let timer = null

export const setNotification = (content) => {
	return dispatch => {
		clearTimeout(timer)
		dispatch(displayNotification(content))
		timer = setTimeout(() => {
			dispatch(displayNotification(''))
		}, 5000)
	}
}

export const { displayNotification } = notificationSlice.actions
export default notificationSlice.reducer
