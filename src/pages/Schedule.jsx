import React, { useEffect, useState } from "react";
import { db } from "../firebase/Firebase.config";
import { doc, getDoc } from "firebase/firestore";

const Schedule = ({ group, isAdmin }) => {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const docRef = doc(db, "schedules", group);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSchedule(docSnap.data());
        } else {
          console.log("No schedule found!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule: ", error);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [group]);

  if (loading) return <p>Loading schedule...</p>;

  return (
    <div>
      <h2>Schedule for Group {group}</h2>
      {Object.keys(schedule).map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Room</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {schedule[day].map((lesson, index) => (
                <tr key={index}>
                  <td>{lesson.time}</td>
                  <td>{lesson.subject}</td>
                  <td>{lesson.teacher}</td>
                  <td>{lesson.room}</td>
                  {isAdmin && (
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
