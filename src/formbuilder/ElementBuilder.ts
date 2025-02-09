import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"
import FormBuilder, { FieldNameProps } from "./FormBuilder"

export class ElementBuilder<FormT, LanguageT extends string | undefined = undefined> {
	constructor(private formBuilder: FormBuilder<FormT, LanguageT>) { }

	public TextInput = (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.textInput(props.field, props)
	public TextArea = (props: FieldNameProps<FormT, string> & TextareaHTMLAttributes<any>) => this.formBuilder.textArea(props.field, props)
	public NumberInput = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.numberInput(props.field, props)
	public DateInput = (props:FieldNameProps<FormT, Date> & InputHTMLAttributes<any>) => this.formBuilder.dateInput(props.field, props)
	// Note: Localized Date Input does not support standard controlProps like the other inputs do (at this time)
	public LocalizedDateInput = (props:FieldNameProps<FormT, Date>) => this.formBuilder.localizedDateInput(props.field)
	public PostalCode = (props:FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.postalCode(props.field, props)
	public PhoneNumber = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.phoneNumber(props.field, props)
	public EmailAddress = (props:FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.emailAddress(props.field, props)
	public Currency = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.currency(props.field, props)
	public TextSelect = (props:FieldNameProps<FormT, string> & SelectHTMLAttributes<any>) => this.formBuilder.textSelect(props.field, props)
	public NumberSelect = (props:FieldNameProps<FormT, number> & SelectHTMLAttributes<any>) => this.formBuilder.numberSelect(props.field, props)
	public TextRadio = (props:FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.textRadio(props.field, props)
	public NumberRadio = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.numberRadio(props.field, props)
	public CheckBox = (props:FieldNameProps<FormT, boolean> & InputHTMLAttributes<any>) => this.formBuilder.checkbox(props.field, props)
	// Note: File Input does not support standard controlProps like the other inputs do (at this time)
	public Files = (props:FieldNameProps<FormT, Array<File>>) => this.formBuilder.files(props.field)
}