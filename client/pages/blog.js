import React from "react";

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const userDoc = await getUserWithUsername(username);

//   let post;
//   let path;

//   if (userDoc) {
//     const postRef = userDoc.ref.collection('posts').doc(slug);
//     post = postToJSON(await postRef.get());

//     path = postRef.path;
//   }

//   return {
//     props: { post, path },
//     revalidate: 100,
//   };
// }

const Blog = () => {
  const data = {
    heading: "What is Html",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque aperiam odio qui maiores vel deleniti reiciendis libero illum nulla numquam, adipisci, repellendus nesciunt exercitationem corrupti quo quisquam debitis tenetur accusantium",
    createdBy: "John Doe",
    createdAt: "2020-01-01",
    likes: "10",
    profilePic:
      "https://images.unsplash.com/photo-1654205052716-68ee4a1b782b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=375&q=80F",
  };
  return <div className="flex shadow-2xl rounded-xl mx-24 border-2 border-black">
      <div>dxhuibduix</div>
  </div>;
};

export default Blog;
