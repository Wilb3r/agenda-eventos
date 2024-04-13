import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
        _id: new Date().getTime(),
        title: 'Cumpleanos del Team Leader2',
        notes: 'Comprar taza',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'Master'
        }
    };


export const calendarSlice = createSlice({
    name: 'calendar',

    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },

    reducers: {
        //Aqui creamos las acciones
        onSetActiveEvent: (state, { payload }) => {
                state.activeEvent = payload;
            },
        },
    });

export const { onSetActiveEvent } = calendarSlice.actions;