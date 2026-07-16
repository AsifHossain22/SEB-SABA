import Link from 'next/link';
import LikeButton from './ui/LikeButton';

export default function Home() {
  console.log('Root Route');
  return (
    <div>
      <h1>Welcome to Next.js</h1>

      <h3>
        Blog Page <Link href={'/blogs/1'}>Blogs</Link>
      </h3>

      <LikeButton />
    </div>
  );
}
