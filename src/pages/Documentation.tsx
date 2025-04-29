import React from 'react';
import { Book, Code, Terminal, Search, HelpCircle, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import CodeBlock from '@/components/CodeBlock';
import CommandInfo from '@/components/CommandInfo';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <header className="container mx-auto pt-16 pb-12 px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 p-3 bg-indigo-900/30 rounded-full">
            <Book size={40} className="text-indigo-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Documentation
          </h1>
          <p className="text-xl text-white max-w-2xl mb-8">
            Comprehensive guides and references for using DevHelper CLI effectively
          </p>
        </div>
      </header>

      {/* Quick Navigation */}
      <section className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                <Terminal className="h-8 w-8 text-indigo-400" />
              </div>
              <CardTitle className="text-center text-white">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Basic commands and setup
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                <Code className="h-8 w-8 text-indigo-400" />
              </div>
              <CardTitle className="text-center text-white">API Reference</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Complete API documentation
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                <Search className="h-8 w-8 text-indigo-400" />
              </div>
              <CardTitle className="text-center text-white">Guides</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Step-by-step tutorials
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-slate-800 hover:border-indigo-800 transition duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                <Database className="h-8 w-8 text-indigo-400" />
              </div>
              <CardTitle className="text-center text-white">Examples</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-white">
              Real-world usage examples
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Documentation */}
      <section className="container mx-auto py-12 px-4">
        <Tabs defaultValue="commands" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 text-white">
            <TabsTrigger value="commands" className="text-white data-[state=active]:bg-indigo-900 data-[state=active]:text-white">Commands</TabsTrigger>
            <TabsTrigger value="api" className="text-white data-[state=active]:bg-indigo-900 data-[state=active]:text-white">API</TabsTrigger>
            <TabsTrigger value="config" className="text-white data-[state=active]:bg-indigo-900 data-[state=active]:text-white">Configuration</TabsTrigger>
            <TabsTrigger value="examples" className="text-white data-[state=active]:bg-indigo-900 data-[state=active]:text-white">Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="commands" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Command Reference</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
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
                usage="devhelper create-project --name <n> --template <template>"
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
          </TabsContent>
          
          <TabsContent value="api" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-white">API Reference</h2>
            
            <Card className="bg-black/40 border-slate-800">
              <CardHeader>
                <CardTitle className="text-indigo-400">REST API Endpoints</CardTitle>
                <CardDescription className="text-white">
                  Available endpoints for interacting with the DevHelper API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Authentication</h3>
                  <CodeBlock 
                    language="javascript"
                    title="Authentication Endpoints"
                    code={`// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

// Register
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password"
}

// Get current user
GET /api/auth/me
Authorization: Bearer <token>`}
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Projects</h3>
                  <CodeBlock 
                    language="javascript"
                    title="Project Endpoints"
                    code={`// Get all projects
GET /api/projects
Authorization: Bearer <token>

// Get project by ID
GET /api/projects/:id
Authorization: Bearer <token>

// Create project
POST /api/projects
Authorization: Bearer <token>
{
  "name": "My Project",
  "template": "react",
  "description": "A new project"
}`}
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Time Tracking</h3>
                  <CodeBlock 
                    language="javascript"
                    title="Time Tracking Endpoints"
                    code={`// Start tracking
POST /api/time/start
Authorization: Bearer <token>
{
  "projectId": "project-id"
}

// Stop tracking
POST /api/time/stop
Authorization: Bearer <token>

// Get time logs
GET /api/time/logs?projectId=project-id
Authorization: Bearer <token>`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="config" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Configuration Guide</h2>
            
            <Card className="bg-black/40 border-slate-800">
              <CardHeader>
                <CardTitle className="text-indigo-400">Configuration File</CardTitle>
                <CardDescription className="text-white">
                  The DevHelper configuration file structure and options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock 
                  language="javascript"
                  title="devhelper.config.js"
                  code={`module.exports = {
  // User configuration
  user: {
    email: "user@example.com",
    apiKey: "your-api-key"
  },
  
  // Project defaults
  defaults: {
    template: "react",
    path: "./projects"
  },
  
  // Time tracking settings
  timeTracking: {
    autoSync: true,
    syncInterval: 30, // minutes
    idleTimeout: 5 // minutes
  },
  
  // API configuration
  api: {
    url: "https://api.devhelper.io",
    timeout: 5000
  }
}`}
                />
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Environment Variables</h3>
              <p className="text-white mb-4">
                You can also configure DevHelper using environment variables:
              </p>
              
              <div className="bg-black/40 p-6 rounded-lg border border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="font-mono text-indigo-400">DEVHELPER_API_KEY</p>
                    <p className="text-white text-sm">Your API key for authentication</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-indigo-400">DEVHELPER_API_URL</p>
                    <p className="text-white text-sm">Custom API URL</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-indigo-400">DEVHELPER_DEFAULT_TEMPLATE</p>
                    <p className="text-white text-sm">Default template for new projects</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-indigo-400">DEVHELPER_AUTO_SYNC</p>
                    <p className="text-white text-sm">Enable/disable auto sync (true/false)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Example Workflows</h2>
            
            <div className="space-y-8">
              <Card className="bg-black/40 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-indigo-400">Creating a React Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    language="bash"
                    title="React Project Workflow"
                    code={`# Login to your account
$ devhelper login

# Create a new React project
$ devhelper create-project --name my-react-app --template react

# Navigate to the project
$ cd my-react-app

# Start time tracking
$ devhelper track start

# When finished, stop tracking
$ devhelper track stop

# Sync your time data
$ devhelper sync`}
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-indigo-400">Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    language="bash"
                    title="Team Collaboration Workflow"
                    code={`# Create a team project
$ devhelper create-project --name team-project --template next --team acme-corp

# Invite team members
$ devhelper team invite john@example.com jane@example.com

# Set up project roles
$ devhelper team role john@example.com developer
$ devhelper team role jane@example.com admin

# Track time on team project
$ devhelper track start --project team-project

# Generate team report
$ devhelper report --team acme-corp --last 30d`}
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-indigo-400">Custom Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    language="bash"
                    title="Custom Automation Workflow"
                    code={`# Create a custom script
$ devhelper script create deploy

# Edit the script
$ devhelper script edit deploy

# Example script content:
# #!/bin/bash
# echo "Building project..."
# npm run build
# echo "Deploying to server..."
# scp -r ./build user@server:/var/www/app
# echo "Deployment complete!"

# Run the custom script
$ devhelper run deploy

# Schedule script to run daily
$ devhelper schedule deploy --daily --time "02:00"`}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-16 px-4 bg-black/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-400">How do I install DevHelper CLI?</h3>
            <p className="text-white">
              You can install DevHelper CLI globally using npm: <code className="text-indigo-300">npm install -g devhelper-cli</code>
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-400">Is DevHelper CLI free to use?</h3>
            <p className="text-white">
              DevHelper CLI has both free and premium tiers. The basic features are free, while advanced features require a subscription.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-400">Can I use DevHelper CLI offline?</h3>
            <p className="text-white">
              Yes, most features work offline. Your data will sync when you reconnect to the internet.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-400">How do I update to the latest version?</h3>
            <p className="text-white">
              Run <code className="text-indigo-300">npm update -g devhelper-cli</code> to update to the latest version.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-400">Can I contribute to DevHelper CLI?</h3>
            <p className="text-white">
              Yes! DevHelper CLI is open source. Visit our GitHub repository to contribute.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-400">How secure is my data?</h3>
            <p className="text-white">
              We use industry-standard encryption for all data in transit and at rest. Your API keys and credentials are never stored in plain text.
            </p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Need More Help?</h2>
        <p className="text-xl text-white max-w-2xl mx-auto mb-8">
          Our support team is ready to assist you with any questions or issues.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            className="bg-indigo-800 hover:bg-indigo-900"
          >
            Contact Support
          </Button>
          <Button 
            variant="outline" 
            className="border-indigo-700 text-indigo-400 hover:bg-black/50"
          >
            Join Community
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 border-t border-slate-800 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white">2025 DevHelper CLI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/ShashwatSuman29" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
