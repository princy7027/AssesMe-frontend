import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SDashboard from "@/assets/Sdashboard.jpg";
import { useParams } from "react-router-dom";

const SResult_all = () => {
  const { userId, examId } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  //   const userId = decodedToken?.userId;
  //   const examId = decodedToken?.examId;

  useEffect(() => {
    const fetchStudentResult = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/result/student/${userId}/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response, "data of result");

        const { examDetails, resultDetails } = response.data.data;
        const marksPerQuestion = examDetails.totalMarks / examDetails.numberOfQuestions;
        const correctQuestions = resultDetails.obtainedMarks / marksPerQuestion;
        const wrongQuestions = examDetails.numberOfQuestions - correctQuestions;
        
        setStudentInfo({
          name: decodedToken?.name || "Student", // from token
          subject: examDetails.subject,
          totalMarks: examDetails.totalMarks,
          passingMarks: examDetails.passingMarks,
          totalQuestions: examDetails.numberOfQuestions,
          obtainedMarks: resultDetails.obtainedMarks,
          percentage: resultDetails.percentage,
          passStatus: resultDetails.isPassed,
          strongAreas: resultDetails.strongAreas.map((area) => area.questionTopic),
          weakAreasSummary: resultDetails.weakAreas.map((area) => area.questionTopic),
          correctQuestions: correctQuestions,
  wrongQuestions: wrongQuestions,
        });

        setWeakAreas(resultDetails.weakAreas || []);
      } catch (error) {
        console.error("Error fetching student result:", error);
      }
    };

    if (userId && examId) {
      fetchStudentResult();
    }
  }, [userId, examId]);

  return (
    <div className="ml-[230px] p-6 max-w-[calc(100vw-230px)] bg-[#f8f9fc] min-h-screen overflow-y-auto overflow-x-hidden text-[#3d3d3d] font-sans">
      {/* Top Section */}
      <div className="bg-blue-50 rounded-xl p-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <img src={SDashboard} alt="Avatar" className="w-2xs h-48 rounded-full" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Hi {studentInfo?.name || "Loading..."}</h2>
            <p className="text-gray-500">Subject: {studentInfo?.subject}</p>
            <p className="text-gray-500">Total Marks: {studentInfo?.totalMarks}</p>
            <p className="text-gray-500">Passing Marks: {studentInfo?.passingMarks}</p>
            <p className="text-gray-500">Total Questions: {studentInfo?.totalQuestions}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="flex items-center justify-between bg-white text-black rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium">Correct Questions: {studentInfo?.correctQuestions}</p>
            <p className="text-sm mt-1">Wrong Questions : {studentInfo?.wrongQuestions}</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Obtained Marks: {studentInfo?.obtainedMarks}</p>
            <p className="text-sm mt-1 text-gray-600">Percentage: {studentInfo?.percentage}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Pass</p>
            <h2 className={`text-xl font-bold ${studentInfo?.passStatus ? "text-green-600" : "text-red-600"}`}>
              {studentInfo?.passStatus ? "Yes" : "No"}
            </h2>
          </div>
        </div>
      </div>

      {/* Strong & Weak Areas Summary */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex items-center justify-between bg-white text-black rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium">Strong Areas</p>
            <h2 className="text-xl font-bold">{studentInfo?.strongAreas?.join(", ") || "N/A"}</h2>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Weak Areas</p>
            <h2 className="text-xl font-bold text-gray-900">{studentInfo?.weakAreasSummary?.join(", ") || "N/A"}</h2>
          </div>
        </div>
      </div>

      {/* Detailed Weak Areas */}
      <div className="mt-10 bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Weak Areas</h3>
        </div>

        <div className="space-y-4">
          {Array.isArray(weakAreas) && weakAreas.length > 0 ? (
            weakAreas.map((area) => (
              <div key={area._id} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">
                  Q{area.questionNumber}. <span className="font-medium text-gray-700">{area.questionTopic}</span>
                </p>
                <p className="text-base font-semibold text-gray-800 mb-2">{area.questionText}</p>

                <div className="space-y-1 text-sm">
                  <div className="bg-red-50 p-2 rounded-md border-l-4 border-red-400">
                    <span className="font-semibold text-red-600">Your Answer:</span> {area.userAnswer}
                  </div>
                  <div className="bg-green-50 p-2 rounded-md border-l-4 border-green-500">
                    <span className="font-semibold text-green-700">Correct Answer:</span> {area.correctAnswer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No weak areas found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SResult_all;
