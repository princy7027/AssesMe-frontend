import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const SExam = () => {
  const [exams, setExams] = useState([]);
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:3000/exam/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allExams = Array.isArray(res.data) ? res.data : res.data.data;
        const activeExams = allExams.filter((exam) => exam.isActive === true);
        setExams(activeExams);
      } catch (err) {
        console.error("Failed to fetch exams", err);
      }
    };

    fetchExams();
  }, []);

  const handleGiveExam = (examId) => {
    navigate(`/giveExam/${examId}`);
  };

  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Exams</h2>
        {exams.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#FF884D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Active Exams Available</h3>
              <p className="text-gray-600 mb-4">There are currently no active exams for you to take.</p>
              <p className="text-gray-500 text-sm">Please check back later or contact your instructor for more information.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exam.examName}</h3>
                  <p className="text-gray-600 text-sm">Subject: {exam.subject}</p>
                  <p className="text-gray-600 text-sm">Creator name: {exam.createdBy.name}</p>
                  <p className="text-gray-600 text-sm">Total Marks: {exam.totalMarks}</p>
                </div>
                <Button className="bg-[#FF884D]" onClick={() => handleGiveExam(exam._id)}>Give Exam</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SExam;
