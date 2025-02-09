import React from 'react'
import classNames from 'classnames'

import './InputLabel.scss'
import { ReadonlyProps } from './inputs'

export function InputLabel(props: ReadonlyProps<any>) {
	const { id, label, required } = props

	const className = classNames('input-label', { required: required && !!label })

	// a label explicitly set to false means we don't want to reserve space for it when empty (which is the default to avoid jitter)
	// useful for tabular forms with labels as column headers
	const labelText = label === false ? null : label 

	return (
		<label className={className} htmlFor={id}>{labelText}</label>
	)
}

export default InputLabel
