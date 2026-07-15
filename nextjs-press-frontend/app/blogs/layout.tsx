import React from 'react';

const BlogsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      Blogs Layout is special only for Blogs Route or Nested Routes inside the
      Blogs Directory
      {children}
    </div>
  );
};

export default BlogsLayout;
