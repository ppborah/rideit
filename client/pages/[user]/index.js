import React, { useEffect, useState } from "react";
import Blogfeed from "../../components/Blogfeed";

const Profile = (props) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch(`localhost:5000/${localStorage.getItem("userId")}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  return (
    <div className="flex flex-col items-center container w-full h-screen m-5 ml-44">
      <div className="flex flex-wrap justify-start">
        <Blogfeed blogs={blogs} />
      </div>
    </div>
  );
};

export default Profile;
