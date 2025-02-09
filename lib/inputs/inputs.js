var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import classNames from 'classnames';
export function getInputEnvelopeClass(props) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var hidden = props.hidden, disabled = props.disabled, className = props.className;
    return classNames.apply(void 0, __spreadArray(__spreadArray([className], args, false), [{ 'has-errors': props.hasError || (typeof props.errorMessage === 'string') }, { hidden: hidden, disabled: disabled }], false));
}
