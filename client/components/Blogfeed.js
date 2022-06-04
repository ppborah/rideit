import React from "react";
import { AiOutlineLike } from "react-icons/ai";

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
  return (
    <div className=" flex flex-col items-start w-1/4 m-5 p-3 border-4 border-black rounded-xl shadow-1xl hover:shadow-2xl transition-all duration-300 ease-linear">
      <div className="flex">
        <img className="rounded-full w-12 h-12 mx-2" src={blog.profilePic} />
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{blog.createdBy}</h3>
          <h3>{blog.createdAt}</h3>
        </div>
      </div>
      <div className="m-2">
        <h2 className="text-2xl font-bold">{blog.heading}</h2>
        <p className="text-gray-600">{blog.description}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold flex items-center">
          <AiOutlineLike /> {blog.likes}
        </h3>
      </div>
    </div>
  );
};

export default Blogfeed;
