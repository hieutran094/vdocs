import {
  TagIcon,
  UserIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/16/solid';
import { notFound } from 'next/navigation';

import posts from '@/mocks/posts.json';
import Link from 'next/link';

export const runtime = 'edge';

export default async function PostDetail({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const id = searchParams?.['id'];
  const post = posts.find((el) => el.id === (id || ''));
  if (!post) {
    notFound();
  }
  return (
    <>
      <div className="max-w-lg px-4 pt-5 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
        <div className="relative max-w-2xl mx-auto">
          <div className="flex justify-center items-center space-x-3 text-gray-500 dark:text-gray-400"></div>
          <div className="text-center">
            <h1 className="text-gray-800 pt-4 dark:text-white font-bold text-2xl md:text-3xl lg:text-4xl">
              {post.title}
            </h1>
          </div>
          <div className="flex justify-center items-center pt-3 space-x-3 text-gray-500 dark:text-gray-400">
            <a
              aria-current="page"
              href="/"
              className="router-link-active router-link-exact-active flex items-center p-0.5 pr-2 gap-2 text-sm w-max"
            >
              <span className="p-1 rounded-full bg-primary">
                <UserIcon className="w-5 h-5 text-white"></UserIcon>
              </span>
              By Admin
            </a>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <time className="truncate text-sm">October 21, 2023</time>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/"
              className="router-link-active router-link-exact-active flex items-center text-sm w-max"
            >
              <TagIcon className="w-3"></TagIcon> NodeJs
            </Link>
          </div>
          <div className="flex justify-center pt-10">
            <img
              src={post.image}
              alt="Cover image"
              data-nuxt-img=""
              className="w-full aspect-video object-cover rounded-2xl"
            />
          </div>
          <div className="pt-10 text-gray-700 dark:text-gray-200">
            <p>
              <strong>
                Các vùng miền có vị trí địa lý khác nhau tất yếu dẫn tới nhiều
                dị biệt về nếp sinh hoạt, phong tục tập quán. Tương tự, tục lệ
                hôn nhân ở ba khu vực Bắc, Trung, Nam cũng mang đậm màu sắc
                riêng mà không phải ai cũng am hiểu. Chúng ta hãy cùng khám phá
                những nét thú vị trong phong tục cưới cưới của 3 miền qua bài
                viết dưới đây.
              </strong>
            </p>
            <p></p>
            <p>
              <strong>
                <span className="ql-cursor">﻿</span>
              </strong>
            </p>
            <p>
              Người miền Nam thường có tính cách cởi mở, phóng khoáng nên đã đơn
              giản hóa một số nghi lễ truyền thống. Thông thường chỉ tổ chức lễ
              đính hôn kiêm luôn đón dâu trong cùng ngày, bỏ qua phần lễ cưới
              riêng.
            </p>
            <p>
              Tuy nhiên, miền Nam vẫn giữ một phong tục quan trọng khi đón dâu
              đó là Lễ thượng đèn. Theo đó, nhà trai mang theo một cặp nến lớn.
              Sau khi tân lang tân nương chào hỏi, uống trà rượu xong, hai bên
              gia đình sẽ tiến hành nghi thức thắp đèn. Cô dâu chú rể thắp nến
              rồi đặt lên bàn thờ tổ tiên, tỏ ý cầu xin sự chứng giám của tổ
              tiên để mối nhân duyên bền lâu.
            </p>
            <p></p>
            <p>
              Trái với phong cách nhẹ nhàng của miền Nam, cưới hỏi miền Bắc lại
              nghiêm nghị và tỉ mỉ hơn. Có 3 nghi lễ chính gồm: lễ dạm ngõ, lễ
              hỏi và lễ rước dâu.
            </p>
            <p>
              Lễ dạm ngõ là dịp hai nhà gặp gỡ, trao đổi thân tình nên không cần
              đông người, chỉ mời vài người thân thiết.
            </p>
            <p></p>
            <p>
              Trong lễ đính hôn, không thể thiếu cốm, hồng và heo quay. Lưu ý,
              số lượng quà phải là số lẻ, tượng trưng cho âm dương cân bằng.
            </p>
            <p>
              Lễ rước dâu diễn ra sau khi hai bên thống nhất thời gian. Theo tục
              lệ, cô dâu không được quay đầu, chính bố chồng đưa con gái về nhà
              chồng. Trên đường đi cô dâu phải mang tiền lẻ và ném hoa xuống
              đường nếu gặp đám cưới khác.
            </p>
            <p></p>
            <p>
              Như vậy, bài viết đã khái quát một số nét văn hóa độc đáo trong
              phong tục cưới hỏi của 3 miền. Hy vọng qua đó, bạn đọc có thể hiểu
              rõ hơn về truyền thống hôn nhân Việt Nam.
            </p>
          </div>
          <div className="flex justify-between items-center py-10">
            <Link
              href="/"
              className="inline-flex text-sm items-center font-medium text-primary bg-transparent px-4 py-2"
            >
              <ChevronDoubleLeftIcon className="w-5 h-5 mr-1"></ChevronDoubleLeftIcon>
              View another post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
