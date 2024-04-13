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
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false
        }
    }

});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;