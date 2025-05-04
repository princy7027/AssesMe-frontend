import React from 'react'
import { motion } from 'framer-motion';
import chartImage from '@/assets/chart-removebg-preview.png'
import computer from '@/assets/computer-removebg-preview.png'
import ai from '@/assets/mind.png'
import timer from '@/assets/timer-removebg-preview.png'

const WhatNew = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  return (
    <div className="py-20 px-8">
      <motion.div 
        className="max-w-6xl my-0 mx-auto mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="flex flex-col gap-5 text-center mx-44 mb-10"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="font-semibold text-5xl text-[#422b72] mb-4">
            What's new at AssessMe?
          </h1>
        </motion.div>

        <div className="mt-8 flex gap-8">
          <motion.div 
            className="flex-1 bg-[#F7D8F3] rounded-xl px-8 pt-8 pb-6 mb-8 flex gap-5 flex-col-reverse justify-between"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <motion.div 
              className="overflow-hidden relative pt-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img className="h-14" src={chartImage} alt="" />
            </motion.div>
            <div className="">
              <motion.h5 
                className="text-[#422b72] font-semibold mb-5 leading-7 text-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Now, after completing an exam, students can view their detailed results with an interactive performance graph.
              </motion.h5>
              <motion.div 
                className="text-[#625480] leading-6 text-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                This feature provides insights into their strengths and weaknesses, helping them track progress effectively. With a clear visual representation of scores, students can analyze their performance subject-wise and improve for future assessments. 🚀📊
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 bg-[#FDEAE2] rounded-xl px-8 pt-8 pb-6 mb-8 flex gap-5 flex-col-reverse justify-between"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <motion.div 
              className="overflow-hidden relative pt-2 grid grid-cols-7"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img className="h-14" src={computer} alt="" />
              <img className="h-14" src={ai} alt="" />
              <img className="h-14" src={timer} alt="" />
            </motion.div>
            <div className="">
              <motion.h5 
                className="text-[#422b72] font-semibold mb-5 leading-7 text-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Exciting new updates in Assess Me!
              </motion.h5>
              <motion.div 
                className="text-[#625480] leading-6 text-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                creators can generate questions using AI, making exam creation faster and more efficient. Simply enter a topic, and AI will generate relevant questions instantly. Plus, set a timer for each exam to ensure a structured and time-bound assessment experience. These features make exam management seamless and more engaging! 🚀⏳🤖
              </motion.div>
              <motion.a
                href=""
                className="text-[#422b72] mt-6 inline-block font-semibold"
                whileHover={{ scale: 1.1, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Invite your team to track time
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default WhatNew