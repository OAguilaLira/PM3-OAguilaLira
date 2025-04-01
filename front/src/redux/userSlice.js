import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:{},
    login: false,
    userAppointment:[]
}

const userSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        login: (state, action) => {
            state.login = action.payload.login
            state.user = action.payload.user
        },
        // eslint-disable-next-line no-unused-vars
        logout: (state, action) => {
            state.login = false
            state.user = {}
            state.userAppointment = []
        },
        establecerAppointments: (state, action) => {
            state.userAppointment = action.payload
        },
        saludar: () => {
            console.log('hola')
        },
        modificarStatusAppointment: (state, action) => {
            
            state.userAppointment.find(cita => cita.id === action.payload).status = 'canceled'
            
        }
    }
})

export const {login, logout, establecerAppointments, modificarStatusAppointment} = userSlice.actions;
export default userSlice.reducer