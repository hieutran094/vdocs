import { getAllPost } from '@/app/actions';
import DataTable from '@/app/components/core/DataTable';

export const runtime = 'edge';

function RowAction(props: { row: { id: string } }) {
  return (
    <td className="flex px-6 py-4 gap-x-3">
      <a
        href={'/dashboard/posts/' + props.row.id}
        className="font-medium text-cool-indigo-500 hover:underline"
      >
        Edit
      </a>
      <a href="#" className="font-medium text-red-500  hover:underline">
        Delete
      </a>
    </td>
  );
}

export default async function AdminPostPage() {
  const posts = await getAllPost();
  type TTableRow = (typeof posts)[0];
  const columns = [
    {
      name: 'Title',
      selector: (row: TTableRow) => row.title,
    },
    {
      name: 'Action',
      children: (row: TTableRow) => RowAction({ row }),
    },
  ];
  return (
    <div className="pt-5s mx-auto mb-auto p-2 md:pr-2">
      <div className="w-full flex flex-col md:flex-row mt-3 gap-x-6">
        <div className="w-full mt-12">
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
