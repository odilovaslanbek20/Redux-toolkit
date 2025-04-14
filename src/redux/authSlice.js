import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: { 
		login: (state, action) => {
			const { user, token } = action.payload
			state.user = user
			state.token = token
			state.isAuthenticated = true
		},
		logout: (state) => {
			state.user = null
			state.token = null
			state.isAuthenticated = false
		},
	},
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer
