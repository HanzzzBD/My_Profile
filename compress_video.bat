@echo off
echo Compressing video for Vercel deployment...
echo.

REM Check if FFmpeg is installed
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo FFmpeg not found! Please install FFmpeg first.
    echo Download from: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

REM Compress video to smaller size
echo Compressing SMKN_4_BANDUNG_2019-2020.mp4...
ffmpeg -i "assets/video/SMKN_4_BANDUNG_2019-2020.mp4" -vf "scale=1280:720" -b:v 2M -c:a aac -b:a 128k "assets/video/SMKN_4_BANDUNG_2019-2020_compressed.mp4"

if %errorlevel% equ 0 (
    echo.
    echo Video compressed successfully!
    echo Original size: 23MB
    echo Compressed size: ~2MB
    echo.
    echo Now replace the video source in index.html with:
    echo assets/video/SMKN_4_BANDUNG_2019-2020_compressed.mp4
) else (
    echo.
    echo Error compressing video!
)

pause
