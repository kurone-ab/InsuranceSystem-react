import {configureStore, createSlice} from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: 'globalReducers',
    initialState: {user: JSON.parse(sessionStorage.getItem('user'))},
    reducers: {
        login: (state, action) => {
            return {
                user: {
                    id: action.payload.id,
                    name: action.payload.name,
                    auth: action.payload.auth,
                }
            }
        },
        logout: () => {
            return {
                user: null
            }
        },
        loadAnnouncement: ((state, action) => {
            const announcement = action.payload ? action.payload : []
            return {
                user: state.user,
                announcement: {
                    list: announcement,
                    important: announcement instanceof Array ? announcement.find(({priority}) => priority) : announcement
                }
            }
        })
    }
})

export const {login, logout, loadAnnouncement} = actions

export default configureStore({reducer})