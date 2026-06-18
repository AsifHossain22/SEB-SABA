import { prisma } from './lib/prisma';

async function main() {
  // Create a new user with a post

  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Akash',
  //     email: 'akash@prisma.io',
  //     posts: {
  //       create: {
  //         title: 'Bye Prisma!',
  //         content: 'This is my third Prisma content.',
  //         published: true,
  //       },
  //     },
  //   },
  //   include: {
  //     posts: true,
  //   },
  // });

  const newPost = await prisma.post.create({
    data: {
      authorId: 1,
      title: 'Return to Prisma!',
      content: 'This is second post as 1st user!',
      published: true,
    },
  });
  console.log('Created post:', newPost);
  // console.log('Created user:', user);1

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log('All users:', JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
