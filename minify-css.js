#!/usr/bin/env node

/**
 * CSS Minifier Script
 * Minifies CSS files by removing comments, whitespace, and optimizing syntax
 */

const fs = require('fs');
const path = require('path');

class CSSMinifier {
    constructor() {
        this.inputFile = '';
        this.outputFile = '';
    }

    /**
     * Minifies CSS content
     * @param {string} css - The CSS content to minify
     * @returns {string} - Minified CSS
     */
    minify(css) {
        console.log('🔄 Starting CSS minification...');
        
        let minified = css;
        
        // Step 1: Remove CSS comments (/* ... */)
        console.log('   → Removing comments...');
        minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
        
        // Step 2: Remove unnecessary whitespace
        console.log('   → Removing whitespace...');
        // Replace multiple spaces, tabs, and newlines with single space
        minified = minified.replace(/\s+/g, ' ');
        
        // Step 3: Remove spaces around specific characters
        console.log('   → Optimizing syntax...');
        minified = minified
            // Remove spaces around { }
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            // Remove spaces around : ; ,
            .replace(/\s*:\s*/g, ':')
            .replace(/\s*;\s*/g, ';')
            .replace(/\s*,\s*/g, ',')
            // Remove spaces around > + ~ selectors
            .replace(/\s*>\s*/g, '>')
            .replace(/\s*\+\s*/g, '+')
            .replace(/\s*~\s*/g, '~')
            // Remove spaces around parentheses
            .replace(/\s*\(\s*/g, '(')
            .replace(/\s*\)\s*/g, ')')
            // Remove trailing semicolons before }
            .replace(/;}/g, '}')
            // Remove leading/trailing whitespace
            .trim();
        
        console.log('✅ CSS minification completed!');
        return minified;
    }

    /**
     * Gets file size in human readable format
     * @param {string} filePath - Path to the file
     * @returns {string} - Human readable file size
     */
    getFileSize(filePath) {
        const stats = fs.statSync(filePath);
        const bytes = stats.size;
        
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    /**
     * Calculates compression ratio
     * @param {number} originalSize - Original file size in bytes
     * @param {number} minifiedSize - Minified file size in bytes
     * @returns {string} - Compression percentage
     */
    getCompressionRatio(originalSize, minifiedSize) {
        const ratio = ((originalSize - minifiedSize) / originalSize) * 100;
        return ratio.toFixed(1) + '%';
    }

    /**
     * Processes a single CSS file
     * @param {string} inputPath - Input file path
     * @param {string} outputPath - Output file path (optional)
     */
    processFile(inputPath, outputPath = null) {
        try {
            // Validate input file
            if (!fs.existsSync(inputPath)) {
                throw new Error(`Input file not found: ${inputPath}`);
            }

            // Generate output path if not provided
            if (!outputPath) {
                const parsedPath = path.parse(inputPath);
                outputPath = path.join(parsedPath.dir, `${parsedPath.name}.min${parsedPath.ext}`);
            }

            console.log(`📁 Input:  ${inputPath}`);
            console.log(`📁 Output: ${outputPath}`);
            console.log('');

            // Read CSS file
            const originalCSS = fs.readFileSync(inputPath, 'utf8');
            const originalSize = fs.statSync(inputPath).size;

            // Minify CSS
            const minifiedCSS = this.minify(originalCSS);

            // Write minified CSS
            fs.writeFileSync(outputPath, minifiedCSS, 'utf8');

            // Show results
            const minifiedSize = fs.statSync(outputPath).size;
            const compression = this.getCompressionRatio(originalSize, minifiedSize);

            console.log('');
            console.log('📊 RESULTS:');
            console.log(`   Original size:  ${this.getFileSize(inputPath)}`);
            console.log(`   Minified size:  ${this.getFileSize(outputPath)}`);
            console.log(`   Compression:    ${compression} smaller`);
            console.log('');
            console.log(`✅ Successfully created: ${outputPath}`);

        } catch (error) {
            console.error('❌ Error:', error.message);
            process.exit(1);
        }
    }

    /**
     * Main entry point
     */
    run() {
        const args = process.argv.slice(2);
        
        console.log('🎨 CSS Minifier');
        console.log('================');
        console.log('');

        if (args.length === 0) {
            // Default: minify ocr-widget.css
            const defaultInput = 'ocr-widget.css';
            if (fs.existsSync(defaultInput)) {
                this.processFile(defaultInput);
            } else {
                console.log('Usage: node minify-css.js [input-file] [output-file]');
                console.log('');
                console.log('Examples:');
                console.log('  node minify-css.js                           # Minify ocr-widget.css to ocr-widget.min.css');
                console.log('  node minify-css.js styles.css                # Minify styles.css to styles.min.css');
                console.log('  node minify-css.js styles.css minified.css   # Minify styles.css to minified.css');
                console.log('');
                console.log('❌ No input file specified and ocr-widget.css not found.');
                process.exit(1);
            }
        } else if (args.length === 1) {
            // One argument: input file, auto-generate output filename
            this.processFile(args[0]);
        } else if (args.length === 2) {
            // Two arguments: input and output files
            this.processFile(args[0], args[1]);
        } else {
            console.log('❌ Too many arguments. Usage: node minify-css.js [input-file] [output-file]');
            process.exit(1);
        }
    }
}

// Run the minifier if this script is executed directly
if (require.main === module) {
    const minifier = new CSSMinifier();
    minifier.run();
}

module.exports = CSSMinifier;
