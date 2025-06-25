import FormBase from "./FormBase";
import Input from "./Input";
import Textarea from "./TextArea";
import HelperText from "./HelperText";
import ValidationError from "./ValidationError";
import OtherInput from "./OtherInput";
import Group from "./Group";
import Label from "./Label";

// 🔹 Extend the main Form type with all subcomponents
type FormComponent = typeof FormBase & {
  Group: typeof Group;
  Label: typeof Label;
  Input: typeof Input;
  Textarea: typeof Textarea;
  HelperText: typeof HelperText;
  ValidationError: typeof ValidationError;
  OtherInput: typeof OtherInput;
};

// 🔹 Merge base + subcomponents
const Form = Object.assign(FormBase, {
  Group,
  Label,
  Input,
  Textarea,
  HelperText,
  ValidationError,
  OtherInput,
}) as FormComponent;

export default Form;
export { Input, Textarea, FormBase, HelperText, ValidationError, OtherInput, Group, Label };
