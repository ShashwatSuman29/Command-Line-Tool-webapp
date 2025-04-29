import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, Code, Database, Search, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CodeBlock from '@/components/CodeBlock';
import CliCommand from '@/components/CliCommand';
import ProjectStructure from '@/components/ProjectStructure';
import FeatureCard from '@/components/FeatureCard';
import CommandInfo from '@/components/CommandInfo';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { downloadCliInstaller } from '@/utils/download';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedTerminal from '@/components/AnimatedTerminal';
import MotionWrapper from '@/components/MotionWrapper';
import { motion } from 'framer-motion';

// Define project structures with proper types
const projectStructure = [
  {
    name: 'devhelper-cli/',
    type: 'folder' as const,
    children: [
      {
        name: 'bin/',
        type: 'folder' as const,
        children: [
          { name: 'devhelper.js', type: 'file' as const }
        ]
      },
      {
        name: 'commands/',
        type: 'folder' as const,
        children: [
          { name: 'login.js', type: 'file' as const },
          { name: 'create-project.js', type: 'file' as const },
          { name: 'sync.js', type: 'file' as const },
          { name: 'track.js', type: 'file' as const }
        ]
      },
      {
        name: 'services/',
        type: 'folder' as const,
        children: [
          { name: 'api.js', type: 'file' as const },
          { name: 'config.js', type: 'file' as const }
        ]
      },
      {
        name: 'utils/',
        type: 'folder' as const,
        children: [
          { name: 'configManager.js', type: 'file' as const },
          { name: 'logger.js', type: 'file' as const }
        ]
      },
      { name: 'package.json', type: 'file' as const }
    ]
  }
];

const backendStructure = [
  {
    name: 'backend/',
    type: 'folder' as const,
    children: [
      {
        name: 'models/',
        type: 'folder' as const,
        children: [
          { name: 'User.js', type: 'file' as const },
          { name: 'Project.js', type: 'file' as const },
          { name: 'TimeLog.js', type: 'file' as const }
        ]
      },
      {
        name: 'routes/',
        type: 'folder' as const,
        children: [
          { name: 'auth.js', type: 'file' as const },
          { name: 'projects.js', type: 'file' as const },
          { name: 'time.js', type: 'file' as const }
        ]
      },
      {
        name: 'middleware/',
        type: 'folder' as const,
        children: [
          { name: 'auth.js', type: 'file' as const },
          { name: 'validation.js', type: 'file' as const }
        ]
      },
      { name: 'server.js', type: 'file' as const },
      { name: 'package.json', type: 'file' as const },
      { name: '.env', type: 'file' as const }
    ]
  }
];

const Index = () => {
  const { toast } = useToast();
  const { user, isLoggedIn } = useAuth();
  const [activeProject, setActiveProject] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const [projectCreated, setProjectCreated] = useState(false);
  const navigate = useNavigate();

  // Reset project state when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setActiveProject("");
      setProjectCreated(false);
      setIsTracking(false);
      setTrackingTime(0);
    }
  }, [isLoggedIn]);

  // Mock functions to simulate CLI tool functionality
  const handleProjectCreation = () => {
    toast({
      title: "Project Created",
      description: "Project 'my-awesome-app' has been created successfully!",
      duration: 3000
    });
    setProjectCreated(true);
    setActiveProject("my-awesome-app");
  };

  const handleTrackStart = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please login first to track project time",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    if (!activeProject) {
      toast({
        title: "No Active Project",
        description: "Please create or select a project first",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsTracking(true);
    toast({
      title: "Time Tracking Started",
      description: `Now tracking time for project: ${activeProject}`,
      duration: 3000
    });
    
    // Start counting time
    const interval = setInterval(() => {
      setTrackingTime(prev => prev + 1);
    }, 1000);
    
    // Store interval ID in component instance
    return () => clearInterval(interval);
  };

  const handleTrackStop = () => {
    setIsTracking(false);
    toast({
      title: "Time Tracking Stopped",
      description: `Tracked ${formatTime(trackingTime)} for project: ${activeProject}`,
      duration: 3000
    });
  };

  const handleSync = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please login first to sync data",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    toast({
      title: "Data Synchronized",
      description: "Project data has been synced with the cloud",
      duration: 3000
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="relative py-20 overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="text-center lg:text-left lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              <MotionWrapper variant="fadeIn" duration={0.8}>
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  DevHelper CLI
                </h1>
              </MotionWrapper>
              
              <MotionWrapper variant="fadeInUp" delay={0.2} duration={0.7}>
                <p className="text-xl text-white mb-8 max-w-xl mx-auto lg:mx-0">
                  A full-stack command-line utility for developers to generate boilerplate code, manage projects, track time, and sync with a backend API.
                </p>
              </MotionWrapper>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <MotionWrapper variant="fadeInUp" delay={0.4} duration={0.5} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="bg-indigo-800 hover:bg-indigo-900"
                    onClick={() => {
                      downloadCliInstaller();
                      toast({
                        title: "Download Started",
                        description: "Your DevHelper CLI installer download has started.",
                        duration: 3000
                      });
                    }}
                  >
                    Install Now
                  </Button>
                </MotionWrapper>
                
                <MotionWrapper variant="fadeInUp" delay={0.5} duration={0.5} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    className="border-indigo-700 text-indigo-400 hover:bg-black/50"
                    onClick={() => {
                      navigate('/documentation');
                    }}
                  >
                    View Documentation
                  </Button>
                </MotionWrapper>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
            >
              <AnimatedTerminal className="w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Try It Now</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="bg-black border-slate-800">
            <CardHeader>
              <CardTitle className="text-indigo-400">Interactive Demo</CardTitle>
              <CardDescription className="text-slate-400">
                Experience DevHelper CLI functionality directly in your browser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Button 
                  disabled={true} 
                  className="w-full bg-indigo-800 hover:bg-indigo-900 disabled:opacity-50"
                >
                  {isLoggedIn ? `Logged in as ${user?.email}` : "$ devhelper login (Use the Sign In button in navbar)"}
                </Button>
                
                <Button 
                  onClick={handleProjectCreation} 
                  disabled={!isLoggedIn || projectCreated}
                  className="w-full bg-indigo-800 hover:bg-indigo-900 disabled:opacity-50"
                >
                  {projectCreated 
                    ? "Project 'my-awesome-app' created" 
                    : "$ devhelper create-project --name my-awesome-app --template react"}
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleTrackStart} 
                    disabled={isTracking || !isLoggedIn || !activeProject}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    $ devhelper track start
                  </Button>
                  <Button 
                    onClick={handleTrackStop} 
                    disabled={!isTracking}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50"
                  >
                    $ devhelper track stop
                  </Button>
                </div>
                
                <Button 
                  onClick={handleSync} 
                  disabled={!isLoggedIn}
                  className="w-full bg-indigo-800 hover:bg-indigo-900 disabled:opacity-50"
                >
                  $ devhelper sync
                </Button>
              </div>
              
              {isLoggedIn && activeProject && (
                <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                  <h3 className="text-md font-semibold mb-2">Project Status:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><span className="text-slate-400">Project:</span> {activeProject}</p>
                    <p><span className="text-slate-400">Status:</span> {isTracking ? "Active" : "Idle"}</p>
                    {isTracking && (
                      <p><span className="text-slate-400">Time Tracked:</span> {formatTime(trackingTime)}</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Start</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <CliCommand 
            command="npm install -g devhelper-cli" 
            description="Install the CLI globally" 
          />
          <CliCommand 
            command="devhelper login" 
            description="Login to your account" 
            output="✓ Successfully logged in as user@example.com" 
          />
          <CliCommand 
            command="devhelper create-project --name my-awesome-app --template react" 
            description="Create a new project" 
            output="✓ Project created successfully at ./my-awesome-app" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Terminal size={24} />}
            title="CLI Tool"
            description="Powerful command-line interface"
          >
            <p>Manage projects, generate boilerplate code, and track time directly from your terminal.</p>
            <div className="mt-4 text-sm bg-black p-3 rounded">
              <code className="text-green-300">$ devhelper create-project</code>
            </div>
          </FeatureCard>
          
          <FeatureCard
            icon={<Database size={24} />}
            title="Express + MongoDB Backend"
            description="Robust API architecture"
          >
            <p>Secure REST API powered by Express with MongoDB storage for reliable data persistence and access.</p>
            <div className="mt-4 text-sm bg-black p-3 rounded">
              <code className="text-blue-300">$ devhelper sync --all</code>
            </div>
          </FeatureCard>
          
          <FeatureCard
            icon={<Clock size={24} />}
            title="Time Tracking"
            description="Track development progress"
          >
            <p>Start/stop timers for project work and easily sync progress with the cloud dashboard.</p>
            <div className="mt-4 text-sm bg-black p-3 rounded">
              <code className="text-indigo-300">$ devhelper track start</code>
            </div>
          </FeatureCard>
        </div>
      </section>

      {/* CLI Commands Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">CLI Commands</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <CommandInfo
            name="login"
            description="Login to your DevHelper account"
            usage="devhelper login"
            example="devhelper login"
            output="? Email: user@example.com\n? Password: ********\n✓ Successfully logged in!"
          />
          
          <CommandInfo
            name="create-project"
            description="Create a new project from template"
            usage="devhelper create-project --name <name> --template <template>"
            options={[
              { flag: "--name", description: "Name of the project", required: true },
              { flag: "--template", description: "Template to use (react, express, next)", required: false },
              { flag: "--path", description: "Custom installation path", required: false }
            ]}
            example="devhelper create-project --name blog --template next"
            output="✓ Creating project 'blog'\n✓ Using next.js template\n✓ Project created successfully at ./blog"
          />
          
          <CommandInfo
            name="track"
            description="Track time spent on projects"
            usage="devhelper track <start|stop|status>"
            options={[
              { flag: "start", description: "Start tracking time for current project", required: false },
              { flag: "stop", description: "Stop tracking time", required: false },
              { flag: "status", description: "Show current tracking status", required: false }
            ]}
            example="devhelper track start --project blog"
            output="✓ Started tracking time for project 'blog'\n✓ Use 'devhelper track stop' to stop tracking"
          />
          
          <CommandInfo
            name="sync"
            description="Synchronize project data with cloud"
            usage="devhelper sync [--all]"
            options={[
              { flag: "--all", description: "Sync all projects", required: false },
              { flag: "--force", description: "Force sync and override conflicts", required: false }
            ]}
            example="devhelper sync --all"
            output="✓ Syncing all projects...\n✓ Uploaded time logs for 'blog'\n✓ Uploaded config for 'website'\n✓ All projects synced successfully!"
          />
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="container mx-auto py-16 px-4 bg-black/80 rounded-lg my-12">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <Tabs defaultValue="cli" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="cli">CLI Code</TabsTrigger>
            <TabsTrigger value="backend">Backend API</TabsTrigger>
            <TabsTrigger value="structure">Project Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="cli">
            <CodeBlock 
              language="javascript"
              title="devhelper.js - CLI Entry Point"
              code={`#!/usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");
const chalk = require("chalk");
const createCommand = require("../commands/createProject");
const loginCommand = require("../commands/login");
const trackCommand = require("../commands/track");
const syncCommand = require("../commands/sync");

const program = new Command();

console.log(chalk.cyan(figlet.textSync("DevHelper CLI")));

program.version("1.0.0").description("DevHelper CLI Tool");

program
  .command("login")
  .description("Login to DevHelper")
  .action(loginCommand);

program
  .command("create-project")
  .description("Create a new boilerplate project")
  .option("-n, --name <name>", "Project name")
  .option("-t, --template <template>", "Template to use")
  .option("-p, --path <path>", "Custom installation path")
  .action(createCommand);

program
  .command("track <action>")
  .description("Track time spent on projects")
  .option("-p, --project <project>", "Project to track time for")
  .action(trackCommand);

program
  .command("sync")
  .description("Sync project data with cloud")
  .option("-a, --all", "Sync all projects")
  .option("-f, --force", "Force sync and override conflicts")
  .action(syncCommand);

program.parse(process.argv);`}
            />
          </TabsContent>

          <TabsContent value="backend">
            <CodeBlock 
              language="javascript"
              title="auth.js - Backend Authentication Route"
              code={`const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  const newUser = new User({ email, password: hashed });
  await newUser.save();
  res.status(201).json({ message: "Registered" });
});

module.exports = router;`}
            />
            
            <CodeBlock 
              language="javascript"
              title="time.js - Time Tracking Route"
              code={`const express = require("express");
const router = express.Router();
const TimeLog = require("../models/TimeLog");
const auth = require("../middleware/auth");

// Start time tracking for a project
router.post("/start", auth, async (req, res) => {
  const { projectId } = req.body;
  
  // Check if there's already an active session
  const activeSession = await TimeLog.findOne({ 
    userId: req.user.id,
    endTime: null
  });
  
  if (activeSession) {
    return res.status(400).json({
      error: "You already have an active tracking session"
    });
  }
  
  const timeLog = new TimeLog({
    userId: req.user.id,
    projectId,
    startTime: new Date(),
    endTime: null
  });
  
  await timeLog.save();
  res.status(201).json(timeLog);
});

// Stop time tracking
router.post("/stop", auth, async (req, res) => {
  const activeSession = await TimeLog.findOne({ 
    userId: req.user.id,
    endTime: null
  });
  
  if (!activeSession) {
    return res.status(400).json({
      error: "No active tracking session found"
    });
  }
  
  activeSession.endTime = new Date();
  await activeSession.save();
  res.json(activeSession);
});

// Get time logs for a user
router.get("/logs", auth, async (req, res) => {
  const logs = await TimeLog.find({ userId: req.user.id })
    .sort({ startTime: -1 });
  res.json(logs);
});

module.exports = router;`}
            />
          </TabsContent>

          <TabsContent value="structure">
            <div className="grid md:grid-cols-2 gap-8">
              <ProjectStructure 
                structure={projectStructure} 
                title="CLI Structure" 
              />
              <ProjectStructure 
                structure={backendStructure} 
                title="Backend Structure" 
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Installation Section */}
      <section className="container mx-auto py-16 px-4">
        <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Ready to get started?</CardTitle>
            <CardDescription className="text-indigo-200">
              Install DevHelper CLI in just a few simple steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Install from NPM</h4>
            <CliCommand 
              command="npm install -g devhelper-cli" 
              className="border-slate-600" 
            />
            
            <h4 className="text-lg font-semibold text-white mt-6">Verify installation</h4>
            <CliCommand 
              command="devhelper --version" 
              output="DevHelper CLI v1.0.0"
              className="border-slate-600" 
            />
          </CardContent>
          <CardFooter>
            <Button className="bg-indigo-800 hover:bg-indigo-900 mt-4">
              View Full Documentation
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 border-t border-slate-800 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400"> 2025 DevHelper CLI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/ShashwatSuman29" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
