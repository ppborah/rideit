import React from "react";

export async function getStaticProps({ params }) {
  const { user, blogId } = params;

  let blog;
  let path;

  const blogRef = firestore.collection("blogs").doc(slug);
  blog = blogToJSON(await blogRef.get());
  path = blogRef.path;
  if (blog.createdAt === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blog, path },
  };
}

const UserProfile = () => {
  return (
    <div className="border-2 border-black p-4 flex flex-col items-start w-full">
      <p className="m-0 text-md text-gray-600 self-start">
        {createdAt.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        {readingTime > 1
          ? ` - ${readingTime} minutes to read`
          : ` - ${readingTime} minute to read`}
      </p>
    </div>
  );
};

export default UserProfile;
