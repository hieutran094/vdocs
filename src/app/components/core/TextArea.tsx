import { ChangeEventHandler, useId } from 'react';

interface IProps {
  name: string;
  value: string;
  label?: string;
  errorMessage?: any;
  required?: boolean;
  placeholder?: string;
  readonly?: boolean;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}
export default function TextArea(props: IProps) {
  const inputId = useId();
  return (
    <div className="w-full">
      {props.label && (
        <label
          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
          htmlFor={inputId}
        >
          {props.label}
          {props.required && (
            <span v-if="props.required" className="text-red-500">
              *
            </span>
          )}{' '}
        </label>
      )}
      <textarea
        id={inputId}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        readOnly={props.readonly}
        onChange={props.onChange}
        rows={props.rows || 3}
        className="w-full bg-body py-2.5 px-3 text-sm rounded-lg border-[1.5px] border-stroke font-normal outline-none transition duration-150 focus:border-indigo-600 active:border-indigo-600"
      />
      {props.errorMessage && (
        <p className="text-xs text-red-500 mt-1">{props.errorMessage[0]}</p>
      )}
    </div>
  );
}
