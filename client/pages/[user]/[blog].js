import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import he from "he";

export async function getServerSideProps(context) {
  return {
    props: {
      blog: context.query, //pass it to the page props
    },
  };
}

const Blog = (props) => {
  const wordCount = props.blog.description.trim().split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="p-4 flex flex-col items-center container w-full h-max-content m-5 ml-28 border-2 border-black rounded-xl">
      <p className="m-0 text-md text-gray-600 self-start">
        {props.blog.createdAt}
        {readingTime > 1
          ? ` - ${readingTime} minutes to read`
          : ` - ${readingTime} minute to read`}
      </p>
      <h2 className="text-2xl font-bold m-2">{props.blog.heading}</h2>
      <img className="rounded-xl mb-4" src={props.blog.blogImage} />
      {ReactHtmlParser(he.decode(props.blog.description))}
    </div>
  );
};

export default Blog;
