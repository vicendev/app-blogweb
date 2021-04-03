import { db } from "../firebase/firebase-config"


export const loadTags = async () => {

  const tagsSnap = await db.collection('tags').get();
  const tags = []

  tagsSnap.forEach( snapChild => {
    tags.push({
      id: snapChild.id,
      ...snapChild.data()
    })
  });

  return tags;
}