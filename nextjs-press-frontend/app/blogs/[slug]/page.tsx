import React from 'react';

const BlogsSlugPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <div>Blogs Slug Page: {slug}</div>;
};

export default BlogsSlugPage;
