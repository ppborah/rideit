import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BlogOperations from "../../components/BlogOperations";

const BlogEdit = () => {
  return (
    <div>
      <BlogManager />
    </div>
  );
};

const BlogManager = () => {
  const router = useRouter();
  const [blog, setBlog] = useState({});

  const fetchBlog = async () => {
    const url = `http://localhost:5000/blog/${router.query.blog}`;
    const res = await fetch(url);
    const data = await res.json();
    setBlog(data.data[0]);
    console.log(data);
    console.log(blog);
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchBlog();
  }, [router.isReady]);

  return (
    <div>
      {blog && (
        <div className="ml-28">
          <section>
            <h1>{blog.title}</h1>
            <p>ID: {blog._id}</p>
            <BlogOperations defaultValues={blog} />
          </section>
        </div>
      )}
    </div>
  );
};

export default BlogEdit;
