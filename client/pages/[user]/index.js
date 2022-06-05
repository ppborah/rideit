import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch(`localhost:5000/${localStorage.getItem("userId")}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  console.log(blogs);
  return <div className="w-screen flex h-screen justify-center"></div>;
};

export default Profile;
