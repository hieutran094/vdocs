import { getAllCategory } from '@/app/actions';
import PostForm from '@/app/components/admin/PostForm';

export const runtime = 'edge';

const createForm = {
  title: '',
  slug: '',
  metaTitle: '',
  summary: '',
  content: '',
  categoryIds: [],
  eyeCatchImageUrl: '',
};
export default async function AdminPostPage() {
  const categories = await getAllCategory();

  return (
    <div className="pt-5s mx-auto mb-auto p-2 md:pr-2">
      <div className="w-full flex flex-col md:flex-row mt-3 gap-x-6">
        <div className="w-full mt-12">
          <PostForm
            data={createForm}
            categories={categories}
            action="create"
          ></PostForm>
        </div>
        <div className="w-[375px]"></div>
      </div>
    </div>
  );
}
