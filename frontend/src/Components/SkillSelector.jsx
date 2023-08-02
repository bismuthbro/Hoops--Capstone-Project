import {RadioGroup, FormControlLabel, Radio} from "@mui/material";
export default function SkillSelector(props) {
    return(
    <RadioGroup name="skill" value={props.state} onChange={(event)=>props.setState(event.target.value)} row sx={{display:'flex',alignSelf:'center'}}>
    <FormControlLabel value="Beginner" control={<Radio sx={{'&.Mui-checked': {color: 'rgba(255, 104, 3,0.9)'}}} />} label="Beginner" />
    <FormControlLabel value="Intermediate" control={<Radio sx={{'&.Mui-checked': {color: 'rgba(255, 104, 3,0.9)'}}} />} label="Intermediate" />
    <FormControlLabel value="Expert" control={<Radio sx={{'&.Mui-checked': {color: 'rgba(255, 104, 3,0.9)'}}} />} label="Expert" />
    </RadioGroup>
    )
}