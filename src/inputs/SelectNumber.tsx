import React, { ChangeEventHandler } from 'react'
// import classNames from 'classnames'

import { getInputEnvelopeClass, InputProps, SelectOption } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface SelectNumberProps extends InputProps<number | null> {
	placeholder?: string
	selectOptions: Array<SelectOption<number>>
 }

export function SelectNumber(props: SelectNumberProps) {
	const handleChange: ChangeEventHandler<HTMLSelectElement> = 
		(e) => {
			const numVal = Number(e.target.value)
			if (isNaN(numVal)) props.onChange(null)
			else props.onChange(numVal)
		}

	// const className = classNames('select', 'input', { 'has-errors': !!props.errorMessage })
	const className = getInputEnvelopeClass(props, 'select', 'input')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled, required } = props

	const options = props.selectOptions.map((option, optionIndex) => {
		return (
			<option key={optionIndex} value={option.value}>{option.text}</option>
		)
	})

	if (props.placeholder) {
		options.unshift(<option key=''>{props.placeholder}</option>)
	}

	return (
		<div className={className}>
			<InputLabel {...props} />
			<select value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required }} >
				{options}
			</select>
			<ErrorMessage {...props} />
		</div>
	)
}

export default SelectNumber