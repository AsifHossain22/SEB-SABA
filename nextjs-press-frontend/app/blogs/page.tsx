/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import MyServerComponent from '../ui/MyServerComponent';
import { getBlogs } from '../service/getBlogs';
import { cacheLife } from 'next/cache';

const BlogsPage = async () => {
  // 'use cache';
  // cacheLife('hours');

  const blogs = await getBlogs();
  console.log(blogs);
  return (
    <div>
      Blogs Page
      {blogs.map((blog: any) => {
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
        </div>;
      })}
      <MyServerComponent />
    </div>
  );
};

export default BlogsPage;
