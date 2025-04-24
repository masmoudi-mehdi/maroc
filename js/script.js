document.addEventListener('DOMContentLoaded', function() {
    // Date de départ pour le Maroc (13 mai 2025 à 05:00)
    const departureDate = new Date('May 13, 2025 05:00:00').getTime();

    // Optimisation pour les petits écrans
    function optimizeForSmallScreens() {
        const screenWidth = window.innerWidth;
        const container = document.querySelector('.container');

        // Ajustements pour les écrans très petits
        if (screenWidth <= 240) {
            // Simplifier l'interface pour les écrans ultra-petits
            document.querySelectorAll('.countdown-header i').forEach(icon => {
                icon.style.display = 'none';
            });

            // Réduire le texte du bouton de musique pour les très petits écrans
            const playButton = document.getElementById('play-music');
            if (playButton.textContent.includes('The Final Countdown')) {
                playButton.innerHTML = '<i class="fas fa-play"></i> Jouer';
            }

            const pauseButton = document.getElementById('pause-music');
            pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    // Appliquer les optimisations au chargement et au redimensionnement
    optimizeForSmallScreens();
    window.addEventListener('resize', optimizeForSmallScreens);

    // Éléments du compte à rebours
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Éléments audio
    const music = document.getElementById('countdown-music');
    const playButton = document.getElementById('play-music');
    const pauseButton = document.getElementById('pause-music');

    // Mise à jour du compte à rebours
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = departureDate - now;

        // Calcul des jours, heures, minutes et secondes
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Mise à jour des éléments HTML
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        // Animation des blocs de temps
        const timeBlocks = document.querySelectorAll('.time-block');
        timeBlocks.forEach(block => {
            if (seconds % 2 === 0) {
                block.style.transform = 'translateY(-5px)';
            } else {
                block.style.transform = 'translateY(0)';
            }
        });

        // Si le compte à rebours est terminé
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';

            // Afficher un message de départ
            document.querySelector('.countdown-container').innerHTML += '<div class="departure-message">Bon voyage au Maroc!</div>';

            // Jouer automatiquement la musique
            playMusic();
        }
    }

    // Mettre à jour le compte à rebours toutes les secondes
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Appeler la fonction une fois pour éviter le délai initial
    updateCountdown();

    // Fonctions pour la musique
    function playMusic() {
        music.play().catch(error => {
            console.log("Lecture automatique bloquée par le navigateur:", error);
        });
        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
    }

    function pauseMusic() {
        music.pause();
        pauseButton.classList.add('hidden');
        playButton.classList.remove('hidden');
    }

    // Essayer de jouer la musique automatiquement
    try {
        // Tentative de lecture automatique
        playMusic();

        // Ajouter un message pour informer l'utilisateur si la musique est bloquée
        const musicMessage = document.createElement('div');
        musicMessage.className = 'music-message';

        // Message adapté à la taille de l'écran
        if (window.innerWidth <= 320) {
            musicMessage.innerHTML = 'Cliquez pour activer la musique';
        } else {
            musicMessage.innerHTML = 'Si vous n\'entendez pas la musique, cliquez sur le bouton "Jouer" ou n\'importe où sur la page';
        }

        document.querySelector('.music-controls').appendChild(musicMessage);

        // Supprimer le message après 5 secondes si la musique joue
        setTimeout(() => {
            if (!music.paused) {
                musicMessage.remove();
            }
        }, 5000);

        // Ajouter des gestionnaires d'événements pour démarrer la musique lors de l'interaction utilisateur
        const startMusicOnInteraction = () => {
            playMusic();
            // Supprimer les gestionnaires d'événements une fois la musique démarrée
            document.removeEventListener('click', startMusicOnInteraction);
            document.removeEventListener('keydown', startMusicOnInteraction);
            document.removeEventListener('touchstart', startMusicOnInteraction);
        };

        // Ajouter des gestionnaires pour différents types d'interactions
        document.addEventListener('click', startMusicOnInteraction);
        document.addEventListener('keydown', startMusicOnInteraction);
        document.addEventListener('touchstart', startMusicOnInteraction);
    } catch (error) {
        console.log("Erreur lors de la lecture automatique:", error);
    }

    // Événements pour les boutons de musique
    playButton.addEventListener('click', playMusic);
    pauseButton.addEventListener('click', pauseMusic);

    // Animation du chameau
    const camel = document.querySelector('.camel');

    // Fonction pour animer le chameau aléatoirement
    function animateCamel() {
        const delay = Math.random() * 10000 + 5000; // Entre 5 et 15 secondes
        setTimeout(() => {
            camel.style.animation = 'none';
            setTimeout(() => {
                camel.style.animation = 'moveRight 20s linear';
                animateCamel();
            }, 100);
        }, delay);
    }

    // Démarrer l'animation du chameau
    animateCamel();
});
