import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent ( calendarEvent ));
    }

    const startSavingEvent = async( calendarEvent ) => {
        //Idealmente todos los procesos deberian llegar aqui desde el backend
        if ( calendarEvent._id ) {
            //Estamos haciendo una modificacion a la nota
            dispatch( onUpdateEvent({ ...calendarEvent }))
        }
        else{
            //Creando nueva nota
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
        
    }
}