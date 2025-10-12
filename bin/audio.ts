#!/usr/bin/env node
import { spawnSync } from 'child_process';

const args = process.argv.slice(2);

const cmdArgs = ['start', 'audio', '--', ...args];

const result = spawnSync('npm', cmdArgs, { stdio: 'inherit' });

process.exit(result.status ?? 0);
