import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { db } from "../../../firebase/Firebase.config";
import { collection, getDocs } from "firebase/firestore";

const UserEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Ошибка при загрузке событий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Загрузка событий...</div>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl text-gray-600">События не найдены.</h2>
      </div>
    );
  }

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Stay updated with the latest campus events and activities
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      event.image ||
                      "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={event.title}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{event.date || "Дата не указана"}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{event.location || "Местоположение не указано"}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-5 w-5 mr-2" />
                      <span>
                        Capacity: {event.capacity || "Не указано"}
                      </span>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserEvent;
