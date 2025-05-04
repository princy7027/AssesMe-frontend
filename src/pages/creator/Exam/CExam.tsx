import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FaBrain } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoIosListBox } from "react-icons/io";
import ExamForm from "./ExamForm";
import axios from "axios";
import { toast } from 'sonner'

const CExam = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [questionType, setQuestionType] = useState("MCQ");
  const [step, setStep] = useState(1);

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [topicName, setTopicName] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const maxQuestions = parseInt(sessionStorage.getItem("maxQuestions") || "0");
  const [questions, setQuestions] = useState([]);

  const examId = sessionStorage.getItem("id");
  const examName = sessionStorage.getItem("examName");
  const token = sessionStorage.getItem("token");

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/exam/create-exam", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.success) {
      
        sessionStorage.setItem("maxQuestions", response.data.data.numberOfQuestions);
        sessionStorage.setItem("id", response.data.data._id);
        sessionStorage.setItem("examName", response.data.data.examName);
        setStep(3);
      } else {
        console.warn("Submission failed:", response.data?.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.", );
    }
  };

  const handleNextQuestion = () => {
    let queType = "MCQ";
    let optionsArray = [];
    let correctAns = "";

    if (questionType === "MCQ") {
      optionsArray = options;
      correctAns = correctAnswer;
    } else if (questionType === "truefalse") {
      correctAns = trueFalseAnswer === "true" ? "True" : "False";
      optionsArray = ["True", "False"];
    } else if (questionType === "short") {
      queType = "ShortAnswer";
      correctAns = shortAnswer;
    }

    const questionDataItem = {
      questionTopic: topicName,
      questionText,
      queType,
      correctAnswer: correctAns,
    };

    if (queType === "MCQ") {
      questionDataItem.options = optionsArray;
    }

    setAllQuestions((prev) => [...prev, questionDataItem]);
    setQuestionCount((prev) => prev + 1);

    // reset form
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setShortAnswer("");
    setTrueFalseAnswer("");
    setTopicName("");
  };

  const handleGenerateQuestions = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/ai-question/generate-ai`,
        {
          examId: examId,
          numberOfQuestions: maxQuestions,
          topic: examName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
      setQuestions(response.data.data); // Set the response data to the questions state
    } catch (error) {
      console.error("Error generating questions:", error);
    }
  };

  const handleSaveAll = async () => {
    const payload = {
      examId,
      questionData: allQuestions,
    };

    try {
      const response = await axios.post(`http://localhost:3000/question/create/${examId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data) {
        alert("All questions saved successfully.");
        setStep(1);
      } else {
        alert("Failed to save questions");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };
  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="mt-10">
        {/* Choice */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div
              onClick={() => {
                setSelectedChoice("manual");
                setStep(2);
              }}
              className="bg-white rounded-xl shadow p-4  flex gap-8 items-center justify-center"
            >
              <div className="flex  items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <IoIosListBox className="text-orange-500 text-2xl" />{" "}
              </div>
              <p className="text-xl text-gray-500 font-bold">Generate question manually</p>
            </div>

            {/* <div
              onClick={() => {
                setSelectedChoice("file");
                setStep(2);
              }}
              className="bg-white rounded-xl shadow p-4  flex gap-8 items-center justify-center"
            >
              <div className="flex  items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <FiUpload className="text-orange-500 text-2xl" />{" "}
              </div>
              <p className="text-xl text-gray-500 font-bold">Generate through file</p>
            </div> */}
            <div
              onClick={() => {
                setSelectedChoice("ai");
                setStep(2);
              }}
              className="bg-white rounded-xl shadow p-4  flex gap-8 items-center justify-center"
            >
              <div className="flex  items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <FaBrain className=" text-blue-500 text-xl" />
              </div>
              <p className="text-xl text-gray-500 font-bold">Generate through ai</p>
            </div>
          </div>
        )}

        {step === 2 && <ExamForm onSubmit={handleSubmit} />}
        {step === 3 && selectedChoice === "manual" && (
          <div className="bg-white shadow rounded-xl p-6 flex text-black">
            <div className="w-1/4 pr-6 bg-[#FFF4EE] p-2.5 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Question types</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="MCQ"
                    checked={questionType === "MCQ"}
                    onChange={() => setQuestionType("MCQ")}
                  />
                  <span>MCQ</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="truefalse"
                    checked={questionType === "truefalse"}
                    onChange={() => setQuestionType("truefalse")}
                  />
                  <span>True or False</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="short"
                    checked={questionType === "short"}
                    onChange={() => setQuestionType("short")}
                  />
                  <span>Short Answer</span>
                </label>
              </div>
            </div>

            <div className="w-3/4 pl-6">
              <h3 className="text-lg font-semibold mb-4">Enter Question</h3>
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter Question"
                className="w-full mb-4 p-2 border rounded"
              />

              {questionType === "MCQ" &&
                options.map((opt, index) => (
                  <input
                    key={index}
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="w-full mb-2 p-2 border rounded"
                  />
                ))}
              {questionType === "MCQ" && (
                <input
                  type="text"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeholder="Correct Answer"
                  className="w-full mb-2 p-2 border rounded"
                />
              )}

              {questionType === "truefalse" && (
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="truefalse"
                      value="true"
                      onChange={(e) => setTrueFalseAnswer(e.target.value)}
                    />
                    <span>True</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="truefalse"
                      value="false"
                      onChange={(e) => setTrueFalseAnswer(e.target.value)}
                    />
                    <span>False</span>
                  </label>
                </div>
              )}

              {questionType === "short" && (
                <input
                  type="text"
                  value={shortAnswer}
                  onChange={(e) => setShortAnswer(e.target.value)}
                  placeholder="Expected Answer"
                  className="w-full mb-4 p-2 border rounded"
                />
              )}

              <label className="block mb-2 font-medium">Topic name :</label>
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />

              {questionCount < maxQuestions && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              )}

              {questionCount === maxQuestions && (
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  onClick={handleSaveAll}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}

        {step === 3 && selectedChoice === "ai" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left side - Prompt input */}
            <div className="bg-gray-100 p-6 rounded-xl space-y-4 shadow-md">
              <h3 className="text-orange-500 font-semibold">Generate by topic</h3>
              <p className="text-sm text-muted-foreground">
                This method is suitable for exam organizers who want to create an assessment for a specific topic. You
                can generate questions based on keywords and descriptions in up to 30 most spoken languages in the
                world.
                <br />
                <span className="italic">Ex: "Topic : Networking Question : 5"</span>
              </p>
              <div className="flex flex-col">
                {" "}
                {/* Change flex-row to flex-col */}
                <input type="text" value={examName} disabled className="border rounded-lg px-4 py-2 mt-2 text-black" />
                <input
                  type="number"
                  value={maxQuestions} // Set value to maxQuestions from sessionStorage
                  disabled
                  className="border rounded-lg px-4 py-2 mt-2 text-black bg-gray-200 cursor-not-allowed"
                />
              </div>

              <button
                onClick={handleGenerateQuestions}
                className="bg-orange-500 text-white px-4 py-2 rounded-md w-full"
              >
                Generate question
              </button>
            </div>

            {/* Right side - Preview area */}
            <div className="bg-white border rounded-xl p-6 shadow-md space-y-4">
              <div className="text-sm text-muted-foreground border-b pb-2">
                <strong>Generate preview area</strong> – Due to the limitation of the AI model, some test questions may
                not be recognized. Please check whether the recognized test questions are correct.
              </div>

              {questions && questions.length > 0 ? (
                questions.map((q, index) => (
                  <div key={q._id} className="space-y-2 text-gray-700">
                    <p className="font-semibold">
                      {q.questionNumber}. {q.queType === "MCQ" ? "Multiple Choice" : q.queType}: {q.questionText} (
                      {q.questionTopic})
                    </p>
                    <div className="space-y-2 mt-4">
                      {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input type="radio" name={`question-${q._id}`} className="accent-orange-500" />
                          <label className="text-sm">{option}</label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-green-600">
                      <strong>Correct Answer:</strong> {q.correctAnswer}
                    </div>
                  </div>
                ))
              ) : (
                <p>No questions available. Please generate questions first.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CExam;
