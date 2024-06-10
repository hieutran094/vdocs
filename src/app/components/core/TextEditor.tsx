import { useId } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface IProps {
  value: string;
  label?: string;
  errorMessage?: any;
  required?: boolean;
  placeholder?: string;
  onChange?: (_value: string) => void;
}
export default function TextEditor(props: IProps) {
  const inputId = useId();
  return (
    <div className="w-full">
      {props.label && (
        <label
          className="mb-2 block text-sm font-semibold text-gray-700"
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
      <QuillEditor
        theme="snow"
        id={inputId}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['image', 'code-block'],
          ],
        }}
        className="w-full rounded-lg bg-white [&_.ql-container]:h-44 [&_.ql-container]:max-h-[550px] [&_.ql-editor]:text-gray-600 [&_.ql-container]:rounded-b-lg [&_.ql-container]:!border-gray-200 [&_.ql-container]:bg-white [&_.ql-toolbar]:rounded-t-lg [&_.ql-toolbar]:!border-gray-200"
      />
      {props.errorMessage && (
        <p className="text-xs text-red-500 mt-1">{props.errorMessage[0]}</p>
      )}
    </div>
  );
}
