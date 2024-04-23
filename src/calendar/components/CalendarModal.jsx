import Modal from 'react-modal';
import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Datepicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale( 'es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root'); //Ayuda a que se pueda sobreponer ante todo


  export const CalendarModal = () => {

    //Estado desde customHook
    const { isDateModalOpen, closeDateModal } = useUiStore();

    //Extraer la funcion que inicia el proceso de grabacion
    const { activeEvent, startSavingEvent } = useCalendarStore();

    //Nuevo estado para cuando se ingrese el evento
    const [ formSubmitted, setFormSubmitted] = useState(false);

    const [ formValues, setFormValues ] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours ( new Date(), 2)
     });

     //utilizamos el useMemo
     const titleClass = useMemo(() => {
        if( !formSubmitted ) return '';

        return (formValues.title.length > 0)
        ? 'is-valid'
        : 'is-invalid'

     }, [ formValues.title, formSubmitted ])

     useEffect ( () => {
      if ( activeEvent !== null ){
        setFormValues({ ...activeEvent })
      }
     }, [ activeEvent ] );

     const onInputChanged = ({ target }) => {
      setFormValues({
        ...formValues,
        [ target.name ]: target.value
      })
     }

     const onDateChanged = ( event, changing ) => {
      setFormValues({
        ...formValues,
        [ changing ]: event
      })
     }


     const onCloseModal = () => {
      console.log('Cerrando el modal...');
      closeDateModal();
     }

    const onSubmit = async(event) => {
      event.preventDefault();
      setFormSubmitted(true);

    const difference = differenceInSeconds( formValues.end, formValues.start );
    console.log({ difference });

    if (isNaN( difference ) || difference <= 0 ){
     Swal.fire('Fechas Incorrects', 'Por favor revisa las fechas ingresadas', 'error');
          return;
       }

      if (formValues.title.length <=0 ){
          console.log('Es necesario indicar un titulo al evento')
          return;
        }
      if (formValues.notes.length <=0 ){
          console.log('Es necesario indicar una nota al evento')
          return;
        }
        console.log(formValues);
        
        await startSavingEvent( formValues );

        closeDateModal();

        setFormSubmitted(false);
      }
     
    return (
        <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}

        className='modal' //Asi se llama la clase en css
        overlayClassName='modal-fondo' //clase de css
        closeTimeoutMS={ 200 }
      >
       <h2>Nuevo Evento</h2>
       <hr />
       <form className='container' onSubmit={ onSubmit }>

        <div className='form-group mb-2'>
          <label>Fecha y hora de inicio  </label>
          <Datepicker
            selected={ formValues.start } //Fecha de inicio
            className='form-control' //clase de bootstrap
            onChange={ (event) => onDateChanged(event, 'start')}
            dateFormat='Pp' 
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora de fin  </label>
          <Datepicker
            minDate={ formValues.start }
            selected={ formValues.end } //Fecha de inicio
            className='form-control' //clase de bootstrap
            onChange={ (event) => onDateChanged(event, 'end')}
            dateFormat='Pp'
            showTimeSelect 
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input 
          type='text'
          className={` form-control ${ titleClass }`} 
          placeholder='Titulo del Evento'
          autoComplete='off'
          name='title'
          

          value={ formValues.title }
          onChange={ onInputChanged }
          />
          <small className='form-text text-muted'> Una decripción corta </small>
        </div>

        <div className='form-group mb-2'>
          <textarea 
          type='text'
          className='form-control' 
          placeholder='Notas'
          rows='5'
          name='notes'

          value={ formValues.notes }
          onChange={ onInputChanged }
          >
            
          </textarea>
          <small className='form-text text-muted'> Una decripcion corta </small>
        </div>
        
        <button 
          type='submit'
          className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          &nbsp;
          <span>Save</span>
        </button>
       </form>

      </Modal>
    )
  }