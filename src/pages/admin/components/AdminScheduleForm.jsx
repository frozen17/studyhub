import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/Firebase.config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

const AdminScheduleForm = () => {
    const times = ["10:00-11:20", "11:30-12:50", "13:20-14:40", "14:50-16:10", "16:20-17:40"];
    const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
    const groups = ["CS-11-24", "CS-12-24", "CS-13-24", "CS-14-24", "CS-15-24", "CS-16-24"];
  
    return (
      <div className="p-4">
        <div className="text-center font-bold text-xl mb-4">Расписание занятий на 2024-2025 учебный год</div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-max">
            <thead>
              <tr>
                <th className="border p-2">Пара/Время</th>
                {groups.map(group => (
                  <th key={group} className="border p-2 min-w-[200px]">{group}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <React.Fragment key={day}>
                  <tr>
                    <td colSpan={groups.length + 1} className="border p-2 font-bold">
                      {day}
                    </td>
                  </tr>
                  {times.map((time, timeIndex) => (
                    <tr key={`${day}-${time}`}>
                      <td className="border p-2 whitespace-nowrap">{`${timeIndex + 1}) ${time}`}</td>
                      {groups.map(group => (
                        <td key={`${day}-${time}-${group}`} className="border p-2 text-sm">
                          <div className="min-h-[60px]">
                            {/* Example lesson data */}
                            <div className="font-medium">Введение в компьютерную науку</div>
                            <div className="">преп. Бейшеналиева А.Ж.</div>
                            <div className="">каб. 203</div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AdminScheduleForm;
