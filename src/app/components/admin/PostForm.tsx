'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import slugify from 'slugify';
import { toast } from 'sonner';
import TextInput from '@/app/components/core/TextInput';
import TextEditor from '@/app/components/core/TextEditor';
import { useFormState } from 'react-dom';
import { createPost } from '@/app/actions';
import ImageInput from '@/app/components/core/ImageInput';
import TextArea from '@/app/components/core/TextArea';
import CheckBox from '@/app/components/core/CheckBox';

export const runtime = 'edge';

interface IProps {
  data: {
    title: string;
    slug: string;
    metaTitle: string;
    summary: string;
    content: string;
    categoryIds: string[];
    eyeCatchImageUrl: string;
  };
  categories: any[];
  action: 'create' | 'update';
}
export default function PostForm(props: IProps) {
  const [formData, setFormData] = useState(props.data);

  const [submitState, formAction] = useFormState(createPost, {
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
    ({
      target: { name, value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  useEffect(() => {
    const slug = slugify(formData.title, {
      locale: 'vi',
      lower: true,
    });
    setFormData((prevState) => ({
      ...prevState,
      slug,
    }));
  }, [formData.title]);

  useEffect(() => {
    if (submitState?.message) {
      if (submitState.success) {
        toast.success(submitState.message);
      } else {
        toast.error(submitState.message);
      }
    }
    console.log(submitState);
  }, [submitState]);
  return (
    <form action={formAction} className="flex flex-col gap-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextInput
          name="title"
          label="Title"
          required={true}
          value={formData.title}
          errorMessage={submitState?.errors?.title}
          onChange={handleInputChange}
        ></TextInput>
        <TextInput
          name="slug"
          label="Slug"
          required={true}
          value={formData.slug}
          readonly={true}
          errorMessage={submitState?.errors?.slug}
          onChange={handleInputChange}
        ></TextInput>

        <div className="flex flex-col gap-y-5">
          <TextArea
            name="metaTitle"
            label="Meta Title"
            value={formData.metaTitle}
            errorMessage={submitState?.errors?.metaTitle}
            onChange={handleInputChange}
          ></TextArea>
          <TextArea
            name="summary"
            label="Summary"
            value={formData.summary}
            rows={4}
            errorMessage={submitState?.errors?.summary}
            onChange={handleInputChange}
          ></TextArea>
        </div>
        <ImageInput
          name="eyeCatchImageFile"
          label="Eye catch image"
          value={formData.eyeCatchImageUrl}
          errorMessage={submitState?.errors?.eyeCatchImageFile}
          required={true}
        >
          <div className="w-full flex flex-col items-center px-5">
            <CloudArrowUpIcon className="w-8 h-8 text-gray-400" />
            <p className="text-xs text-center">Click to select image</p>
          </div>
        </ImageInput>
      </div>
      <div className="w-full">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Category<span className="text-red-500">*</span>
        </label>
        <div className="w-full flex flex-wrap gap-3">
          {props.categories.map((category, index) => {
            return (
              <CheckBox
                name="categoryIds"
                label={category.title}
                value={category.id}
                defaultChecked={formData.categoryIds.indexOf(category.id) > 0}
                key={category.id}
              ></CheckBox>
            );
          })}
        </div>
        {submitState?.errors?.categoryIds && (
          <p className="text-xs text-red-500 mt-1">
            {submitState?.errors?.categoryIds[0]}
          </p>
        )}
      </div>
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
        errorMessage={submitState?.errors?.content}
      ></TextEditor>

      <button
        type="submit"
        className="items-center h-10 px-4 py-2 text-sm text-white transition duration-300 ease-in-out rounded-lg outline-none right-1 top-1 bg-cool-indigo-600 md:px-6 sm:font-medium hover:bg-cool-indigo-700 focus:outline-none focus:ring-1 focus:ring-cool-indigo-500"
      >
        Save
      </button>
    </form>
  );
}
