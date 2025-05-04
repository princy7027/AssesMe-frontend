import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineUserAdd } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineImportContacts } from "react-icons/md";
import { PiExamBold } from "react-icons/pi";
import { FaBrain } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import PaginationCom from "@/common/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CDashboard = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;
  const name = decodedToken.name;

  const [tableData, setTableData] = useState([]);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/exam/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const activeExams = response.data.data.filter((exam) => exam.isActive === true);
        setTableData(activeExams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentItems = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div 
      className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.h2 
          className="text-xl md:text-2xl font-semibold mb-4 text-orange-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hello <motion.span 
            className="font-bold"
            animate={{ 
              color: ["#FF884D", "#E57CD8", "#FF884D"],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >{name}</motion.span>, welcome to{" "}
          <motion.span 
            className="text-orange-500 font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >AssessMe</motion.span>
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div 
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <div>
              <motion.p 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >Active exam takers</motion.p>
              <motion.h3 
                className="text-4xl font-bold text-[#6985f7]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.5
                }}
              >0</motion.h3>
            </div>
            <div>
              <motion.p 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >Active exams</motion.p>
              <motion.h3 
                className="text-4xl font-bold text-[#6985f7]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.6
                }}
              >1</motion.h3>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow p-4 flex justify-around h-[100px]"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              transition: { duration: 0.3 }
            }}
          >
            {[
              { label: "Exams", value: "1" },
              { label: "Questions", value: "0" },
              { label: "Students", value: "0" }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <motion.p 
                  className="text-sm text-gray-500"
                  whileHover={{ scale: 1.1 }}
                >{item.label}</motion.p>
                <motion.h3 
                  className="text-4xl font-bold text-[#6985f7]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 0.7 + index * 0.1
                  }}
                >{item.value}</motion.h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-white text-black rounded-xl shadow p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ 
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.h3 
            className="text-xl font-semibold mb-4"
            animate={{ 
              color: ["#422b72", "#6985f7", "#422b72"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >Active exams</motion.h3>
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="rounded-xl">
                <tr className="bg-[#e6e1e0] text-left">
                  <th className="p-2">Subject</th>
                  <th className="p-2">Exam titles</th>
                  <th className="p-2">Start date</th>
                  <th className="p-2">End date</th>
                  <th className="p-2">Total marks</th>
                  <th className="p-2">Passing Marks</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((exam, index) => (
                  <motion.tr 
                    className="border-t" 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index }}
                    whileHover={{ 
                      backgroundColor: "#f8f9fc",
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <td className="p-2">{exam.subject}</td>
                    <td className="p-2">{exam.examName}</td>
                    <td className="p-2">{exam.startDate}</td>
                    <td className="p-2">{exam.endDate}</td>
                    <td className="p-2">{exam.totalMarks}</td>
                    <td className="p-2">{exam.passingMarks}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 gap-2 text-sm text-gray-500">
            <PaginationCom
              tableData={tableData}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </motion.div>

        <motion.div 
          className="mb-6 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h3 
            className="text-lg font-semibold mb-4"
            animate={{ 
              color: ["#422b72", "#6985f7", "#422b72"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >Quick actions</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ActionCard icon={<AiOutlinePlus className="text-blue-500 text-2xl"/>} title="Add new exam" onClick={()=>navigate("/creator-exam")}/>
            <ActionCard icon={<FiUpload className="text-orange-500 text-2xl" />} title="Import questions" />
            <ActionCard icon={<FaBrain className="text-blue-500" />} title="AI Generator" />
            <ActionCard icon={<AiOutlineUserAdd className="text-blue-500 text-2xl" />} title="Add students" />
          </div>
        </motion.div>

        <motion.div 
          className="mb-4 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h3 
            className="text-sm text-gray-500 mb-2"
            animate={{ 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >Recently used</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard icon={<PiExamBold className="text-blue-500 text-xl rounded-full" />} title="Exam List" />
            <ActionCard icon={<PiStudentBold className="text-blue-500 text-xl" />} title="Student List" />
            <ActionCard icon={<MdOutlineImportContacts className="text-orange-500 text-xl" />} title="Batch Import" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ActionCard = ({ icon, title, onClick }: any) => (
  <motion.div 
    className="bg-white rounded-xl shadow p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <motion.div 
      className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
      whileHover={{ 
        rotate: 360,
        backgroundColor: "#f0f0f0",
        transition: { duration: 0.5 }
      }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
    <motion.span 
      className="text-sm font-medium"
      whileHover={{ 
        color: "#6985f7",
        scale: 1.05
      }}
    >
      {title}
    </motion.span>
  </motion.div>
);

export default CDashboard;