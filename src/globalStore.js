import {configureStore, createSlice} from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: 'globalReducers',
    initialState: {id: 1},
    reducers: {
        login: (state, action) => {
            return {
                id: action.payload.id,
                name: action.payload.name,
                auth: action.payload.auth,
            }
        },
        loadAnnouncement: ((state, action) => {
            const announcement = action.payload ? action.payload : []
            return {
                ...state,
                announcementList: announcement,
                important: announcement instanceof Array ? announcement.find(({priority}) => priority) : announcement
            }
        })
    }
})

export const {login, loadAnnouncement} = actions

export default configureStore({reducer})