import { db } from "../firebase/firebase-config"


export const loadTags = async (uid) => {

  const tagsSnap = await db.collection(`${uid}/blog/tags`).get();
  const tags = []

  tagsSnap.forEach( snapChild => {
    tags.push({
      id: snapChild.id,
      ...snapChild.data()
    })
  });

  return tags;
}