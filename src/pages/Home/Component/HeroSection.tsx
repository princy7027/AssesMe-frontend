import { motion } from 'framer-motion';
import { IoMdArrowDropright } from "react-icons/io";
import heroImage from "@/assets/homehero.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.3,
                duration: 0.8,
                type: "spring",
                bounce: 0.4
            }
        })
    };

    return (
        <div className="bg-[#FF884D] text-white p-28 top-10 h-1/12">
            <div className="flex mx-[31.667px] px-8 pt-3.5 gap-16">
                <motion.div 
                    className="basis-2/4"
                    initial={{ opacity: 0, x: -100, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                >
                    <motion.h1 
                        custom={0}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-bold my-6 text-5xl text-left font-sans leading-tight"
                    >
                        ASSESS ME
                    </motion.h1>
                    <motion.h1 
                        custom={1}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-semibold my-6 text-4xl text-left font-sans leading-tight"
                    >
                        Smart exam and performance
                        <br /> Analysis.
                    </motion.h1>
                    <motion.p 
                        custom={2}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="leading-6 max-w-[90%] text-xl"
                    >
                        Empowering Smart & Scalable Online Examinations
                    </motion.p>
                    <motion.p 
                        custom={3}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="leading-6 max-w-[90%] text-xl"
                    >
                        AssessMe is an innovative, AI-powered online examination platform designed to make test creation,
                        administration, and performance analysis seamless. Whether you're an educator, corporate trainer, or
                        institution, AssessMe offers a feature-rich environment that enhances the examination process with
                        intelligent automation and security.
                    </motion.p>
                    <motion.div 
                        className="mt-8 mb-3 font-bold flex justify-start items-center gap-x-8 gap-y-5"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                type="submit"
                                onClick={() => navigate("/signup")}
                                className="bg-[#f0acac] px-9 py-4 text-base items-center rounded-full text-center hover:bg-[#FF884D] h-14"
                            >
                                Register yourself
                            </Button>
                        </motion.div>

                        <motion.a 
                            className="text-base items-center text-center hover:text-white h-14 w-60 no-underline flex" 
                            href="/"
                            whileHover={{ x: 10, color: "#ffffff" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Or explore assess me <IoMdArrowDropright />
                        </motion.a>
                    </motion.div>
                </motion.div>
                <motion.div 
                    className="basis-2/4"
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                        duration: 1,
                        type: "spring",
                        bounce: 0.4,
                        delay: 0.5
                    }}
                    whileHover={{ scale: 1.05 }}
                >
                    <img src={heroImage} alt="" />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;