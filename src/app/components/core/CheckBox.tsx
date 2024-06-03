import { ChangeEventHandler, useId } from 'react';

interface IProps {
  name: string;
  value: string;
  label?: string;
  errorMessage?: any;
  required?: boolean;
  placeholder?: string;
  readonly?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
export default function CheckBox(props: IProps) {
  const inputId = useId();
  return (
    <div className="flex items-center">
      <input
        id={inputId}
        value={props.value}
        name={props.name}
        type="checkbox"
        readOnly={props.readonly}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded accent-cool-indigo-500 focus:ring-cool-indigo-500"
      />
      <label
        htmlFor={inputId}
        className="ms-2 text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      {props.errorMessage && (
        <p className="text-xs text-red-500 mt-1">{props.errorMessage[0]}</p>
      )}
    </div>
  );
}
