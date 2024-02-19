import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>존재하지 않은 페이지 입니다.</p>
      <Link href='/'>Return Home</Link>
    </div>
  );
}
