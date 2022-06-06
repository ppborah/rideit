import React, { useState } from "react";
import toast from "react-hot-toast"

const BlogOperations = ({ defaultValues }) => {
  const [title, setTitle] = useState(defaultValues.heading);
  const [description, setDescription] = useState(defaultValues.description);
console.log(defaultValues._id)
  const updateBlog = async () => {
      console.log(title)
      console.log(description)
      try{
        const response = await fetch(`http://localhost:5000/${defaultValues._id}/${defaultValues.userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            authToken: localStorage.getItem("token"),
          }),
        });
        const data = await response.json();
        console.log(data)
        toast.success("Blog updated successfully")
      }catch(e){
            console.error(e);
            toast.error("Error updating blog");
      }
  }

  return (
    <div className="flex flex-col w-full">
      <label>Title</label>
      <input
        className="border-2 p-4 border-black rounded-xl"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Content</label>
      <textarea
        rows={15}
        onChange={(e) => setDescription(e.target.value)}
        className="border-2 border-black rounded-xl my-4 p-4"
        value={description}
      />
      <p>You can use HTML for advanced markdown</p>
      <button onClick={updateBlog} className="w-1/4 border-2 border-black bg-cyan-400 m-3 p-3 text-white rounded-xl">submit</button>
    </div>
  );
};

export default BlogOperations;
