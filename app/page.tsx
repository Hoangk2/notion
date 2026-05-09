
"use client";
import React from 'react';
import { FileText, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import NewDocumentButton from "@/components/NewDocumentButton";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={`min-h-screen w-full ${theme === "dark" ? "bg-[#020817] text-white" : "bg-gradient-to-b from-white to-gray-50"}`}>
      <div className="relative w-full">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 -left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 -right-10 w-48 h-48 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-10 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center mb-8 md:mb-16"
            variants={itemVariants}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4 md:mb-6 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Digital Workspace
            </motion.h1>
            <motion.p
              className={`text-lg sm:text-xl md:text-2xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-6 md:mb-8 max-w-3xl mx-auto px-4`}
              variants={itemVariants}
            >
              Transform your ideas into reality with our powerful collaborative platform
            </motion.p>
            <motion.div
              className="flex justify-center items-center px-4"
              variants={itemVariants}
            >
              <NewDocumentButton />
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 px-4"
            variants={containerVariants}
          >
            <FeatureCard
              icon={<FileText className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />}
              title="Rich Document Editing"
              description="Create and edit documents with a powerful collaborative editor that brings your ideas to life."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />}
              title="Real-time Collaboration"
              description="Work seamlessly with your team in real-time. Share, edit, and create together."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 md:h-8 md:w-8 text-pink-500" />}
              title="Smart Features"
              description="Leverage AI-powered features to enhance your productivity and creativity."
              gradient="from-pink-500 to-orange-500"
            />
          </motion.div>

          {/* Stats Section - Improved grid and spacing */}
          <motion.div
            className="mt-12 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4"
            variants={containerVariants}
          >
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Documents Created", value: "100K+" },
              { label: "Team Collaborations", value: "50K+" },
              { label: "Countries", value: "150+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-lg bg-opacity-5 backdrop-blur-sm"
                variants={itemVariants}
              >
                <div className={`text-xl md:text-3xl font-bold mb-1 md:mb-2 ${theme === "dark" ? "text-white" : "text-[#020817]"}`}>
                  {stat.value}
                </div>
                <div className={`text-sm md:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`p-4 md:p-6 rounded-xl ${theme === "dark" ? "bg-gray-800/50" : "bg-white"} shadow-xl backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg mb-3 md:mb-4 flex items-center justify-center bg-gradient-to-r ${gradient} bg-opacity-10`}>
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{title}</h3>
      <p className={`text-sm md:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        {description}
      </p>
    </motion.div>
  );
}