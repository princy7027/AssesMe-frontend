import { motion } from 'framer-motion';
import billingInvoicing from "@/assets/billing-invoicing.avif";
import ranking from "@/assets/ranking-removebg-preview.png";

const UseCase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.6, 0.01, -0.05, 0.95],
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 3
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const textHoverVariants = {
    hover: {
      scale: [1, 1.1, 1] as const,
      color: ["#E57CD8", "#FF884D", "#E57CD8"] as const,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };
  return (
    <>
      <motion.section 
        className="py-20 px-8 text-[#422b72] font-sans bg-[#FDF1EC]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="mx-36 mt-10">
          <motion.div 
            className="mx-48 mb-9 text-center font-sans flex gap-5 flex-col"
            variants={titleVariants}
          >
            <motion.p 
              className="font-semibold text-3xl"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              WHAT'S YOUR USE CASE?
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-10 mt-28">
            <motion.div 
              className="flex gap-18"
              variants={contentVariants}
            >
              <motion.div 
                className="basis-2/3 p-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <motion.p 
                  className="text-3xl font-semibold text-[#E57CD8]"
                  whileHover={{ scale: 1.05 }}
                >
                  Detailed Insights at 
                  <motion.b 
                    className="text-3xl uppercase"
                    whileHover={{ scale: 1.1, color: "#FF884D" }}
                  > assessMe</motion.b>
                </motion.p>

                <motion.div 
                  className="text-xl max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Identify strengths and weaknesses with comprehensive performance reports. Review challenging questions
                  and understand areas needing improvement to enhance learning outcomes.
                </motion.div>
                <motion.p 
                  className="font-bold text-2xl my-4"
                  whileHover={{ scale: 1.05, color: "#E57CD8" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Leaderboard & Rankings
                </motion.p>
                <motion.div 
                  className="text-xl max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Encourage healthy competition with real-time leaderboards. Rank students based on performance and
                  provide motivation for continuous improvement.
                </motion.div>
              </motion.div>
              <motion.div 
                className="basis-2/3 flex justify-center" 
                initial="hidden" 
                animate="visible" 
                whileHover="hover" 
              > 
                <motion.img 
                  src={billingInvoicing} 
                  className="h-96" 
                  alt="none" 
                  animate={{ 
                    scale: [1, 1.02, 1], 
                    transition: { 
                      duration: 3, 
                      ease: "easeInOut", 
                      repeat: Infinity 
                    } 
                  }} 
                /> 
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex gap-20"
              variants={contentVariants}
            >
              <motion.div 
                className="basis-2/3 ml-4 flex"
                variants={imageVariants}
                whileHover="hover"
              >
                <motion.img 
                  src={ranking} 
                  className="h-full w-[190%]" 
                  alt="none"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
              <motion.div 
                className="basis-7/12 p-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <motion.p 
                  className="text-3xl font-semibold text-[#E57CD8] uppercase"
                  whileHover={{ scale: 1.05 }}
                >
                  Discussion Section at 
                  <motion.b 
                    className="text-3xl lowercase"
                    whileHover={{ scale: 1.1, color: "#FF884D" }}
                  >AssessMe</motion.b>
                </motion.p>
                <motion.div 
                  className="text-xl max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Enable post-exam discussions where students can clarify doubts and analyze solutions. With multimedia
                  support, users can upload images and videos for better explanations.
                </motion.div>
                <motion.p 
                  className="font-bold text-2xl my-4"
                  whileHover={{ scale: 1.05, color: "#E57CD8" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Multimedia Support
                </motion.p>
                <motion.div 
                  className="text-xl max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Enhance learning with rich media support. Upload images and videos to questions and answers, making
                  assessments more interactive and engaging.
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default UseCase;