@echo off

echo "IIS Express Starting Utility..."

set iisdir=""
rem set port=57431
set project=.\backend-api\Api
set config=.\backend-api\.vs\config\applicationhost.config

set /p iisdir="Path to IIS Express file (empty for default):  "

IF /I "%iisdir%" == """" (
	set iisdir="C:\Program Files (x86)\IIS Express"
)

rem set /p port="Server Port (Default 8080): %port%

echo ______________________________________________________________________
echo .: Configuration Values :.
echo ISS Path....: %iisdir%
echo Project Path: %project%
echo Config File.: %config%
rem echo Port........: %port%

echo ______________________________________________________________________
echo .: Starting... :.

rem /site:Empty_Project_Mysql_Migrations
rem /path:%project%

%iisdir%\iisexpress.exe /config:%config% /site:Api


