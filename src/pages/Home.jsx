import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState();

  useEffect(() => {
    authService.getCurrentUser().then((response) => setUser(response.$id)).catch((error)=>console.log(error));

    if (user !== "") {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  else{
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {
          posts && posts.length >0?  (posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))) : (<div className="p-2 w-full font-semibold text-xl">
          <p>Currently no post available</p>
        </div>)
          }
        </div>
      </Container>
    </div>
  );}
}

export default Home;
