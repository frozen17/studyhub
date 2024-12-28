import React, { useState } from "react";
import { createEvent } from "../../../firebase/Firebase.config";

const AdminEventForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [useFile, setUseFile] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createEvent(title, date, location, capacity, useFile ? imageFile : imageUrl);
      alert("Событие успешно добавлено!");
      setTitle("");
      setDate("");
      setLocation("");
      setCapacity("");
      setImageFile(null);
      setImageUrl("");
    } catch (error) {
      alert("Ошибка при добавлении события.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Добавить Событие</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="title" style={styles.label}>Название события:</label>
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
          <label htmlFor="date" style={styles.label}>Дата:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="location" style={styles.label}>Локация:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="capacity" style={styles.label}>Вместимость:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Выберите изображение:</label>
          <div style={styles.radioContainer}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="imageOption"
                value="file"
                checked={useFile}
                onChange={() => setUseFile(true)}
              />
              Загрузить с устройства
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="imageOption"
                value="url"
                checked={!useFile}
                onChange={() => setUseFile(false)}
              />
              Использовать ссылку
            </label>
          </div>
        </div>
        {useFile ? (
          <div style={styles.field}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
          </div>
        ) : (
          <div style={styles.field}>
            <input
              type="text"
              placeholder="Ссылка на изображение"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={styles.input}
            />
          </div>
        )}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Загрузка..." : "Добавить событие"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2em auto",
    padding: "1.5em",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5em",
    marginBottom: "1em",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
  },
  label: {
    fontSize: "1em",
    color: "#555",
  },
  input: {
    padding: "0.8em",
    fontSize: "1em",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  inputFocus: {
    borderColor: "#007BFF",
  },
  fileInput: {
    fontSize: "1em",
    padding: "0.5em",
  },
  radioContainer: {
    display: "flex",
    gap: "1em",
  },
  radioLabel: {
    fontSize: "1em",
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
  },
  button: {
    padding: "0.8em",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};
export default AdminEventForm;
