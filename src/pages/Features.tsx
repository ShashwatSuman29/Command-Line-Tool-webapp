import React from 'react';
import { Terminal, Code, Database, Clock, Zap, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import CodeBlock from '@/components/CodeBlock';
import CliCommand from '@/components/CliCommand';
import { motion } from 'framer-motion';
import MotionWrapper from '@/components/MotionWrapper';

const Features = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.header 
        className="container mx-auto pt-16 pb-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <MotionWrapper className="flex flex-col items-center text-center" variant="fadeInUp">
          <div className="mb-6 p-3 bg-indigo-900/30 rounded-full">
            <Terminal size={40} className="text-indigo-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Powerful Features
          </h1>
          <p className="text-xl text-white max-w-2xl mb-8">
            DevHelper CLI comes packed with features designed to streamline your development workflow and boost productivity.
          </p>
        </MotionWrapper>
      </motion.header>

      {/* Features Grid */}
      <section className="container mx-auto py-12 px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <MotionWrapper variant="staggered" staggerIndex={0} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
            <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300 h-full">
              <CardHeader>
                <div className="p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Terminal size={24} className="text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Project Generation</CardTitle>
                <CardDescription className="text-slate-300">
                  Generate project boilerplates with a single command
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CliCommand command="devhelper init my-project --template react-ts" />
                <p className="mt-4 text-white">
                  Choose from multiple templates including React, Vue, Node.js, and more.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="staggered" staggerIndex={1} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
            <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300 h-full">
              <CardHeader>
                <div className="p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Code size={24} className="text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Component Generation</CardTitle>
                <CardDescription className="text-slate-300">
                  Generate components with proper structure and imports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CliCommand command="devhelper generate component Button --props='onClick, label'" />
                <p className="mt-4 text-white">
                  Create components with TypeScript interfaces, styling, and tests.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="staggered" staggerIndex={2} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
            <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300 h-full">
              <CardHeader>
                <div className="p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock size={24} className="text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Time Tracking</CardTitle>
                <CardDescription className="text-slate-300">
                  Track time spent on projects and tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CliCommand command="devhelper track --start" />
                <p className="mt-4 text-white">
                  Automatic time tracking with detailed reports and analytics.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="staggered" staggerIndex={3} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
            <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300 h-full">
              <CardHeader>
                <div className="p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Database size={24} className="text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Data Synchronization</CardTitle>
                <CardDescription className="text-slate-300">
                  Sync your projects and time data with the cloud
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CliCommand command="devhelper sync" />
                <p className="mt-4 text-white">
                  Seamless synchronization across multiple devices and team members.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="staggered" staggerIndex={4} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
            <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300 h-full">
              <CardHeader>
                <div className="p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Zap size={24} className="text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Performance Optimization</CardTitle>
                <CardDescription className="text-slate-300">
                  Analyze and optimize your project's performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CliCommand command="devhelper optimize" />
                <p className="mt-4 text-white">
                  Identify performance bottlenecks and get recommendations for improvements.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper variant="staggered" staggerIndex={5} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
            <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300 h-full">
              <CardHeader>
                <div className="p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <GitBranch size={24} className="text-indigo-400" />
                </div>
                <CardTitle className="text-xl text-white">Version Control</CardTitle>
                <CardDescription className="text-slate-300">
                  Integrated version control commands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CliCommand command="devhelper git --commit 'Feature: Add new component'" />
                <p className="mt-4 text-white">
                  Simplified git commands with project-specific configurations.
                </p>
              </CardContent>
            </Card>
          </MotionWrapper>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4 text-center">
        <MotionWrapper variant="fadeInUp" delay={0.3}>
          <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Productivity?</h2>
          <p className="text-xl text-white max-w-2xl mx-auto mb-8">
            Start using DevHelper CLI today and transform your development workflow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MotionWrapper whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-indigo-800 hover:bg-indigo-900">
                Get Started
              </Button>
            </MotionWrapper>
            <MotionWrapper whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-indigo-700 text-indigo-400 hover:bg-black/50">
                View Documentation
              </Button>
            </MotionWrapper>
          </div>
        </MotionWrapper>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 border-t border-slate-800 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400">2025 DevHelper CLI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/ShashwatSuman29" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
