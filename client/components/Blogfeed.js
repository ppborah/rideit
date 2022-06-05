import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import Link from 'next/link'

const Blogfeed = ({ blogs }) => {
  return blogs.length > 0 ? (
    blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
  ) : (
    <div>
      <p className="font-bold ">No blogs yet</p>
    </div>
  );
};

const BlogItem = ({ blog }) => {
  console.log(blog.userId.userName)
  return (
    <div className=" flex flex-col items-start w-1/4 m-5 p-3 border-4 border-black rounded-xl shadow-1xl hover:shadow-2xl transition-all duration-300 ease-linear">
      <div className="flex">
        <img
          className="rounded-full w-12 h-12 mx-2"
          src={
            !blog.profilePic
              ? "https://images.unsplash.com/photo-1596836471905-0f4255f13eb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80"
              : blog.profilePic
          }
        />
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{blog.createdBy}</h3>
          <h3>{blog.createdAt}</h3>
        </div>
      </div>
      <div className="m-2">
        <Link href={`/${blog.userId.userName}/${blog._id}`}><h2 className="text-2xl font-bold">{blog.heading}</h2></Link>
        <p className="text-gray-600">{blog.description.slice(0, 33)}...</p>
      </div>
      <img src={blog.blogImage} className="rounded-xl"/>
      <div>
        <h3 className="text-xl font-bold flex items-center">
          <AiOutlineLike /> {blog.likes.length}
        </h3>
      </div>
    </div>
  );
};

export default Blogfeed;
