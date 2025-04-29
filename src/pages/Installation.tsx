import React from 'react';
import { Download, Terminal, Server, Database, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import CodeBlock from '@/components/CodeBlock';
import CliCommand from '@/components/CliCommand';
import { useToast } from '@/hooks/use-toast';
import { downloadCliInstaller } from '@/utils/download';

const Installation = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    downloadCliInstaller();
    toast({
      title: "Download Started",
      description: "Your DevHelper CLI installer download has started.",
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <header className="container mx-auto pt-16 pb-12 px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 p-3 bg-indigo-900/30 rounded-full">
            <Download size={40} className="text-indigo-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Installation
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Get started with DevHelper CLI in just a few simple steps
          </p>
        </div>
      </header>

      {/* Quick Install Section */}
      <section className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-black/50 p-6 rounded-lg border border-slate-800">
          <h2 className="text-2xl font-bold mb-4">Quick Install</h2>
          <div className="bg-black p-4 rounded-md font-mono text-indigo-300 mb-4">
            npm install -g devhelper-cli
          </div>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-indigo-800 hover:bg-indigo-900" onClick={() => {
              navigator.clipboard.writeText('npm install -g devhelper-cli');
              toast({
                title: "Copied to Clipboard",
                description: "Install command copied to clipboard",
                duration: 3000
              });
            }}>
              Copy Command
            </Button>
            <Button variant="outline" className="border-indigo-700 text-indigo-400 hover:bg-black/50" onClick={handleDownload}>
              Download Package
            </Button>
          </div>
        </div>
      </section>

      {/* Installation Tabs */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Installation Options</h2>
        
        <Tabs defaultValue="npm" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8 bg-slate-950">
            <TabsTrigger value="npm" className="data-[state=active]:bg-indigo-900/30">NPM</TabsTrigger>
            <TabsTrigger value="yarn" className="data-[state=active]:bg-indigo-900/30">Yarn</TabsTrigger>
            <TabsTrigger value="docker" className="data-[state=active]:bg-indigo-900/30">Docker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="npm" className="space-y-4">
            <Card className="bg-black border-slate-800">
              <CardHeader>
                <CardTitle className="text-indigo-400">NPM Installation</CardTitle>
                <CardDescription className="text-slate-400">
                  Install DevHelper CLI using NPM package manager
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CliCommand 
                  command="npm install -g devhelper-cli" 
                  description="Install globally" 
                  output="+ devhelper-cli@1.5.0\nadded 125 packages in 4.2s" 
                />
                
                <CliCommand 
                  command="devhelper --version" 
                  description="Verify installation" 
                  output="DevHelper CLI v1.5.0" 
                />
                
                <div className="bg-black/50 p-4 rounded-md border border-slate-800 mt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Check size={18} className="text-green-400 mr-2" />
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Node.js v14 or higher</li>
                    <li>NPM v6 or higher</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yarn" className="space-y-4">
            <Card className="bg-black border-slate-800">
              <CardHeader>
                <CardTitle className="text-indigo-400">Yarn Installation</CardTitle>
                <CardDescription className="text-slate-400">
                  Install DevHelper CLI using Yarn package manager
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CliCommand 
                  command="yarn global add devhelper-cli" 
                  description="Install globally" 
                  output="success Installed devhelper-cli@1.5.0" 
                />
                
                <CliCommand 
                  command="devhelper --version" 
                  description="Verify installation" 
                  output="DevHelper CLI v1.5.0" 
                />
                
                <div className="bg-black/50 p-4 rounded-md border border-slate-800 mt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Check size={18} className="text-green-400 mr-2" />
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Node.js v14 or higher</li>
                    <li>Yarn v1.22 or higher</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="docker" className="space-y-4">
            <Card className="bg-black border-slate-800">
              <CardHeader>
                <CardTitle className="text-indigo-400">Docker Installation</CardTitle>
                <CardDescription className="text-slate-400">
                  Run DevHelper CLI in a Docker container
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CliCommand 
                  command="docker pull devhelper/cli:latest" 
                  description="Pull Docker image" 
                  output="latest: Pulling from devhelper/cli\nDigest: sha256:a1b2c3...\nStatus: Downloaded newer image for devhelper/cli:latest" 
                />
                
                <CliCommand 
                  command="docker run -it --rm devhelper/cli --version" 
                  description="Verify installation" 
                  output="DevHelper CLI v1.5.0" 
                />
                
                <div className="bg-black/50 p-4 rounded-md border border-slate-800 mt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Check size={18} className="text-green-400 mr-2" />
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Docker v19 or higher</li>
                    <li>At least 2GB of RAM</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Setup Steps */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Setup Guide</h2>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-start gap-6">
            <div className="bg-indigo-900/30 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-indigo-400">1</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Install DevHelper CLI</h3>
              <p className="text-slate-300 mb-4">
                Install the CLI globally using your preferred package manager.
              </p>
              <CodeBlock 
                language="bash"
                title="Install Command"
                code="npm install -g devhelper-cli"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="bg-indigo-900/30 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-indigo-400">2</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Create an Account</h3>
              <p className="text-slate-300 mb-4">
                Create a DevHelper account to access cloud features and synchronization.
              </p>
              <CodeBlock 
                language="bash"
                title="Account Creation"
                code="devhelper signup"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="bg-indigo-900/30 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-indigo-400">3</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Login to Your Account</h3>
              <p className="text-slate-300 mb-4">
                Log in to your DevHelper account to access all features.
              </p>
              <CodeBlock 
                language="bash"
                title="Login Command"
                code="devhelper login"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="bg-indigo-900/30 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-indigo-400">4</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Configure Your Environment</h3>
              <p className="text-slate-300 mb-4">
                Set up your environment preferences and default settings.
              </p>
              <CodeBlock 
                language="bash"
                title="Configuration Command"
                code="devhelper config init"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="bg-indigo-900/30 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-indigo-400">5</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Create Your First Project</h3>
              <p className="text-slate-300 mb-4">
                Create your first project using one of the available templates.
              </p>
              <CodeBlock 
                language="bash"
                title="Create Project Command"
                code="devhelper create-project --name my-first-project --template react"
              />
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="container mx-auto py-16 px-4 bg-black/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">System Requirements</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-black border-slate-800">
            <CardHeader className="pb-2">
              <div className="mb-4 p-2 bg-indigo-900/30 rounded-full w-10 h-10 flex items-center justify-center">
                <Terminal size={20} className="text-indigo-400" />
              </div>
              <CardTitle>Client Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>Node.js v14 or higher</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>NPM v6 or Yarn v1.22+</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>500MB free disk space</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>Windows, macOS, or Linux</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-black border-slate-800">
            <CardHeader className="pb-2">
              <div className="mb-4 p-2 bg-indigo-900/30 rounded-full w-10 h-10 flex items-center justify-center">
                <Server size={20} className="text-indigo-400" />
              </div>
              <CardTitle>Server Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>Node.js v16 or higher</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>2GB RAM minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>1GB free disk space</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>Linux (recommended)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-black border-slate-800">
            <CardHeader className="pb-2">
              <div className="mb-4 p-2 bg-indigo-900/30 rounded-full w-10 h-10 flex items-center justify-center">
                <Database size={20} className="text-indigo-400" />
              </div>
              <CardTitle>Database Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>MongoDB v4.4 or higher</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>2GB RAM minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-green-400 mt-1 shrink-0" />
                  <span>5GB free disk space</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={18} className="text-yellow-400 mt-1 shrink-0" />
                  <span>MongoDB Atlas supported</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Troubleshooting</h2>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="bg-black border-slate-800">
            <CardHeader>
              <CardTitle className="text-indigo-400">Common Installation Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Permission Errors</h3>
                <p className="text-slate-300 mb-2">
                  If you encounter permission errors during installation, try using sudo (on Linux/macOS) or running your terminal as administrator (on Windows).
                </p>
                <CodeBlock 
                  language="bash"
                  title="Permission Fix"
                  code="sudo npm install -g devhelper-cli"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Command Not Found</h3>
                <p className="text-slate-300 mb-2">
                  If the 'devhelper' command is not found after installation, ensure that your global npm binaries are in your PATH.
                </p>
                <CodeBlock 
                  language="bash"
                  title="Check Installation"
                  code="which devhelper  # On Linux/macOS\nwhere devhelper   # On Windows"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Version Conflicts</h3>
                <p className="text-slate-300 mb-2">
                  If you have version conflicts with dependencies, try clearing your npm cache.
                </p>
                <CodeBlock 
                  language="bash"
                  title="Clear Cache"
                  code="npm cache clean --force\nnpm install -g devhelper-cli"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support CTA */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Need Installation Help?</h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Our support team is ready to assist you with any installation issues.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            className="bg-indigo-800 hover:bg-indigo-900"
            onClick={handleDownload}
          >
            Download Installer
          </Button>
          <Button 
            variant="outline" 
            className="border-indigo-700 text-indigo-400 hover:bg-black/50"
          >
            View FAQ
          </Button>
        </div>
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

export default Installation;
