import { useState } from "react"
export function useTextInput(initialValue = ''){
    let [textValue, setTextValue] = useState(initialValue)
    function handleChange(e){
        setTextValue(e.target.value)
    }
    let inputProps = {
        value: textValue,
        type: 'text',
        onChange: handleChange
    }
    return {
        inputProps
}
}