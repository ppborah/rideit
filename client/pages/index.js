import React from "react";
import Blogfeed from "../components/Blogfeed";

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:5000/", );
  const json = await response.json();
  return { props: { blogs: json.data } };
}

export default function Home(props) {
  return (
    <div className="flex flex-col items-center container w-full h-screen m-5 ml-44">
      <div className="flex flex-wrap justify-start">
        <Blogfeed blogs={props.blogs} />
      </div>
    </div>
  );
}
