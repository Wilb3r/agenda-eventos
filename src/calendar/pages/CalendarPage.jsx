import { Calendar } from "react-big-calendar";
import { localizer, getMessagesES } from "../../helpers";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from "date-fns"; //Aqui puedo importar todos los demas 
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { useState } from "react";
import { useUiStore } from "../../hooks";

const events = [{
    title: 'Cumpleanos del Team Leader',
    notes: 'Comprar taza',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Master'
    }
}]

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    
    const [ lastView, setLastView ] = useState(localStorage.getItem('LastView') || 'agenda')

    const eventStylerGetter = ( event, start, end, isSelected ) => {
       // console.log({ event, start, end, isSelected })

       const style = {
        backgroundColor: '#007F73',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
       }
       return {
        style
       }
    }

    const onDoubleClick = (event) => {
        openDateModal();
    }

    const onSelect = (event) => {
        console.log({ click: event })
    }

    const onViewChange = (event) => {
        localStorage.setItem('LastView', event);
        setLastView( event );
    }

    return (
        <>
            <Navbar />

            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStylerGetter }
                components={{
                    event: CalendarEvent
                }}

                //colocar aqui los eventos 
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }

                defaultView={ lastView }
            />
            <CalendarModal />

        </>
    )
}