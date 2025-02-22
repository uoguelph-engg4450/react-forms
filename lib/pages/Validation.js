var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useReactForms from '../hooks/useReactForms';
import FormInspector from '../utility-controls/FormInspector';
import './Validation.scss';
// this form definition is validated only after the validate button is pressed
var deferredDefinition = {
    fields: {
        reqString: { label: 'Required String', isRequired: true },
        reqDate: { label: 'Required Date', isRequired: true },
        minString: { label: 'Min String (2)', validators: { min: 2 } },
        maxString: { label: 'Max String (5)', validators: { max: 5 } },
        allString: { label: 'Required Min 2 Max 5', isRequired: true, validators: { min: 2, max: 5 } },
        customString: {
            // TODO: figure out why adding a date field above makes fieldValue ambiguous as to whether it's a string or date
            label: 'Must be of length 10 and contain "sheep"', validators: function (_a) {
                var formData = _a.formData /*, fieldValue */;
                var errors = [];
                var fieldValue = formData.customString;
                if (fieldValue && fieldValue.length < 10)
                    errors.push("Must be of at least length 10");
                if (fieldValue && !(fieldValue.indexOf('sheep') >= 0))
                    errors.push("Must contain 'sheep'");
                return errors;
            }
        },
        multiFnString: {
            // TODO: figure out why adding a date field above makes fieldValue ambiguous as to whether it's a string or date
            label: 'Must be of length 7 and contain "ducks"', validators: [
                function (_a) {
                    var formData = _a.formData /*,  fieldValue */;
                    var fieldValue = formData.customString;
                    return (!fieldValue || fieldValue.length >= 7) ? [] : ["Must be of at least length 7"];
                },
                function (_a) {
                    var formData = _a.formData /*,  fieldValue */;
                    var fieldValue = formData.customString;
                    return (!fieldValue || fieldValue.indexOf('ducks') >= 0) ? [] : ["Must contain 'ducks'"];
                },
            ]
        },
    }
};
// this form definition validated as soon as the user begins typing into an input 
var immediateFieldDefinitions = Object.entries(deferredDefinition.fields).reduce(function (formDef, _a) {
    /*
    let typedKey = key as keyof FormData<ValidationShape>
    formDef[typedKey] = Object.assign({}, fieldDef)
    formDef[typedKey]!.validateImmediately = true
    */
    var key = _a[0], fieldDef = _a[1];
    // TODO: find out why adding a date to the form data def causes this typing issue
    formDef[key] = Object.assign({}, fieldDef);
    formDef[key].validateImmediately = true;
    return formDef;
}, {});
var immediateDefinition = {
    fields: immediateFieldDefinitions,
};
var forcedDefinition = {
    fields: {
        maxString: { label: 'Force string max 5', disallowChange: { maxLength: 5 } },
        // figured out why string/number dichotomy exists.  Try commenting out prevMaxNumber above
        customString: {
            label: 'Cannot contain "sheep"', disallowChange: function (_a) {
                var fieldValue = _a.fieldValue;
                if (fieldValue && (fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.indexOf('sheep')) >= 0)
                    return true;
            }
        },
        // prevMaxNumber: { label: 'Force number max 5', disallowChange: { maxLength: 5 } },
    },
};
export function Validation() {
    var rfDeferred = useReactForms(deferredDefinition);
    var rfImmediate = useReactForms(immediateDefinition);
    var rfForced = useReactForms(forcedDefinition);
    return (_jsxs("div", __assign({ className: 'validation page' }, { children: [_jsx("h1", { children: "Validation Tests" }), _jsxs(FormInspector, __assign({ formBuilder: rfDeferred }, { children: [_jsx("h2", { children: "Validation (Deffered)" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('reqString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('minString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('maxString') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('allString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('customString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('multiFnString') }))] })), _jsx("div", __assign({ className: 'control-row' }, { children: _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.dateInput('reqDate') })) }))] }))] })), _jsx("button", __assign({ onClick: function () { return rfDeferred.validate(); } }, { children: "Validate" })), _jsxs(FormInspector, __assign({ formBuilder: rfImmediate }, { children: [_jsx("h2", { children: "Validation (Immediate)" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('reqString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('minString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('maxString') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('allString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('customString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('multiFnString') }))] })), _jsx("div", __assign({ className: 'control-row' }, { children: _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.dateInput('reqDate') })) }))] }))] })), _jsxs(FormInspector, __assign({ formBuilder: rfForced }, { children: [_jsx("h2", { children: "Validate (Forced)" }), _jsx("div", __assign({ className: 'control-grid' }, { children: _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfForced.textInput('maxString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfForced.textInput('customString') }))] })) }))] }))] })));
}
export default Validation;
