@echo off
REM CSS Minifier Batch Script
REM This script minifies the ocr-widget.css file

echo.
echo ========================================
echo          CSS Minifier Script
echo ========================================
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if the CSS file exists
if not exist "ocr-widget.css" (
    echo ERROR: ocr-widget.css file not found in current directory
    echo Please make sure you're running this script in the correct directory
    echo.
    pause
    exit /b 1
)

REM Run the minification script
echo Running CSS minification...
echo.
node minify-css.js

echo.
echo ========================================
echo             Process Complete
echo ========================================
echo.
pause
