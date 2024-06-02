import { eq } from 'drizzle-orm';
import { db } from '@/database';
import { users } from '@/database/schema';
import ArticleCard from '@/app/components/ArticleCard';
import MiniArticleCard from '@/app/components/MiniArticleCard';
import posts from '@/mocks/posts.json';

export const runtime = 'edge';

export default async function Page() {
  const data = await db.select().from(users).where(eq(users.username, '1'));

  return (
    <>
      <div className="max-w-lg px-4 pt-5 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 g gap-x-6 gap-y-6 xl:gap-x-8 xl:gap-y-8 2xl:gap-x-12 2xl:gap-y-12">
          <ArticleCard data={posts[0]}></ArticleCard>
          <div className="grid gap-x-6 gap-y-6 grid-cols-2 xl:gap-x-8 xl:gap-y-8 2xl:gap-x-12 2xl:gap-y-12">
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <ArticleCard
                  data={posts[Math.floor(Math.random() * posts.length)]}
                  key={index}
                ></ArticleCard>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-3xl mb-10 md:mb-16 px-4 pt-8 mx-auto lg:max-w-screen-xl sm:pt-10 sm:px-6 lg:px-8">
        <div className="w-full border border-gray-200 rounded-md p-3">
          <div className="flex flex-col md:flex-row gap-y-2 text-center justify-center text-sm">
            <p className="font-semibold text-gray-800 mr-3">
              Most Search Tags:
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-[12px] font-light text-primary rounded-lg bg-primary/20"
                >
                  #keyword
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-lg px-4 pt-5 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-md font-semibold text-gray-700">Tredding</h2>
          <button className="px-2.5 py-2 bg-transparent border border-gray-200 text-xs rounded-md">
            View All Post
          </button>
        </div>
        <div className="grid gap-x-6 gap-y-6 pt-8 grid-cols-2 md:grid-cols-4 md:gap-x-8 xl:gap-y-8 2xl:gap-x-12 2xl:gap-y-12">
          {[1, 2, 3, 4].map((el, index) => {
            return (
              <ArticleCard
                data={posts[Math.floor(Math.random() * posts.length)]}
                key={index}
              ></ArticleCard>
            );
          })}
        </div>
      </div>
      <div className="max-w-lg mb-12 px-4 pt-12 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12 md:pt-20">
        <div className="w-full flex flex-col md:flex-row gap-x-6 gap-y-6 xl:gap-x-8 xl:gap-y-8 2xl:gap-x-12 2xl:gap-y-12">
          <div className="md:basis-2/3">
            <div className="w-full flex mb-5 items-center justify-between">
              <h2 className="text-md font-semibold text-gray-700">
                Weekly Best
              </h2>
              <button className="px-2.5 py-2 bg-transparent border border-gray-200 text-xs rounded-md">
                View All Post
              </button>
            </div>
            <ArticleCard data={posts[1]} className="aspect-video"></ArticleCard>
            <div className="w-full mt-5 grid md:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((_, index) => (
                <MiniArticleCard
                  data={posts[Math.floor(Math.random() * posts.length)]}
                  key={index}
                  className="border"
                ></MiniArticleCard>
              ))}
            </div>
            <div className="w-full mt-6 md:mt-12 md:px-6">
              <div className="max-full p-3 rounded-lg bg-gray-200 text-center">
                <p className="text-xs text-gray-500">Advertisement</p>
                <p className="text-gray-600 text-md font-medium">
                  You can place ads
                </p>
                <p className="text-sm text-gray-500">750x100</p>
              </div>
            </div>
          </div>
          <div className="md:basis-1/3">
            <div className="p-6 border border-gray-200 rounded-2xl">
              <div className="w-full flex mb-5 items-center justify-between">
                <h2 className="text-md font-semibold text-gray-700">
                  Popular Post
                </h2>
              </div>
              <div className="w-full flex flex-col gap-y-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <MiniArticleCard
                    data={posts[Math.floor(Math.random() * posts.length)]}
                    key={index}
                    className="border"
                  ></MiniArticleCard>
                ))}
              </div>
            </div>
            <div className="mt-6 p-6 border border-gray-200 rounded-2xl">
              <div className="w-full flex mb-5 items-center justify-between">
                <h2 className="text-md font-semibold text-gray-700">
                  Category
                </h2>
              </div>
              <div className="w-full flex flex-col gap-y-4">
                {['NodeJs', 'ReactJs', 'VueJs', 'DevOps', 'Design'].map(
                  (name, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between pt-1 pb-2 border-b border-gray-200"
                      >
                        <p className="text-sm font-semibold text-gray-600">
                          {name}
                        </p>
                        <span className="px-1.5 py-1 rounded-lg text-xs font-semibold text-primary bg-primary/10">
                          15
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
