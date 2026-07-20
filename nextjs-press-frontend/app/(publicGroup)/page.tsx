import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>

      <Button size={'xs'} variant={'destructive'}>
        Click Me
      </Button>
    </div>
  );
}
