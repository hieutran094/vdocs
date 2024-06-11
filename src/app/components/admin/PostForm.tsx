'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import slugify from 'slugify';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import TextInput from '@/app/components/core/TextInput';
import TextEditor from '@/app/components/core/TextEditor';
import { useFormState } from 'react-dom';
import { createPost, updatePost } from '@/app/actions';
import ImageInput from '@/app/components/core/ImageInput';
import TextArea from '@/app/components/core/TextArea';
import CheckBox from '@/app/components/core/CheckBox';
import Button from '@/app/components/core/Button';
import { useAppContext } from '@/app/context/app.context';
import { EUserRole } from '@/enums';

export const runtime = 'edge';

interface IProps {
  data: {
    id?: string;
    title: string;
    slug: string;
    metaTitle: string;
    summary: string;
    content: string;
    categoryIds: string[];
    eyeCatchImageUrl: string;
    published?: number | null;
  };
  categories: any[];
  action: 'create' | 'update';
}
export default function PostForm(props: IProps) {
  const { setIsLoading, loginUser } = useAppContext();
  const [formData, setFormData] = useState(props.data);

  const [submitState, formAction] = useFormState(
    props.action === 'create' ? createPost : updatePost,
    {
      success: true,
      message: '',
    }
  );

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
        redirect('/dashboard/posts');
      } else {
        toast.error(submitState.message);
      }
    }
  }, [submitState]);
  return (
    <form action={formAction} className="flex flex-col gap-y-5">
      {props.action === 'update' && (
        <input name="id" className="hidden" value={props.data.id}></input>
      )}
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
          onChange={() => {}}
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
                disabled={props.action === 'update'}
                key={index}
                onChange={() => {}}
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
      {loginUser?.role === EUserRole.ADMIN && (
        <div className="w-full">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Published
          </label>
          <div className="w-full flex flex-wrap gap-3">
            <CheckBox
              name="published"
              label="Public"
              value="1"
              defaultChecked={formData.published === 1}
              onChange={() => {}}
            ></CheckBox>
          </div>
        </div>
      )}

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

      <Button onLoading={setIsLoading}>Save</Button>
    </form>
  );
}
