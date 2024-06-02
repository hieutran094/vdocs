import { UserIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
interface IProps {
  data: any;
  className?: string;
}

export default function MiniArticleCard({ data, className }: IProps) {
  return (
    <div
      className={cx(
        'flex w-full h-auto p-3 gap-x-3 border border-gray-200 overflow-hidden rounded-xl',
        className && className
      )}
    >
      <img
        className="w-24 h-24 rounded-lg shadow-md mx-auto object-cover transition ease-in-out duration-300"
        alt="Cruip Bundle"
        src={data.image}
      />
      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <a className="block" href="/resources/cruip-bundle">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center text-sm font-bold leading-5 text-gray-700">
                {data.title}
              </h3>
            </div>
          </a>
        </div>
        <div className="flex flex-wrap mt-1 items-center gap-x-3 gap-y-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-200">
            <UserIcon className="w-4 h-4 text-gray-500"></UserIcon>
          </div>
          <p className="text-xs font-light">Admin</p>
          <p className="text-xs font-light">2024/05/05</p>
        </div>
      </div>
    </div>
  );
}
