import { useEffect, useState } from "react";
import axios from "axios";
import { FiInfo } from "react-icons/fi";
import { Briefcase, CreditCard, Wallet } from "lucide-react";
import CDashboard from "@/assets/Cdashboard.jpg";
import { useParams } from "react-router-dom"; // to get examId from URL

const CLeaderBoard = () => {
  const { examId } = useParams(); // assuming route is something like /result/:examId
  const [studentInfo, setStudentInfo] = useState(null);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/result/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("res", res.data);

        const data = res.data.data;

        // You can optionally find the current logged-in student here if needed.
        const currentStudent = data.studentPerformance[0]; // or based on token/user context

        // setStudentInfo({
        //   name: currentStudent.studentName,
        //   obtainedMarks: currentStudent.marks,
        //   percentage: currentStudent.percentage,
        //   passStatus: currentStudent.status === "PASSED",
        //   subject: data.examDetails.subject,
        //   totalMarks: data.examDetails.totalMarks,
        //   passingMarks: data.examDetails.passingMarks,
        //   totalQuestions: data.examDetails.numberOfQuestions,
        //   highestMarks: data.resultsSummary.highestMarks,
        //   lowestMarks: data.resultsSummary.lowestMarks,
        //   strongAreas: [], // Populate if available from API
        //   weakAreasSummary: [], // Populate if available from API
        // });
      } catch (error) {
        console.error("Failed to fetch result:", error);
      }
    };

    fetchResultData();
  }, [examId]);
  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto text-[#3d3d3d] font-sans">
      {/* Top Section */}
      <div>
        sectiononly
      </div>
      {/* <div className="bg-white rounded-xl p-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <img src={CDashboard} alt="Avatar" className="w-32 h-32 rounded-full" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Hi {studentInfo.name}</h2>
            <p className="text-gray-500">Subject: {studentInfo.subject}</p>
            <p className="text-gray-500">Total Marks: {studentInfo.totalMarks}</p>
            <p className="text-gray-500">Passing Marks: {studentInfo.passingMarks}</p>
            <p className="text-gray-500">Total Questions: {studentInfo.totalQuestions}</p>
          </div>
        </div>
      </div> */}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Highest / Lowest Marks */}
        {/* <div className="flex items-center justify-between bg-yellow-400 text-black rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium">Highest Marks</p>
            <h2 className="text-xl font-bold">{studentInfo.highestMarks}</h2>
            <p className="text-sm mt-1">Lowest Marks: {studentInfo.lowestMarks}</p>
          </div>
          <Wallet className="w-6 h-6 text-purple-700" />
        </div> */}

        {/* Obtained Marks / Percentage */}
        {/* <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Obtained Marks</p>
            <h2 className="text-xl font-bold text-gray-900">{studentInfo.obtainedMarks}</h2>
            <p className="text-sm mt-1 text-gray-600">Percentage: {studentInfo.percentage}%</p>
          </div>
          <CreditCard className="w-6 h-6 text-purple-400" />
        </div> */}

        {/* Pass Status */}
        {/* <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Pass</p>
            <h2 className="text-xl font-bold text-gray-900">{studentInfo.passStatus ? "Yes" : "No"}</h2>
          </div>
          <Briefcase className="w-6 h-6 text-purple-400" />
        </div> */}
      </div>

      {/* Areas - Strong and Weak */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Strong Areas */}
        {/* <div className="flex items-center justify-between bg-white text-black rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium">Strong Areas</p>
            <h2 className="text-xl font-bold">{studentInfo.strongAreas?.join(", ") || "N/A"}</h2>
          </div>
        </div> */}

        {/* Weak Areas Summary */}
        {/* <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Weak Areas</p>
            <h2 className="text-xl font-bold text-gray-900">{studentInfo.weakAreasSummary?.join(", ") || "N/A"}</h2>
          </div>
        </div> */}
      </div>

      {/* Detailed Weak Areas List */}
      {/* <div className="mt-10 bg-white rounded-xl p-6 shadow-md">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold text-gray-800">Weak Areas</h3>
  </div>

  <div className="space-y-4">
    {weakAreas?.length > 0 ? (
      weakAreas.map((area) => (
        <div key={area._id} className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">
            Q{area.questionNumber}.{" "}
            <span className="font-medium text-gray-700">{area.questionTopic}</span>
          </p>

          <p className="text-base font-semibold text-gray-800 mb-2">
            {area.questionText}
          </p>

          <div className="space-y-1 text-sm">
            <div className="bg-red-50 p-2 rounded-md border-l-4 border-red-400">
              <span className="font-semibold text-red-600">Your Answer:</span>{" "}
              {area.userAnswer}
            </div>
            <div className="bg-green-50 p-2 rounded-md border-l-4 border-green-500">
              <span className="font-semibold text-green-700">Correct Answer:</span>{" "}
              {area.correctAnswer}
            </div>
          </div>

          <a href="#" className="text-purple-500 text-sm flex items-center space-x-1 mt-3">
            <FiInfo />
            <span>More information</span>
          </a>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No weak areas found.</p>
    )}
  </div>
</div> */}
    </div>
  );
};

export default CLeaderBoard;
