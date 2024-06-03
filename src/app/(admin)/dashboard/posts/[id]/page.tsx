import { getAllCategory, getOnePost } from '@/app/actions';
import PostForm from '@/app/components/admin/PostForm';

export const runtime = 'edge';
export default async function AdminPostPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const id = searchParams?.['id'];
  const categories = await getAllCategory();
  const post = await getOnePost(id || '');

  const updateForm = {
    ...post,
    metaTitle: post.metaTitle || '',
    summary: post.summary || '',
    content: post.content || '',
    categoryIds: post.categories.map((el) => el.id),
    eyeCatchImageUrl: post.eyeCatchImageUrl || '',
  };

  return (
    <div className="pt-5s mx-auto mb-auto p-2 md:pr-2">
      <div className="w-full flex flex-col md:flex-row mt-3 gap-x-6">
        <div className="w-full mt-12">
          <PostForm
            data={updateForm}
            categories={categories}
            action="update"
          ></PostForm>
        </div>
        <div className="w-[375px]"></div>
      </div>
    </div>
  );
}
