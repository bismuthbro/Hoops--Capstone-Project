import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers';

export default function HourPicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker label="Time" value={props.value} onChange={props.setValue} sx={{width: '7vw',display:'flex',alignSelf:'center', marginTop:'2vh'}} />
    </LocalizationProvider>
  );
}