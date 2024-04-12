import { useSelector, useDispatch } from 'react-redux';
import { onCloseModalOpen, onOpenDateModal } from '../store';

export const useUiStore = () => {
    
    const { 
        isDateModalOpen 
    } = useSelector( state => state.ui );

    const dispatch = useDispatch();

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseModalOpen() );
    }

    return {
        // * Propiedades
        isDateModalOpen,

        // * Metodos
        openDateModal,
        closeDateModal
    }
}