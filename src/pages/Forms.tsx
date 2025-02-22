import { FormDefinition } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import FormInspector from '../utility-controls/FormInspector'

import './Forms.scss'

interface TestFormShape {
	stringProperty: string
	numberProperty: number
	selectStringProperty: string
	selectNumberProperty: number
	radioStringProperty: string
	radioNumberProperty: number

	checkboxProperty: boolean
	dateProperty: Date

	longStringProperty: string
	phoneNumber: number
	postalCode: string
	email: string
	currency: number

	filesProperty: Array<File>
}

const testFormDefinition: FormDefinition<TestFormShape> = {
	fields: {
		selectStringProperty: {
			selectOptions: [
				{ value: 'First', text: 'First Option' },
				{ value: 'Second', text: 'Second Option' },
			]
		},
		selectNumberProperty: {
			selectOptions: [
				{ value: 1, text: 'First Option' },
				{ value: 2, text: 'Second Option' },
			]
		},
		radioStringProperty: {
			selectOptions: [
				{ value: 'First', text: 'First Option' },
				{ value: 'Second', text: 'Second Option' },
			]
		},
		radioNumberProperty: {
			selectOptions: [
				{ value: 1, text: 'First Option' },
				{ value: 2, text: 'Second Option' },
			]
		}, 
		filesProperty: {
			label: 'File Input Name is now configurable'
		}
	}, 
}

export function Forms() {
	const rf = useReactForms(testFormDefinition)
	const { ElementBuilder: RF } = rf

	return (

		<FormInspector formBuilder={rf}>

			<div className='forms page'>
				<h1>Form Tests</h1>

				<div className='control-grid'>

					<div className='control-row'>
						<div className='control-cell'>
							{rf.textInput('stringProperty', { title: 'String Function' })}
						</div>
						<div className='control-cell'>
							{rf.numberInput('numberProperty', { title: 'Number Function' })}
						</div>
						<div className='control-cell'>
							{rf.dateInput('dateProperty', { title: 'Date Function' })}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.TextInput field='stringProperty' title='String Element' />
						</div>
						<div className='control-cell'>
							<RF.NumberInput field='numberProperty' title='Number Element' />
						</div>
						<div className='control-cell'>
							<RF.DateInput field='dateProperty' title='Date Element' />
						</div>
					</div>


					<div className='control-row'>
						<div className='control-cell'>
							{rf.textSelect('selectStringProperty', { title: 'Text Select Function' })}
						</div>
						<div className='control-cell'>
							{rf.numberSelect('selectNumberProperty', { title: 'Number Select Function' })}
						</div>
						<div className='control-cell'>
							{rf.checkbox('checkboxProperty', { title: 'Checkbox Function' })}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.TextSelect field='selectStringProperty' title='Text Select Element' />
						</div>
						<div className='control-cell'>
							<RF.NumberSelect field='selectNumberProperty' title='Number Select Element' />
						</div>
						<div className='control-cell'>
							<RF.CheckBox field='checkboxProperty' title='Checkbox Element' />
						</div>
					</div>


					<div className='control-row'>
						<div className='control-cell'>
							{rf.textRadio('radioStringProperty', { title: 'Text Radio Function' })}
						</div>
						<div className='control-cell'>
							{rf.numberRadio('radioNumberProperty', { title: 'Number Radio Function' })}
						</div>
						<div className='control-cell'>
							{rf.textArea('longStringProperty', { title: 'Text Area Function', rows: 3 })}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.TextRadio field='radioStringProperty' title='Text Radio Element' />
						</div>
						<div className='control-cell'>
							<RF.NumberRadio field='radioNumberProperty' title='Number Radio Element' />
						</div>
						<div className='control-cell'>
							<RF.TextArea field='longStringProperty' title='Text Area Element' rows={5} />
						</div>
					</div>


					<div className='control-row'>
						<div className='control-cell'>
							{rf.phoneNumber('phoneNumber', { title: 'Phone Function' })}
						</div>
						<div className='control-cell'>
							{rf.postalCode('postalCode', { title: 'Postal Code Function' })}
						</div>
						<div className='control-cell'>
							{rf.emailAddress('email', { title: 'Email Function' })}
						</div>
						<div className='control-cell'>
							{rf.currency('currency', { title: 'Currency Function' })}
						</div>
						<div className='control-cell'>
							{rf.readonlyField('Calculated', `number + phone = ${(rf.formData.numberProperty || 0) + (rf.formData.phoneNumber || 0)}`)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.PhoneNumber field='phoneNumber' title='Phone Element' />
						</div>
						<div className='control-cell'>
							<RF.PostalCode field='postalCode' title='Postal Code Element' />
						</div>
						<div className='control-cell'>
							<RF.EmailAddress field='email' title='Email Element' />
						</div>
						<div className='control-cell'>
							<RF.Currency field='currency' title='Currency Element' />
							Note, cents input not yet working with form builder (but is when using control itself).  <br/>TODO: investigate
						</div>
						<div className='control-cell'>
							Calculated field not yet implemented with element builder.  May require redesign
						</div>
					</div>


					<div>
						{rf.files('filesProperty')}
					</div>
					<div>
						<RF.Files field='filesProperty' />
					</div>

				</div>
			</div>

		</FormInspector>
	)
}

export default Forms

