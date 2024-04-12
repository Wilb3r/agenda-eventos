import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns"; //Aqui puedo importar todos los demas 
import esES from 'date-fns/locale/es';

const locales = {
    es: esES,
  }
  
 export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })