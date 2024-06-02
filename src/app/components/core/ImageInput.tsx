'use client';
import { TrashIcon } from '@heroicons/react/24/solid';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, useId, useState } from 'react';
import cx from 'classnames';

interface IProps {
  name: string;
  value: string;
  label?: string;
  errorMessage?: any;
  required?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  disabledRemove?: boolean;
  accept?: string;
  onChange?: (_: null | File) => void;
}

export default function ImageInput(props: IProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] = useState(props.value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      if (props.onChange) props.onChange(file);
    }
  };
  const clearPreview = () => {
    setPreviewUrl('');
    if (props.onChange) props.onChange(null);
  };

  return (
    <div className="w-full">
      {props.label && (
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          {props.label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="group relative w-[250px] h-[250px] border border-dashed border-gray-300 bg-white rounded-lg hover:border-primary">
        <label
          htmlFor={inputId}
          className={cx(
            'flex h-full w-full cursor-pointer flex-col items-center justify-center',
            previewUrl && 'hidden'
          )}
        >
          <span title="Select from your computer">
            {props.children && props.children}
          </span>
          <input
            type="file"
            id={inputId}
            className="sr-only"
            name={props.name}
            accept={props.accept}
            onChange={handleInputChange}
          />
        </label>

        <div
          className={cx(
            'relative flex h-full w-full flex-col items-center justify-center rounded-lg',
            !previewUrl && 'hidden'
          )}
        >
          <img
            src={previewUrl}
            alt="preview"
            className="max-h-full max-w-full object-contain rounded-lg"
          />
          <div className="absolute flex md:hidden h-16 bottom-0 md:h-full w-full items-center justify-center gap-6 rounded-lg duration-150 transition bg-black/30 backdrop-opacity-50 md:backdrop-opacity-100 group-hover:flex group-hover:backdrop-opacity-50">
            <ArrowsPointingOutIcon className="h-6 w-6 cursor-pointer text-gray-200" />
            {!props.disabledRemove && (
              <TrashIcon
                className="h-6 w-6 cursor-pointer text-gray-200"
                onClick={clearPreview}
              />
            )}
          </div>
        </div>
      </div>
      {props.errorMessage && (
        <p className="text-xs text-red-500 mt-1">{props.errorMessage[0]}</p>
      )}
    </div>
  );
}
