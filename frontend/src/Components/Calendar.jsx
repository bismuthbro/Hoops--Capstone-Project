import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './index.css'

export default function Calendar(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateCalendar value={props.value} onChange={(newValue) => props.setValue(newValue)}/>
    </LocalizationProvider>
  );
}