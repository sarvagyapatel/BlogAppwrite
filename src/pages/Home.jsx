import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/postSlice";

function Home() {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch ();

  const everyPost = useSelector((state)=>state.allPosts)

  const [user, setUser] = useState();

  authService.getCurrentUser().then((response) => setUser(response.$id)).catch((error)=>console.log(error));

  useEffect(() => {
   

      appwriteService.getPosts().then((newPosts) => {
        if (newPosts) {
          setPosts(newPosts.documents);
          if(posts.length>0){
            dispatch(addPost(posts));
          }
        }
      });

  }, [user]);

  if (everyPost.length===0) {
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
          everyPost && everyPost.length >0?  (everyPost.map((post) => (
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
