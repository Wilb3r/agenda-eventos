import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    
    initialState: { 
        isDateModalOpen: false 
    },
    reducers: { 
        //Aqui creamos las acciones
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true
        }, 
        onCloseModalOpen: (state) => {
            state.isDateModalOpen = false
        }
    }

});

export const { onOpenDateModal, onCloseModalOpen } = uiSlice.actions;