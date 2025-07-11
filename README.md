# CSS Minifier

A simple and efficient CSS minification tool for the OCR widget project.

## Features

- ✅ Removes CSS comments
- ✅ Eliminates unnecessary whitespace
- ✅ Optimizes syntax (spaces around `{}:;,>+~()`)
- ✅ Shows compression statistics
- ✅ Multiple ways to run (Node.js, npm scripts, batch file)
- ✅ Auto-generates output filenames
- ✅ Watch mode for development

## Installation

No additional dependencies required! Just Node.js (version 12 or higher).

## Usage

### Method 1: Using the Batch Script (Easiest)
Double-click `minify.bat` or run in terminal:
```bash
minify.bat
```
This will automatically minify `ocr-widget.css` to `ocr-widget.min.css`.

### Method 2: Using Node.js Directly
```bash
# Minify ocr-widget.css (auto-generates ocr-widget.min.css)
node minify-css.js

# Minify any CSS file
node minify-css.js styles.css

# Specify custom output filename
node minify-css.js ocr-widget.css custom-output.min.css
```

### Method 3: Using npm Scripts
```bash
# Minify the default file
npm run minify

# Watch for changes and auto-minify
npm run minify:watch

# Build production version
npm run build

# Show help
npm run help
```

## Examples

### Basic Usage
```bash
node minify-css.js
```
**Input:** `ocr-widget.css` (150 KB)  
**Output:** `ocr-widget.min.css` (45 KB)  
**Compression:** 70% smaller

### Custom Files
```bash
node minify-css.js my-styles.css optimized.css
```

### Watch Mode
```bash
npm run minify:watch
```
Automatically minifies whenever `ocr-widget.css` changes.

## File Structure
```
axpo-ocr-style/
├── ocr-widget.css          # Your source CSS file
├── ocr-widget.min.css      # Generated minified version
├── minify-css.js           # Main minification script
├── minify.bat              # Windows batch script
├── package.json            # npm configuration
└── README.md               # This file
```

## How It Works

The minifier performs these optimizations:

1. **Comment Removal**: Strips all `/* ... */` comments
2. **Whitespace Optimization**: Removes unnecessary spaces, tabs, and newlines
3. **Syntax Optimization**: 
   - Removes spaces around `{}:;,`
   - Optimizes selector combinators (`>`, `+`, `~`)
   - Removes spaces around parentheses
   - Removes trailing semicolons before closing braces

## Output Example

**Before (formatted CSS):**
```css
.button {
    background-color: #007bff;
    border: 1px solid #007bff;
    color: white;
}

.button:hover {
    background-color: #0056b3;
}
```

**After (minified CSS):**
```css
.button{background-color:#007bff;border:1px solid #007bff;color:white}.button:hover{background-color:#0056b3}
```

## Requirements

- Node.js 12.0.0 or higher
- Windows (for .bat script) or any OS with Node.js

## Troubleshooting

### "Node.js not found"
Install Node.js from [nodejs.org](https://nodejs.org/)

### "File not found"
Make sure you're running the script in the directory containing your CSS file.

### Permission errors
Run your terminal as administrator (Windows) or use `sudo` (Linux/Mac).

## License

MIT License - Feel free to use and modify as needed.
