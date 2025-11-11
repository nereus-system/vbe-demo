# VBE Demo Documentation

## Project Structure

### `/app`
Next.js App Router directory containing pages, layouts, and route handlers. This is where your application's main UI structure lives.

### `/components`
Reusable React components that can be shared across different pages and features.

### `/theme`
MUI theme configuration files:
- `createTheme.ts` - Generates light and dark themes from UI tokens
- `ThemeProvider.tsx` - Wraps the app with MUI theme context

### `/context`
Design system and project context documentation:
- `product-brief.md` - Product overview, goals, and requirements
- `brand-guide.md` - Brand colors, typography, and design principles
- `ui-tokens.json` - Semantic design tokens for colors, typography, and shadows
- `tone-and-copy.md` - Voice, tone, and copywriting guidelines
- `rules.md` - Design and product rules (accessibility, motion, etc.)

### `/aidd`
AI-Driven Development (AIDD) system for tracking development workflows:

- **`agents/`** - AI agent definitions and responsibilities
- **`rules/`** - Core development rules and guidelines
- **`memory-bank/`** - Project memory and notes for AI context
- **`logs/`** - Development logs and activity tracking
- **`flows/`** - Workflow definitions and processes
- **`tasks/`** - Individual build task documentation (one file per build)

### `/public`
Static assets (images, fonts, icons) served directly by Next.js.

### `/styles`
Global CSS styles and style utilities.

### `/docs`
Project documentation (you are here).

### `/.cursor`
Cursor IDE configuration:
- `context.yml` - Defines which files/folders Cursor should include in AI context

## AIDD System Flow

The AI-Driven Development (AIDD) system follows this workflow:

```
Agents → Tasks → Memory
```

### 1. Agents (`/aidd/agents/`)
AI agents with specific roles:
- **Builder**: Writes UI code based on brand tokens
- **Designer**: Enforces brand and accessibility standards
- **Reviewer**: Checks for performance and consistency
- **Archivist**: Logs tasks and diffs

### 2. Tasks (`/aidd/tasks/`)
Each new build or feature gets a markdown file documenting:
- What was built
- Changes made
- Dependencies
- Notes for future reference

Format: `YYYY_MM_DD-description.md`

### 3. Memory Bank (`/aidd/memory-bank/`)
Stores important project context:
- Brand guidelines
- Current state
- Next steps
- Important decisions

This memory helps AI agents maintain context across sessions.

## Using Cursor with Context Awareness

Cursor is configured via `/.cursor/context.yml` to automatically include:

- All context files (`/context/*`)
- AIDD rules and agents
- Memory bank notes

### How It Works

1. **Read Context First**: Before coding, Cursor reads `/context` files to understand:
   - Brand guidelines
   - Design tokens
   - Tone and voice
   - Development rules

2. **Follow Rules**: Cursor enforces rules from:
   - `/context/rules.md`
   - `/aidd/rules/core.md`

3. **Use Tokens**: All colors and styles come from `/context/ui-tokens.json` via `/theme/createTheme.ts`

4. **Maintain Memory**: Important decisions and state are logged in `/aidd/memory-bank/notes.md`

### Best Practices

- Always reference context files when asking Cursor to build features
- Let Cursor read brand-guide.md and ui-tokens.json before UI work
- Check memory-bank/notes.md for current project state
- Follow the core rules: never overwrite tokens or rules

## Logging New Build Tasks Manually

When starting a new build or feature:

1. **Create a new task file** in `/aidd/tasks/`:
   ```
   YYYY_MM_DD-description.md
   ```
   Example: `2025_11_12-navbar-hero.md`

2. **Document the task**:
   ```markdown
   # Task Name
   
   Date: YYYY-MM-DD
   
   ## Summary
   Brief description of what's being built.
   
   ## Requirements
   - Requirement 1
   - Requirement 2
   
   ## Implementation
   - Step 1
   - Step 2
   
   ## Notes
   Any important notes or decisions.
   ```

3. **Update memory bank** (`/aidd/memory-bank/notes.md`) if:
   - Project state changes significantly
   - New patterns or decisions are made
   - Next steps are identified

4. **Follow core rules**:
   - Read `/context` before coding
   - Use `/theme` tokens only
   - Never overwrite tokens or rules

### Example Task File

```markdown
# Navbar + Hero Section

Date: 2025-11-12

## Summary
Build responsive navbar with logo and navigation, plus hero section with CTA.

## Requirements
- Use brand colors from tokens
- Follow accessibility rules
- Responsive design
- Keyboard navigation

## Implementation
- Created Navbar component
- Created Hero component
- Added responsive breakpoints
- Implemented keyboard navigation

## Notes
- Used semantic tokens for all colors
- Maintained high contrast for dark mode
- Motion is subtle and enhances clarity
```

## Quick Reference

- **Brand Colors**: See `/context/brand-guide.md`
- **Design Tokens**: See `/context/ui-tokens.json`
- **Voice & Tone**: See `/context/tone-and-copy.md`
- **Core Rules**: See `/aidd/rules/core.md`
- **Current State**: See `/aidd/memory-bank/notes.md`

