'use client';
import Link from 'next/link';
import { toast } from 'sonner';
import { useCallback, useEffect, useState } from 'react';
import { deleteOnPost, searchPost } from '@/app/actions';
import DataTable from '@/app/components/core/DataTable';
import { useAppContext } from '@/app/context/app.context';
import { Post } from '@/database/schema';

export const runtime = 'edge';

function RowAction(props: {
  row: { id: string };
  onResponse?: (res: { success: boolean; message: string }) => void;
}) {
  const { setIsLoading } = useAppContext();
  return (
    <td className="flex px-6 py-4 gap-x-3">
      <Link
        href={'/dashboard/posts/' + props.row.id}
        className="font-medium text-cool-indigo-500 hover:underline"
      >
        Edit
      </Link>
      <button
        onClick={async () => {
          setIsLoading(true);
          const response = await deleteOnPost(props.row.id);
          if (props.onResponse) props.onResponse(response);
          setIsLoading(false);
        }}
        className="font-medium text-red-500 hover:underline"
      >
        Delete
      </button>
    </td>
  );
}

export default function AdminPostPage() {
  const { setIsLoading } = useAppContext();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const getPosts = useCallback(async () => {
    setIsLoading(true);
    const result = await searchPost({
      limit: 1000,
      page: 1,
    });
    if (result.success && result.data) {
      setPosts(result.data);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  }, []);
  type TTableRow = (typeof posts)[0];
  const columns = [
    {
      name: 'Title',
      selector: (row: TTableRow) => row.title,
    },
    {
      name: 'Status',
      selector: (row: TTableRow) =>
        row.published ? 'Published' : 'Unpublished',
    },
    {
      name: 'Author',
      selector: (row: TTableRow) => row.author?.username,
    },
    {
      name: 'Action',
      children: (row: TTableRow, key: string) => (
        <RowAction
          row={row}
          onResponse={onActionResponse}
          key={key}
        ></RowAction>
      ),
    },
  ];
  async function onActionResponse(res: { success: boolean; message: string }) {
    if (res.success) {
      toast.success(res.message);
      await getPosts();
    } else {
      toast.error(res.message);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="pt-5s mx-auto mb-auto p-2 md:pr-2">
      <div className="w-full flex flex-col md:flex-row mt-3 gap-x-6">
        <div className="w-full mt-12">
          <div className="w-full mb-5">
            <Link
              href="/dashboard/posts/create"
              className="items-center h-10 px-4 py-2 text-sm text-white transition duration-300 ease-in-out rounded-lg outline-none right-1 top-1 bg-cool-indigo-600 md:px-6 sm:font-medium hover:bg-cool-indigo-700 focus:outline-none focus:ring-1 focus:ring-cool-indigo-500"
            >
              New Post
            </Link>
          </div>
          <div className="relative overflow-x-auto">
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <DataTable data={posts} columns={columns}></DataTable>
            </div>
          </div>
        </div>
        <div className="w-[375px]"></div>
      </div>
    </div>
  );
}
