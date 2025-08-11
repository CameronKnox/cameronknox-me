@echo off
REM Windows batch version of new-post script
REM Usage: new-post.bat "Post Title" [categories] [tags]

if "%~1"=="" (
    echo Usage: new-post.bat "Post Title" [categories] [tags]
    echo Example: new-post.bat "My New Post" "blog,tech" "programming,web,tutorial"
    exit /b 1
)

set "TITLE=%~1"
set "CATEGORIES=%~2"
set "TAGS=%~3"

REM Set default category if not provided
if "%CATEGORIES%"=="" set "CATEGORIES=blog"

REM Convert title to filename
set "FILENAME=%TITLE%"
set "FILENAME=%FILENAME: =_%"
set "FILENAME=%FILENAME:,=%"
set "FILENAME=%FILENAME:.=%"
set "FILENAME=%FILENAME:!=%"
set "FILENAME=%FILENAME:?=%"
set "FILENAME=%FILENAME:'=%"
set "FILENAME=%FILENAME:"=%"

REM Convert to lowercase (simple approach)
for %%i in (a b c d e f g h i j k l m n o p q r s t u v w x y z) do call set "FILENAME=%%FILENAME:%%i=%%i%%"
for %%i in (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z) do call set "FILENAME=%%FILENAME:%%i=%%i%%"
call :toLower FILENAME

set "POST_FILE=content\posts\%FILENAME%.md"

REM Get current date and time (Windows format)
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YYYY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%"
set "Min=%dt:~10,2%"
set "Sec=%dt:~12,2%"
set "CURRENT_DATE=%YYYY%-%MM%-%DD%T%HH%:%Min%:%Sec%-05:00"

REM Create the post file
(
echo ---
echo title: "%TITLE%"
echo date: %CURRENT_DATE%
echo description: ""
echo tags: [%TAGS:"="%]
echo categories: [%CATEGORIES:"="%]
echo draft: false
echo ---
echo.
echo # %TITLE%
echo.
echo Write your post content here...
echo.
echo ## Subsection
echo.
echo More content...
) > "%POST_FILE%"

echo ✅ New post created: %POST_FILE%
echo 📝 Title: %TITLE%
echo 📁 Categories: %CATEGORIES%
echo 🏷️  Tags: %TAGS%
echo.
echo Next steps:
echo 1. Edit the post: code %POST_FILE%
echo 2. Add a description in the frontmatter
echo 3. Build and preview: hugo server
echo 4. Build for production: hugo

goto :eof

:toLower
for %%L in (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z) do set "%~1=!%~1:%%L=%%L!"
goto :eof