@echo off
echo DevHelper CLI Installer
echo =====================
echo.
echo Installing DevHelper CLI...
echo.
timeout /t 2 > nul

echo Creating directories...
if not exist "%USERPROFILE%\.devhelper" mkdir "%USERPROFILE%\.devhelper"
if not exist "%USERPROFILE%\.devhelper\bin" mkdir "%USERPROFILE%\.devhelper\bin"
timeout /t 1 > nul

echo Extracting files...
:: Copy CLI files to user directory
xcopy /E /I /Y "%~dp0cli\*" "%USERPROFILE%\.devhelper\"
timeout /t 2 > nul

echo Installing dependencies...
:: Run npm install in the CLI directory
cd /d "%USERPROFILE%\.devhelper"
call npm install
timeout /t 2 > nul

echo Creating global link...
:: Create global npm link
call npm link
timeout /t 2 > nul

echo Setting up PATH...
:: Add to PATH if not already there
set "PATH_TO_ADD=%USERPROFILE%\.devhelper\bin"
echo %PATH% | findstr /C:"%PATH_TO_ADD%" > nul
if errorlevel 1 (
    setx PATH "%PATH%;%PATH_TO_ADD%"
    echo Added CLI directory to PATH
) else (
    echo CLI directory already in PATH
)

echo.
echo DevHelper CLI has been successfully installed!
echo You can now use the 'devhelper' command in your terminal.
echo You may need to restart your terminal for the PATH changes to take effect.
echo.
echo Press any key to exit...
pause > nul
