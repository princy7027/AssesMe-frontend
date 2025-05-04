import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StudentExamList = () => {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  // 👇 Decode token to get user ID
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?._id;

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/exam/student-results/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("data", response.data);

        const exams = response.data?.data?.examResults || [];
        setExamList(exams);
      } catch (error) {
        console.error("Failed to fetch student exams", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchExams(); 
  }, [userId, token]);

  const handleDiscussionNavigate = (examId, examName) => {
    sessionStorage.setItem('examName', examName);
    navigate(`/std-discussion/${examId}`);
  };
  

  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="p-3.5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Completed Exams</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF884D]"></div>
          </div>
        ) : examList.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#FF884D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Exams Attempted Yet</h3>
              <p className="text-gray-600 mb-4">You haven't completed any exams so far.</p>
              <Button 
                className="bg-[#FF884D] hover:bg-[#e67a45]"
                onClick={() => navigate('/std-exam')}
              >
                Browse Available Exams
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {examList.map((exam) => (
              <div
                key={exam.examDetails.examId}
                className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{exam.examDetails?.examName}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          Subject: {exam.examDetails?.subject}
                        </span>
                        {/* <span className="px-2 py-1 bg-[#ffeee5] text-[#FF884D] text-xs rounded-full">
                          Score: {exam.score || "N/A"}
                        </span> */}
                      </div>
                      <p className="text-sm text-gray-500">
                        Completed on: {new Date(exam.resultDetails.submittedAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleDiscussionNavigate(exam.examDetails.examId,exam.examDetails.examName)}
                        className="flex items-center gap-2 bg-[#FF884D] text-white hover:bg-[#e67a45]"
                      >
                        <MessageCircle className="w-4 h-4" /> Discussion
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentExamList;
