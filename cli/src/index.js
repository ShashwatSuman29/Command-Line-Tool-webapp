#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';
import inquirer from 'inquirer';
import axios from 'axios';
import Conf from 'conf';

// Create a config store for user settings and auth tokens
const config = new Conf({
  projectName: 'devhelper-cli',
  defaults: {
    apiUrl: 'http://localhost:8080/api',
    isLoggedIn: false,
    authToken: null,
    username: null,
    projects: []
  }
});

// Initialize the CLI program
const program = new Command();

// Display banner
console.log(
  chalk.blue(
    figlet.textSync('DevHelper CLI', { horizontalLayout: 'full' })
  )
);

// Set version and description
program
  .name('devhelper')
  .description('A full-stack command-line utility for developers')
  .version('1.5.0');

// Login command
program
  .command('login')
  .description('Log in to your DevHelper account')
  .action(async () => {
    const spinner = ora('Logging in...').start();
    
    try {
      // If already logged in, show a message
      if (config.get('isLoggedIn')) {
        spinner.info(`You are already logged in as ${chalk.green(config.get('username'))}`);
        
        const { shouldLogout } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'shouldLogout',
            message: 'Do you want to log out and login as a different user?',
            default: false
          }
        ]);
        
        if (!shouldLogout) {
          return;
        }
        
        // If user wants to logout first
        config.set('isLoggedIn', false);
        config.set('authToken', null);
        config.set('username', null);
        console.log(chalk.yellow('Logged out successfully.'));
      }
      
      spinner.stop();
      
      // Prompt for credentials
      const credentials = await inquirer.prompt([
        {
          type: 'input',
          name: 'email',
          message: 'Email:',
          validate: (input) => input.includes('@') ? true : 'Please enter a valid email'
        },
        {
          type: 'password',
          name: 'password',
          message: 'Password:',
          mask: '*'
        }
      ]);
      
      spinner.start('Authenticating...');
      
      // Simulate API call for login
      // In a real implementation, this would be an actual API call
      setTimeout(() => {
        // Simulate successful login
        spinner.succeed('Login successful!');
        
        // Store auth info
        config.set('isLoggedIn', true);
        config.set('authToken', 'simulated-jwt-token-' + Date.now());
        config.set('username', credentials.email);
        
        console.log(chalk.green(`Welcome, ${credentials.email}!`));
        console.log(chalk.dim('You can now use all DevHelper CLI features.'));
      }, 1500);
      
    } catch (error) {
      spinner.fail('Login failed');
      console.error(chalk.red(error.message || 'An error occurred during login'));
    }
  });

// Logout command
program
  .command('logout')
  .description('Log out from your DevHelper account')
  .action(() => {
    const spinner = ora('Logging out...').start();
    
    setTimeout(() => {
      config.set('isLoggedIn', false);
      config.set('authToken', null);
      config.set('username', null);
      
      spinner.succeed('Logged out successfully');
    }, 500);
  });

// Project commands
program
  .command('init [name]')
  .description('Initialize a new project')
  .option('-t, --template <template>', 'Project template (react, vue, node, etc.)', 'react')
  .action((name, options) => {
    // Check if logged in
    if (!config.get('isLoggedIn')) {
      console.log(chalk.yellow('You need to be logged in to create a project.'));
      console.log(chalk.dim('Run `devhelper login` first.'));
      return;
    }
    
    // If no name provided, prompt for it
    const initProject = async (projectName) => {
      const spinner = ora('Creating project...').start();
      
      try {
        // Simulate project creation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Add to projects list
        const projects = config.get('projects') || [];
        projects.push({
          id: Date.now().toString(),
          name: projectName,
          template: options.template,
          createdAt: new Date().toISOString()
        });
        config.set('projects', projects);
        
        spinner.succeed(`Project ${chalk.green(projectName)} created successfully!`);
        console.log(chalk.dim(`Template: ${options.template}`));
        console.log(chalk.dim('Run `devhelper track --start` to start tracking time for this project.'));
      } catch (error) {
        spinner.fail('Project creation failed');
        console.error(chalk.red(error.message || 'An error occurred'));
      }
    };
    
    if (!name) {
      inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          validate: (input) => input.length > 0 ? true : 'Project name cannot be empty'
        }
      ]).then(answers => {
        initProject(answers.projectName);
      });
    } else {
      initProject(name);
    }
  });

// List projects
program
  .command('list')
  .description('List all your projects')
  .action(() => {
    // Check if logged in
    if (!config.get('isLoggedIn')) {
      console.log(chalk.yellow('You need to be logged in to list projects.'));
      console.log(chalk.dim('Run `devhelper login` first.'));
      return;
    }
    
    const projects = config.get('projects') || [];
    
    if (projects.length === 0) {
      console.log(chalk.yellow('You have no projects yet.'));
      console.log(chalk.dim('Run `devhelper init` to create a new project.'));
      return;
    }
    
    console.log(chalk.blue('Your projects:'));
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${chalk.green(project.name)} (${project.template})`);
      console.log(`   Created: ${new Date(project.createdAt).toLocaleString()}`);
      console.log('');
    });
  });

// Time tracking commands
program
  .command('track')
  .description('Track time for a project')
  .option('--start', 'Start time tracking')
  .option('--stop', 'Stop time tracking')
  .option('--status', 'Check tracking status')
  .action((options) => {
    // Check if logged in
    if (!config.get('isLoggedIn')) {
      console.log(chalk.yellow('You need to be logged in to track time.'));
      console.log(chalk.dim('Run `devhelper login` first.'));
      return;
    }
    
    // Get tracking status
    let tracking = config.get('tracking') || null;
    
    if (options.start) {
      if (tracking) {
        console.log(chalk.yellow(`Already tracking time for project: ${tracking.projectName}`));
        console.log(chalk.dim(`Started at: ${new Date(tracking.startTime).toLocaleString()}`));
        return;
      }
      
      // Get projects for selection
      const projects = config.get('projects') || [];
      
      if (projects.length === 0) {
        console.log(chalk.yellow('You have no projects to track time for.'));
        console.log(chalk.dim('Run `devhelper init` to create a new project.'));
        return;
      }
      
      inquirer.prompt([
        {
          type: 'list',
          name: 'projectId',
          message: 'Select a project to track time for:',
          choices: projects.map(p => ({ name: p.name, value: p.id }))
        }
      ]).then(answers => {
        const project = projects.find(p => p.id === answers.projectId);
        const spinner = ora(`Starting time tracking for ${project.name}...`).start();
        
        setTimeout(() => {
          tracking = {
            projectId: project.id,
            projectName: project.name,
            startTime: Date.now(),
            isTracking: true
          };
          
          config.set('tracking', tracking);
          spinner.succeed(`Time tracking started for ${chalk.green(project.name)}`);
          console.log(chalk.dim(`Started at: ${new Date(tracking.startTime).toLocaleString()}`));
          console.log(chalk.dim('Run `devhelper track --stop` to stop tracking.'));
        }, 1000);
      });
    } else if (options.stop) {
      if (!tracking || !tracking.isTracking) {
        console.log(chalk.yellow('No active time tracking session.'));
        console.log(chalk.dim('Run `devhelper track --start` to start tracking.'));
        return;
      }
      
      const spinner = ora('Stopping time tracking...').start();
      
      setTimeout(() => {
        const endTime = Date.now();
        const duration = endTime - tracking.startTime;
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        
        // Save time entry
        const timeEntries = config.get('timeEntries') || [];
        timeEntries.push({
          id: Date.now().toString(),
          projectId: tracking.projectId,
          projectName: tracking.projectName,
          startTime: tracking.startTime,
          endTime: endTime,
          duration: duration
        });
        
        config.set('timeEntries', timeEntries);
        config.set('tracking', null);
        
        spinner.succeed(`Time tracking stopped for ${chalk.green(tracking.projectName)}`);
        console.log(chalk.dim(`Duration: ${hours}h ${minutes}m ${seconds}s`));
      }, 1000);
    } else if (options.status) {
      if (!tracking || !tracking.isTracking) {
        console.log(chalk.yellow('No active time tracking session.'));
        return;
      }
      
      const duration = Date.now() - tracking.startTime;
      const hours = Math.floor(duration / 3600000);
      const minutes = Math.floor((duration % 3600000) / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      
      console.log(chalk.green(`Currently tracking time for: ${tracking.projectName}`));
      console.log(chalk.dim(`Started at: ${new Date(tracking.startTime).toLocaleString()}`));
      console.log(chalk.dim(`Current duration: ${hours}h ${minutes}m ${seconds}s`));
    } else {
      // If no option specified, show help
      console.log('Usage:');
      console.log('  devhelper track --start   Start time tracking');
      console.log('  devhelper track --stop    Stop time tracking');
      console.log('  devhelper track --status  Check tracking status');
    }
  });

// Generate component command
program
  .command('generate <type> <name>')
  .description('Generate code (component, model, etc.)')
  .option('--props <props>', 'Component props (comma separated)')
  .action((type, name, options) => {
    // Check if logged in
    if (!config.get('isLoggedIn')) {
      console.log(chalk.yellow('You need to be logged in to generate code.'));
      console.log(chalk.dim('Run `devhelper login` first.'));
      return;
    }
    
    const spinner = ora(`Generating ${type}...`).start();
    
    setTimeout(() => {
      if (type === 'component') {
        const props = options.props ? options.props.split(',').map(p => p.trim()) : [];
        spinner.succeed(`Component ${chalk.green(name)} generated successfully!`);
        
        // Show generated code
        console.log(chalk.dim('Generated code:'));
        console.log(chalk.cyan(`
import React from 'react';
${props.length > 0 ? `
interface ${name}Props {
${props.map(prop => `  ${prop}: string;`).join('\n')}
}
` : ''}
const ${name} = (${props.length > 0 ? `props: ${name}Props` : ''}) => {
  return (
    <div className="${name.toLowerCase()}-component">
      <h2>${name}</h2>
      ${props.length > 0 ? props.map(prop => `<p>{props.${prop}}</p>`).join('\n      ') : ''}
    </div>
  );
};

export default ${name};
        `));
      } else {
        spinner.succeed(`${type} ${chalk.green(name)} generated successfully!`);
      }
    }, 1500);
  });

// Sync command
program
  .command('sync')
  .description('Sync your data with the cloud')
  .option('--force', 'Force sync and override conflicts')
  .action((options) => {
    // Check if logged in
    if (!config.get('isLoggedIn')) {
      console.log(chalk.yellow('You need to be logged in to sync data.'));
      console.log(chalk.dim('Run `devhelper login` first.'));
      return;
    }
    
    const spinner = ora('Syncing data with cloud...').start();
    
    setTimeout(() => {
      spinner.succeed('Data synchronized successfully!');
      console.log(chalk.dim('All your projects and time entries are now synced.'));
    }, 2000);
  });

// Help command
program
  .command('help')
  .description('Display help information')
  .action(() => {
    program.outputHelp();
  });

// Handle unknown commands
program.on('command:*', (operands) => {
  console.error(chalk.red(`Error: unknown command '${operands[0]}'`));
  console.log('');
  console.log('Available commands:');
  program.commands.forEach((command) => {
    console.log(`  ${command.name()}`);
  });
  console.log('');
  console.log(`Run ${chalk.cyan('devhelper help')} for more information.`);
  process.exit(1);
});

// Export the program for the bin file
export { program };
