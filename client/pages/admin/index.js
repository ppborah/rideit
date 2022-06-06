import React, { useState, useEffect } from "react";
import Blogfeed from "../../components/Blogfeed";
import toast from "react-hot-toast";

const CurrentUserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const res = await fetch(
      `http://localhost:5000/${localStorage.getItem("user")}/blogs`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    setBlogs(data.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="flex flex-col items-center container w-full h-screen m-5 ml-44">
      <div className="flex flex-wrap justify-start">
        <Blogfeed blogs={blogs} getBlogs={getBlogs} />
      </div>
      <div>
        <Createbtn getBlogs={getBlogs} />
      </div>
    </div>
  );
};

const Createbtn = ({ getBlogs }) => {
  const [title, setTitle] = useState("");
  //checking if title is valid
  const isValid = title.length < 3 && title.length < 60;

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/create-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("user"),
          heading: title,
          description: "this is content",
          blogImage: " ",
          likes: [],
          isDeleted: false,
          authToken: token,
        }),
      });
      const data = await response.json();
      if (data.status) {
        toast.success("Blog created successfully");
        setTitle("");
        getBlogs();
      } else {
        return toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col">
        <label htmlFor="title" className="form-label">
          Blog Title
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="New title"
          className="border-2 border-black outline-none rounded-xl p-3"
          id="title"
        />
        <button
          aria-label="Create new post"
          className="border-2 border-black rounded-xl p-2 bg-blue-400 m-5"
          disabled={isValid}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CurrentUserBlogs;
