import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";
import TextArea from "../inputs/TextArea";
import DateInput from "../inputs/DateInput";
import LocalizedDateInput from "../inputs/LocalizedDateInput";
import CheckBox from "../inputs/CheckBox";
import TextSelect from "../inputs/TextSelect";
import NumberSelect from "../inputs/NumberSelect";
import TextRadio from "../inputs/TextRadio";
import NumberRadio from "../inputs/NumberRadio";
import PostalCode from "../inputs/PostalCode";
import PhoneNumber from "../inputs/PhoneNumber";
import EmailAddress from "../inputs/EmailAddress";
import FileInput from "../inputs/FileInput";
import Currency from "../inputs/Currency";
import { createOptionInput, createStandardInput, getInputProps } from "./FormBuilderInputs";
import { ElementBuilder } from "./ElementBuilder";
import { ReadonlyField } from "../inputs/ReadonlyField";
// The FormBuilder class links form data to actual form fields that we can render in react.
var FormBuilder = /** @class */ (function () {
    function FormBuilder(formDefinition, formData, formState, onFormDataUpdate, onFormStateUpdate, subFormName, subFormIndex, rootFormData) {
        var _this = this;
        this.formDefinition = formDefinition;
        this.formData = formData;
        this.formState = formState;
        this.onFormDataUpdate = onFormDataUpdate;
        this.onFormStateUpdate = onFormStateUpdate;
        this.subFormName = subFormName;
        this.subFormIndex = subFormIndex;
        this.rootFormData = rootFormData;
        this.setLanguage = function (language) {
            var _a;
            if (language !== _this.formState.language) {
                _this.formState = Object.assign({}, _this.formState, { language: language });
                (_a = _this.onFormStateUpdate) === null || _a === void 0 ? void 0 : _a.call(_this, _this.formState);
            }
        };
        this.setReadOnly = function (isReadOnly) {
            var _a;
            if (isReadOnly === void 0) { isReadOnly = true; }
            if (isReadOnly !== _this.formState.isReadonly) {
                _this.formState = Object.assign({}, _this.formState, { isReadOnly: isReadOnly });
                (_a = _this.onFormStateUpdate) === null || _a === void 0 ? void 0 : _a.call(_this, _this.formState);
            }
        };
        this.setDisabled = function (isDisabled) {
            var _a;
            if (isDisabled === void 0) { isDisabled = true; }
            if (isDisabled !== _this.formState.isDisabled) {
                _this.formState = Object.assign({}, _this.formState, { isDisabled: isDisabled });
                (_a = _this.onFormStateUpdate) === null || _a === void 0 ? void 0 : _a.call(_this, _this.formState);
            }
        };
        this.setData = function (formData, formState, fieldName) {
            var _a, _b, _c;
            var _d;
            _this.formData = formData;
            _this.formState = formState !== null && formState !== void 0 ? formState : _this.formState;
            if (fieldName) {
                (_a = (_d = _this.formState).fieldsTouched) !== null && _a !== void 0 ? _a : (_d.fieldsTouched = {});
                _this.formState.fieldsTouched[fieldName] = true;
            }
            (_b = _this.onFormDataUpdate) === null || _b === void 0 ? void 0 : _b.call(_this, _this.formData);
            (_c = _this.onFormStateUpdate) === null || _c === void 0 ? void 0 : _c.call(_this, _this.formState);
        };
        this.setField = function (fieldName, fieldValue) {
            var _a;
            var newFormData = Object.assign({}, _this.formData);
            var newFormState = Object.assign({}, _this.formState);
            newFormData[fieldName] = fieldValue;
            (_a = newFormState.fieldsTouched) !== null && _a !== void 0 ? _a : (newFormState.fieldsTouched = {});
            newFormState.fieldsTouched[fieldName] = true;
            _this.setData(newFormData, newFormState);
        };
        this.textInput = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, TextInput, controlProps); };
        this.textArea = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, TextArea, controlProps); };
        this.numberInput = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, NumberInput, controlProps); };
        this.dateInput = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, DateInput, controlProps); };
        // Note: Localized Date Input does not support standard controlProps like the other inputs do (at this time)
        this.localizedDateInput = function (fieldName) { return _this.linkStandardControl(fieldName, LocalizedDateInput); };
        this.postalCode = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, PostalCode, controlProps); };
        this.phoneNumber = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, PhoneNumber, controlProps); };
        this.emailAddress = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, EmailAddress, controlProps); };
        this.currency = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, Currency, controlProps); };
        this.textSelect = function (fieldName, controlProps) { return _this.linkOptionControl(fieldName, TextSelect, controlProps); };
        this.numberSelect = function (fieldName, controlProps) { return _this.linkOptionControl(fieldName, NumberSelect, controlProps); };
        this.textRadio = function (fieldName, controlProps) { return _this.linkOptionControl(fieldName, TextRadio, controlProps); };
        this.numberRadio = function (fieldName, controlProps) { return _this.linkOptionControl(fieldName, NumberRadio, controlProps); };
        this.checkbox = function (fieldName, controlProps) { return _this.linkStandardControl(fieldName, CheckBox, controlProps); };
        this.readonlyField = function (label, text) { return ReadonlyField({ label: label, value: text, id: 'test' }); };
        // Note: File Input does not support standard controlProps like the other inputs do (at this time)
        this.files = function (fieldName) { return _this.linkStandardControl(fieldName, FileInput); };
        this.ElementBuilder = new ElementBuilder(this);
        // do an initial round of getting form props so that any error conditions are found immediately to hydrate validation state
        formDefinition.fields && Object.entries(formDefinition.fields).forEach(function (_a) {
            var fieldName = _a[0], fieldDef = _a[1];
            getInputProps(formDefinition.fields, formData, formState, fieldName, function () { return null; }, undefined, undefined, undefined);
        });
        // TODO: this is ugly; we need to refactor this so that formbuilder is truly recursive
        this.validateSubForms();
    }
    // TODO: this is ugly; we need to refactor this so that formbuilder is truly recursive
    FormBuilder.prototype.validateSubForms = function () {
        var _this = this;
        var _a = this, formDefinition = _a.formDefinition, formData = _a.formData, formState = _a.formState;
        formDefinition.subForms && Object.entries(formDefinition.subForms).forEach(function (_a) {
            var _b;
            var _c;
            var subFormName = _a[0], subFormDefinition = _a[1];
            var typedSubFormName = subFormName;
            var typedSubFormDefinition = subFormDefinition;
            var fieldSpecArg = {
                fieldValue: formData[typedSubFormName],
                fieldName: typedSubFormName,
                formData: formData,
                formDefinition: formDefinition,
                language: formState.language,
            };
            if (typedSubFormDefinition.validators) {
                var errorConditions = typedSubFormDefinition.validators(fieldSpecArg);
                var errorMessage = errorConditions.join(' | ');
                (_b = (_c = _this.formState).fieldErrorConditions) !== null && _b !== void 0 ? _b : (_c.fieldErrorConditions = {});
                _this.formState.fieldErrorConditions[typedSubFormName] = errorMessage;
            }
        });
    };
    // We've factored out what needs to be done for every control type here
    FormBuilder.prototype.linkStandardControl = function (fieldName, InputControl, controlProps) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            // can't use setfield, because formData may have been altered by a changehandler
            // this.setField(fieldName, formData[fieldName])
            _this.setData(formData, newFormState, fieldName);
        };
        var inputControl = createStandardInput(this.formDefinition.fields || {}, newFormData, newFormState, fieldName, handleChange, InputControl, this.subFormName, this.subFormIndex, this.rootFormData, controlProps);
        return inputControl;
    };
    FormBuilder.prototype.linkOptionControl = function (fieldName, OptionControl, controlProps) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            // can't use setfield, because formData may have been altered by a changehandler
            // this.setField(fieldName, formData[fieldName])
            _this.setData(formData, newFormState, fieldName);
        };
        var inputControl = createOptionInput(this.formDefinition.fields || {}, newFormData, newFormState, fieldName, handleChange, OptionControl, this.subFormName, this.subFormIndex, this.rootFormData, controlProps);
        return inputControl;
    };
    FormBuilder.prototype.validate = function () {
        var _a;
        if (!this.formState.hasBeenValidated) {
            var newFormState = Object.assign({}, this.formState);
            newFormState.hasBeenValidated = true;
            this.formState = newFormState;
            (_a = this.onFormStateUpdate) === null || _a === void 0 ? void 0 : _a.call(this, newFormState);
        }
    };
    FormBuilder.prototype.subFormLoop = function (fieldName, subFormConstructor) {
        var _this = this;
        var _a;
        var subFormDef = this.formDefinition.subForms[fieldName];
        var subFormData = ((_a = this.formData[fieldName]) !== null && _a !== void 0 ? _a : []);
        var elements = subFormData === null || subFormData === void 0 ? void 0 : subFormData.map(function (subFormDatum, rowIndex) {
            var _a, _b, _c;
            var fieldsTouched = ((_b = (_a = _this.formState.fieldsTouched) === null || _a === void 0 ? void 0 : _a[fieldName]) !== null && _b !== void 0 ? _b : []);
            // const fieldErrorConditions = (this.formState.fieldErrorConditions?.[fieldName] ?? []) as Array<FormFieldMap<SubFormT, string>>
            var _d = _this.formState, hasBeenValidated = _d.hasBeenValidated, language = _d.language, isDisabled = _d.isDisabled, isReadonly = _d.isReadonly;
            var subFormState = {
                fieldsTouched: (_c = fieldsTouched[rowIndex]) !== null && _c !== void 0 ? _c : {},
                // fieldErrorConditions: fieldErrorConditions[rowIndex ?? {}],  
                hasBeenValidated: hasBeenValidated,
                isDisabled: isDisabled,
                isReadonly: isReadonly,
                language: language,
            };
            var handleFormDataUpdate = function (newSubFormDatum) {
                var newSubFormData = subFormData.slice();
                newSubFormData[rowIndex] = newSubFormDatum;
                _this.setField(fieldName, newSubFormData);
                _this.validateSubForms();
            };
            var subFormBuilder = new FormBuilder(subFormDef.formDefinition, subFormDatum, subFormState, handleFormDataUpdate, undefined, fieldName === null || fieldName === void 0 ? void 0 : fieldName.toString(), rowIndex, _this.formData);
            var subFormController = {
                subFormIndex: rowIndex,
                deleteInstance: function () {
                    var newSubFormData = subFormData.slice();
                    newSubFormData.splice(rowIndex, 1);
                    _this.setField(fieldName, newSubFormData);
                    _this.validateSubForms();
                },
            };
            return subFormConstructor(subFormBuilder, subFormController);
        });
        // return elements
        return elements;
    };
    FormBuilder.prototype.subFormPanel = function (fieldName, subFormPanelConstructor) {
        var _this = this;
        var subFormController = {
            addInstance: function () {
                var _a, _b;
                var subFormDefinition = (_a = _this.formDefinition.subForms) === null || _a === void 0 ? void 0 : _a[fieldName];
                var newSubFormData = ((_b = _this.formData[fieldName]) !== null && _b !== void 0 ? _b : []).slice();
                var newSubForm = {};
                if (subFormDefinition === null || subFormDefinition === void 0 ? void 0 : subFormDefinition.newSubForm) {
                    newSubForm = subFormDefinition.newSubForm({ fieldValue: _this.formData[fieldName], fieldName: fieldName, formData: _this.formData, formDefinition: _this.formDefinition, language: _this.formState.language });
                }
                newSubFormData.push(newSubForm);
                _this.setField(fieldName, newSubFormData);
                _this.validateSubForms();
            },
        };
        return subFormPanelConstructor(subFormController);
    };
    Object.defineProperty(FormBuilder.prototype, "isValid", {
        get: function () {
            var _a;
            var _b;
            (_a = (_b = this.formState).fieldErrorConditions) !== null && _a !== void 0 ? _a : (_b.fieldErrorConditions = {});
            this.validateSubForms();
            var isValid = !Object.values(this.formState.fieldErrorConditions).some(Boolean);
            return isValid;
        },
        enumerable: false,
        configurable: true
    });
    FormBuilder.prototype.localize = function (localizedString, defaultLocalization) {
        var language = this.formState.language;
        return language ?
            localizedString[language] :
            (defaultLocalization !== null && defaultLocalization !== void 0 ? defaultLocalization : '');
    };
    return FormBuilder;
}());
export { FormBuilder };
export default FormBuilder;
