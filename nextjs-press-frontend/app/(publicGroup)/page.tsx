import { Button } from '@/components/ui/button';
import { getMe } from '@/service/getMe';

export default async function Home() {
  console.log('Root Route');

  const user = await getMe();
  console.log(user);
  return (
    <div>
      <h1>Welcome to Next.js</h1>

      <Button size={'xs'} variant={'destructive'}>
        Click Me
      </Button>
    </div>
  );
}
