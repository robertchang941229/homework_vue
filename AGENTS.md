# AGENTS.md

### Purpose

This guide helps OpenCode agents work on the "GitHub ??µå??æ©?" Vue 3 project efficiently. Stick to beginner-friendly terms and small, clear updates. All metaphors will avoid Vue jargon.

---

## Key Commands

### ????ï¸? Project Setup

1. **Wake up the project** (install its tools):
   ```sh
   npm install
   ```
   _(Think of this as loading your "toolbox" for the project.)_

### ???? Start the Project

2. **Run in development mode:**
   ```sh
   npm run dev
   ```
   _(This flips the "on" switch and lets you see your work in a browser instantly.)_

### ???? Code Validation

3. **Check for messy code:**
   ```sh
   npm run lint
   ```
   _(Imagine this as a "clean-up the desk" button ensuring everything is tidy.)_

### ????ï¸? Build for Production

4. **Prepare for sharing:**
   ```sh
   npm run build
   ```
   _(This packs your project into a neat package, ready to deliver.)_

---

## Testing ??§ª

### ???? Unit Tests

- Use:
  ```sh
  npm run test:unit
  ```
  _(Think of this as testing each small gear in your machine to make sure it works.)_

### ???? End-to-End Tests

1. **First, install browser helpers:**

   ```sh
   npx playwright install
   ```

   _(This installs drivers to "test drive" the site in different browsers.)_

2. **Run end-to-end checks:**
   ```sh
   npm run test:e2e
   ```
   _(This tests the entire machine to ensure each part works together.)_

### Debug Options

- Run debug mode or filter to specific browsers/files (e.g., "Chromium only") using commands like:

  ```sh
  npm run test:e2e -- --project=chromium

  npm run test:e2e -- tests/example.spec.ts

  npm run test:e2e -- --debug
  ```

---

## Hints ????

- Before tasks, always "wake up the toolbox" with `npm install`.
- Check instructions when debugging Playwright for end-to-end test filters.
- Refer to `README.md` or project "example" files when unsure.
