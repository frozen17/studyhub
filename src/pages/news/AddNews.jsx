// AddNews.jsx
import React, { useState } from "react";
import { createNews } from "../../firebase/Firebase.config";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNews(title, content, image);
      alert("Новость успешно добавлена!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      alert("Ошибка при добавлении новости.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label htmlFor="title">Заголовок:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="content">Контент:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={styles.textarea}
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="image">Изображение:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
        />
      </div>
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Загрузка..." : "Добавить новость"}
      </button>
    </form>
  );
};

const styles = {
  form: { maxWidth: "400px", margin: "0 auto", padding: "1em", border: "1px solid #ccc", borderRadius: "8px" },
  field: { marginBottom: "1em" },
  input: { width: "100%", padding: "0.5em", fontSize: "1em" },
  textarea: { width: "100%", padding: "0.5em", fontSize: "1em", height: "100px" },
  button: { padding: "0.5em 1em", fontSize: "1em", cursor: "pointer", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "4px" },
};

export default AddNews;
