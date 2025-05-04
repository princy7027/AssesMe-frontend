import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.div 
      className="flex items-center justify-center bg-[#FF884D] text-white text-xl h-12"
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }}
      whileHover={{
        scale: 1.02,
        textShadow: "0px 0px 8px rgb(255,255,255)"
      }}
    >
      @ Copyright:AssessMe.com
    </motion.div>
  )
}

export default Footer