@echo off
echo ===================================================
echo  ASSISTANT D'AJOUT DE MUSIQUE - THE FINAL COUNTDOWN
echo ===================================================
echo.

if not exist assets mkdir assets

echo Veuillez glisser-deposer votre fichier MP3 dans cette fenetre,
echo puis appuyez sur Entree:
echo.

set /p chemin_fichier="Chemin du fichier: "

if not exist "%chemin_fichier%" (
    echo.
    echo ERREUR: Le fichier n'existe pas.
    echo.
    pause
    exit /b
)

echo.
echo Copie du fichier en cours...
copy "%chemin_fichier%" "assets\final-countdown.mp3"

if %errorlevel% equ 0 (
    echo.
    echo Fichier copie avec succes dans le dossier assets !
    echo.
    echo Modification du fichier index.html...
    
    powershell -Command "(Get-Content index.html) -replace '<!-- <source src=\"assets/final-countdown.mp3\" type=\"audio/mpeg\"> -->', '<source src=\"assets/final-countdown.mp3\" type=\"audio/mpeg\">' -replace '<source src=\"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3\" type=\"audio/mpeg\">', '<!-- <source src=\"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3\" type=\"audio/mpeg\"> -->' | Set-Content index.html"
    
    echo.
    echo Tout est pret ! Vous pouvez maintenant ouvrir index.html pour voir votre site.
) else (
    echo.
    echo ERREUR: Impossible de copier le fichier.
)

echo.
pause
