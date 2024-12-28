import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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

export const createEvent = async (title, date, location, capacity, image) => {
  try {
    let imageUrl = "";

    if (image instanceof File) {
      const storageRef = ref(storage, `event_images/${Date.now()}_${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    } else {
      imageUrl = image; 
    }

    const eventRef = collection(db, "events");
    await addDoc(eventRef, {
      title,
      date,
      location,
      capacity: parseInt(capacity, 10),
      imageUrl,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Ошибка при создании события:", error);
    throw error;
  }
};

export const getEvents = async () => {
  const eventsCollection = collection(db, "events");
  const eventSnapshot = await getDocs(eventsCollection);
  const eventList = eventSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return eventList;
};






export default app;
