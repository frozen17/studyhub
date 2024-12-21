import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyCnM7fB8FqdoZzViMKkqgq2wsb6KX0Bm6k",
  authDomain: "studyhub-bd548.firebaseapp.com",
  projectId: "studyhub-bd548",
  storageBucket: "studyhub-bd548.firebasestorage.app",
  messagingSenderId: "419324894758",
  appId: "1:419324894758:web:e2b993e86610b09bab50e7",
  measurementId: "G-FJC48XSRL5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);


export const storage = getStorage(app);

export const createNews = async (title, content, imageFile) => {
  try {
    let imageUrl = "";

    if (imageFile) {
      const storageRef = ref(storage, `news_images/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const newsRef = collection(db, "news");
    await addDoc(newsRef, {
      title,
      content,
      imageUrl,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Ошибка при создании новости:", error);
    throw error;
  }
};




export default app;
