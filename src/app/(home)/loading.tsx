import ArticleCard from '../components/ArticleCard';

export default function Loading() {
  return (
    <div className="max-w-lg px-4 pt-5 pb-8 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 g gap-x-6 gap-y-6 xl:gap-x-8 xl:gap-y-8 2xl:gap-x-12 2xl:gap-y-12">
        <ArticleCard.Skeleton></ArticleCard.Skeleton>
        <div className="grid gap-x-6 gap-y-6 grid-cols-2 xl:gap-x-8 xl:gap-y-8 2xl:gap-x-12 2xl:gap-y-12">
          {[1, 2, 3, 4].map((_, index) => {
            return <ArticleCard.Skeleton key={index}></ArticleCard.Skeleton>;
          })}
        </div>
      </div>
    </div>
  );
}
