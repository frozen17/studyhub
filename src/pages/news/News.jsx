// NewsList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/Firebase.config";
import { collection, getDocs } from "firebase/firestore";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollection = collection(db, "news");
        const snapshot = await getDocs(newsCollection);
        const newsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNews(newsList);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Загрузка новостей...</p>;
  }

  return (
    <div>
      <h1>Новости</h1>
      {news.length === 0 ? (
        <p>Нет доступных новостей.</p>
      ) : (
        news.map((item) => (
          <div key={item.id} style={styles.newsItem}>
            <h2>{item.title}</h2>
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={styles.image} />}
            <p>{item.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  newsItem: { border: "1px solid #ccc", padding: "16px", marginBottom: "16px", borderRadius: "8px" },
  image: { maxWidth: "100%", height: "auto", marginBottom: "8px" },
};

export default News;
