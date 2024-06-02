'use client';

import React, { ChangeEvent, useCallback, useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import TextInput from '@/app/components/core/TextInput';
import TextEditor from '@/app/components/core/TextEditor';
import { useFormState } from 'react-dom';
import { createPost } from '@/app/actions';
import ImageInput from '@/app/components/core/ImageInput';

export const runtime = 'edge';
export default function AdminPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '/images/nodejs_advanced.png',
  });

  const [state, formAction] = useFormState(createPost, {
    success: true,
    message: '',
  });

  const handleTextEditorChange = useCallback((value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      content: value,
    }));
  }, []);

  const handleInputChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  return (
    <div className="pt-5s mx-auto mb-auto p-2 md:pr-2">
      <div className="w-full flex flex-col md:flex-row mt-3 gap-x-6">
        <div className="w-full mt-12">
          <form action={formAction} className="flex flex-col gap-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                name="title"
                label="Title"
                required={true}
                value={formData.title}
                onChange={handleInputChange}
              ></TextInput>
            </div>
            <ImageInput
              name="image"
              label="Eye catch image"
              value={formData.image}
              required={true}
            >
              <div className="w-full flex flex-col items-center px-5">
                <CloudArrowUpIcon className="w-8 h-8 text-gray-400" />
                <p className="text-xs text-center">Click to select image</p>
              </div>
            </ImageInput>
            <input
              name="content"
              value={formData.content}
              onChange={() => {}}
              className="sr-only"
            ></input>
            <TextEditor
              label="Content"
              required={true}
              value={formData.content}
              onChange={handleTextEditorChange}
            ></TextEditor>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="w-[315px]">
          {/* <div className="w-full h-56 bg-white mt-12 rounded-lg"></div> */}
        </div>
      </div>
    </div>
  );
}
