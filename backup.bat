@echo off
cd /d D:\project\NEW\job-board-saas
git add .
git commit -m "بکاپ خودکار - %date%"
git bundle create F:\projects\NEW\job-board-daily.bundle --all
echo بکاپ انجام شد!
pause
