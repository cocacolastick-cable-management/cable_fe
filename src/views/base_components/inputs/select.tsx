import {FormControl, InputLabel, Select as MuiSelect, SelectChangeEvent, FormHelperText} from "@mui/material"
import {ReactNode} from "react"
import * as React from "react";

type SelectProps = {
   label?: string
   value?: any
   onChange?: (event: SelectChangeEvent) => void
   onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
   required?: boolean
   renderOptions?: () => ReactNode
   helperText?: ReactNode
   name?: string
   id?: string
   error?: boolean
   fullWidth?: boolean
   className?: string
   margin?: "normal" | "dense" | "none"
}

type SelectOptionType = {
   id: any,
   value: any
}

function Select(props: SelectProps)
{
   return (
      <FormControl margin={props.margin} className={props.className} fullWidth={props.fullWidth} error={props.error}>
         <InputLabel required={props.required}>{props.label}</InputLabel>
         <MuiSelect
            fullWidth={props.fullWidth}
            name={props.name}
            id={props.id}
            value={props.value ?? ""}
            label={props.label}
            onChange={props.onChange}
            onBlur={props.onBlur}
         >
            {props.renderOptions && props.renderOptions()}
         </MuiSelect>
         <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
   );
}

export default Select

export {type SelectOptionType}