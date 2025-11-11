#!/usr/bin/env node

import { mkdir, writeFile, access } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Folder structure to create
const folders = [
  'context',
  'aidd/agents',
  'aidd/rules',
  'aidd/memory-bank',
  'aidd/logs',
  'aidd/flows',
  'aidd/tasks',
  'theme',
  'docs',
  'components',
  'public',
  'styles',
  '.cursor',
]

// Template files to create
const templateFiles = {
  'context/product-brief.md': `# Product Brief

## Overview
<!-- Provide a high-level overview of the product -->

## Problem Statement
<!-- Describe the problem this product aims to solve -->

## Target Audience
<!-- Define who this product is for -->

## Goals & Objectives
<!-- List the main goals and objectives -->

## Key Features
<!-- List the key features and functionality -->

## Success Metrics
<!-- Define how success will be measured -->

## Timeline
<!-- Include any relevant timeline information -->

## Notes
<!-- Additional notes or considerations -->
`,

  'context/brand-guide.md': `# Brand Guide

## Logo
Logo: \`/public/logo.svg\`

## Color Palette

### Primary
- **Primary**: \`#5DE4C7\`

### Accent
- **Accent**: \`#7B61FF\`

### Surface
- **Surface**: \`#0D0D0F\`

### Text
- **Text**: \`#EDEDED\`

## Typography
- **Font**: Roboto

## Design Principles

### Elevation
Subtle, layered, calm depth.

### Style
Minimal dark UI with a calm glow aesthetic.
`,

  'context/tone-and-copy.md': `# Voice & Tone

## Voice
Calm, clear, confident.

## Copy Style
Short, declarative sentences.

## CTA Style
Verb-first ("Start building", "View pricing").

## Avoid
- Jargon
- Filler adjectives
- Exclamations
`,

  'context/rules.md': `# Design + Product Rules

## Color System
Use semantic tokens for all colors.

## Motion
Motion enhances clarity, never distracts.

## Accessibility
Components must be keyboard-accessible.

## Dark Mode
Maintain high contrast in dark mode.
`,

  'aidd/agents/AGENTS.md': `# AI Agents

## Builder
Writes UI code based on brand tokens.

## Designer
Enforces brand and accessibility.

## Reviewer
Checks for performance and consistency.

## Archivist
Logs tasks and diffs.
`,

  'aidd/rules/core.md': `# Core Rules

- Read /context before coding.
- Use /theme tokens only.
- New build = new markdown in /aidd/tasks/.
- Never overwrite tokens or rules.
`,

  'aidd/memory-bank/notes.md': `# Memory Notes

## Brand
Calm, minimal, dark-first.

## Font
Roboto.

## Tokens
Tokens imported successfully.

## Next Steps
<!-- Add next steps here -->
`,

  '.cursor/context.yml': `context:
  include:
    - context/product-brief.md
    - context/brand-guide.md
    - context/ui-tokens.json
    - context/tone-and-copy.md
    - context/rules.md
    - aidd/rules/
    - aidd/agents/
    - aidd/memory-bank/
`,

  'docs/README.md': `# VBE Demo Documentation

## Project Structure

See the main README.md for detailed documentation.
`,
}

async function createFolders() {
  log('📁 Creating folder structure...', 'cyan')
  
  for (const folder of folders) {
    const folderPath = join(projectRoot, folder)
    if (!existsSync(folderPath)) {
      await mkdir(folderPath, { recursive: true })
      log(`  ✓ Created: ${folder}`, 'green')
    } else {
      log(`  ⊙ Exists: ${folder}`, 'yellow')
    }
  }
}

async function createTemplateFiles() {
  log('\n📄 Creating template files...', 'cyan')
  
  for (const [filePath, content] of Object.entries(templateFiles)) {
    const fullPath = join(projectRoot, filePath)
    
    // Check if file exists
    try {
      await access(fullPath)
      log(`  ⊙ Exists: ${filePath}`, 'yellow')
    } catch {
      // Create directory if it doesn't exist
      const fileDir = dirname(fullPath)
      if (!existsSync(fileDir)) {
        await mkdir(fileDir, { recursive: true })
      }
      
      await writeFile(fullPath, content, 'utf-8')
      log(`  ✓ Created: ${filePath}`, 'green')
    }
  }
}

async function checkDependencies() {
  log('\n📦 Checking dependencies...', 'cyan')
  
  const packageJsonPath = join(projectRoot, 'package.json')
  
  if (!existsSync(packageJsonPath)) {
    log('  ⚠ package.json not found. Skipping dependency installation.', 'yellow')
    return false
  }
  
  const nodeModulesPath = join(projectRoot, 'node_modules')
  
  if (!existsSync(nodeModulesPath)) {
    log('  📥 Installing dependencies...', 'blue')
    try {
      execSync('npm install', { 
        cwd: projectRoot, 
        stdio: 'inherit' 
      })
      log('  ✓ Dependencies installed successfully', 'green')
      return true
    } catch (error) {
      log('  ✗ Failed to install dependencies', 'yellow')
      return false
    }
  } else {
    log('  ✓ Dependencies already installed', 'green')
    return true
  }
}

function printNextSteps() {
  log('\n' + '='.repeat(60), 'bright')
  log('✨ Setup Complete!', 'bright')
  log('='.repeat(60), 'bright')
  
  log('\n📋 Next Steps:', 'cyan')
  log('\n1. Review and update context files:', 'blue')
  log('   - context/product-brief.md')
  log('   - context/brand-guide.md')
  log('   - context/ui-tokens.json')
  log('   - context/tone-and-copy.md')
  log('   - context/rules.md')
  
  log('\n2. Set up UI tokens:', 'blue')
  log('   - Create context/ui-tokens.json with your design tokens')
  log('   - Update theme/createTheme.ts to use tokens')
  
  log('\n3. Configure Cursor context:', 'blue')
  log('   - Review .cursor/context.yml')
  log('   - Add any additional files/folders to include')
  
  log('\n4. Start development:', 'blue')
  log('   - npm run dev')
  log('   - Create your first task in aidd/tasks/')
  
  log('\n5. Read the documentation:', 'blue')
  log('   - docs/README.md for full project documentation')
  
  log('\n' + '='.repeat(60), 'bright')
}

async function main() {
  log('🚀 VBE Setup Script', 'bright')
  log('='.repeat(60), 'bright')
  
  try {
    await createFolders()
    await createTemplateFiles()
    const depsInstalled = await checkDependencies()
    
    printNextSteps()
    
    if (!depsInstalled) {
      log('\n⚠ Note: Run "npm install" manually if needed.', 'yellow')
    }
    
  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'yellow')
    process.exit(1)
  }
}

main()

