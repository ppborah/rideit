import React from "react";
import Blogfeed from "../components/Blogfeed";

const dummyData = [
  {
    heading: "What is Html",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque aperiam odio qui maiores vel deleniti reiciendis libero illum nulla numquam, adipisci, repellendus nesciunt exercitationem corrupti quo quisquam debitis tenetur accusantium",
    createdBy: "John Doe",
    createdAt: "2020-01-01",
    likes: "10",
    profilePic:
      "https://images.unsplash.com/photo-1654205052716-68ee4a1b782b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=375&q=80F",
  },
  {
    heading: "What is Js",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque aperiam odio qui maiores vel deleniti reiciendis libero illum nulla numquam, adipisci, repellendus nesciunt exercitationem corrupti quo quisquam debitis tenetur accusantium",
    createdBy: "John Doe",
    createdAt: "2020-01-01",
    likes: "10",
    profilePic:
      "https://images.unsplash.com/photo-1654124803525-fe9bcaa2de49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    heading: "What is Css",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque aperiam odio qui maiores vel deleniti reiciendis libero illum nulla numquam, adipisci, repellendus nesciunt exercitationem corrupti quo quisquam debitis tenetur accusantium",
    createdBy: "John Doe",
    createdAt: "2020-01-01",
    likes: "10",
    profilePic:
      "https://images.unsplash.com/photo-1654287162702-720646b8252b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    heading: "What is Js",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque aperiam odio qui maiores vel deleniti reiciendis libero illum nulla numquam, adipisci, repellendus nesciunt exercitationem corrupti quo quisquam debitis tenetur accusantium",
    createdBy: "John Doe",
    createdAt: "2020-01-01",
    likes: "10",
    profilePic:
      "https://images.unsplash.com/photo-1654124803525-fe9bcaa2de49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center container w-full h-screen m-5 ml-44">
      <div className="flex flex-wrap justify-start">
        <Blogfeed blogs={dummyData} />
      </div>
    </div>
  );
}
