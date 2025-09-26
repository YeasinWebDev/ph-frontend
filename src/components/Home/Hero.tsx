import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br xl:mt-10 xl:rounded-xl from-orange-500 via-orange-400 to-orange-600 text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-80">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" alt="Travel Background" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-6 lg:py-36">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl lg:text-6xl font-bold mb-6 max-w-3xl"
        >
          Plan, Manage & Track Your Tours Seamlessly
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-lg lg:text-xl max-w-2xl mb-10 text-white/90">
          Save time & boost efficiency with smart tour management made easy.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-orange-600 hover:bg-gray-100 cursor-pointer p-2 rounded-md font-semibold text-lg"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-transparent text-white hover:bg-transparent hover:text-orange-500 cursor-pointer border-1 flex items-center gap-2 p-2 rounded-md font-semibold text-lg border-white hover:border-orange-500"
          >
            <Plane className="mr-2 h-4 w-4" /> Book a Demo
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
