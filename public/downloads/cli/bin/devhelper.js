#!/usr/bin/env node

import { program } from '../src/index.js';

// This file is the entry point for the CLI
// It simply imports and executes the main program
program.parse(process.argv);
