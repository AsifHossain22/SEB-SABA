import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>

      <h3>
        Blog Page <Link href={'/blogs/1'}>Blogs</Link>
      </h3>
    </div>
  );
}
