/// <reference types="react" />
import { InputProps, ReadonlyProps } from './inputs';
import './Inputs.scss';
export interface ReadonlyFieldProps extends Omit<InputProps<string, any>, 'onChange'> {
}
export declare function ReadonlyField(props: ReadonlyProps<string>): JSX.Element;
export default ReadonlyField;
