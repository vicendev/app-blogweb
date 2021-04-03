import { db } from "../firebase/firebase-config"


export const loadPosts = async () => {

  const postsSnap = await db.collection('posts').get();
  const posts = []

  postsSnap.forEach( snapChild => {
    posts.push({
      id: snapChild.id,
      ...snapChild.data()
    })
  });

  return posts;
}

export const loadPostById = async (id) => {

  const postSnap = await db.collection('posts').doc(id);
  const post = await postSnap.get()

  if (post.exists) {
    return post.data();
  } else {
    return null;
  }
}