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

            // Réduire le texte des boutons pour les très petits écrans
            const confettiBtn = document.getElementById('confetti-btn');
            confettiBtn.innerHTML = '<i class="fas fa-magic"></i>';

            const themeToggle = document.getElementById('theme-toggle');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
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

            // Lancer les confettis automatiquement
            launchConfetti();
        }
    }

    // Mettre à jour le compte à rebours toutes les secondes
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Appeler la fonction une fois pour éviter le délai initial
    updateCountdown();

    // Fonction pour lancer les confettis
    function launchConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9a3c', '#6a0572']
        });
    }

    // Bouton pour lancer les confettis
    const confettiBtn = document.getElementById('confetti-btn');
    confettiBtn.addEventListener('click', function() {
        launchConfetti();

        // Animation du bouton
        this.classList.add('animate__animated', 'animate__rubberBand');
        setTimeout(() => {
            this.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);
    });

    // Basculer le mode nuit
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        // Changer l'icône du bouton
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            this.setAttribute('title', 'Mode jour');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            this.setAttribute('title', 'Mode nuit');
        }
    });

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

    // Ajouter des faits amusants sur le Maroc
    const funFacts = [
        "Le Maroc est connu pour ses magnifiques médinas, ses souks colorés et sa délicieuse cuisine!",
        "Le Maroc est le seul pays d'Afrique à avoir une côte sur l'océan Atlantique et la mer Méditerranée.",
        "Le thé à la menthe est la boisson nationale du Maroc et est servi avec beaucoup de sucre!",
        "Le Maroc possède la plus ancienne université du monde encore en activité, fondée en 859.",
        "Le désert du Sahara couvre une grande partie du sud-est du Maroc.",
        "Le couscous est traditionnellement mangé le vendredi au Maroc.",
        "Casablanca est la plus grande ville du Maroc et un important centre économique."
    ];

    // Changer le fait amusant toutes les 10 secondes
    const funFactElement = document.querySelector('.fun-fact p');
    let currentFactIndex = 0;

    function changeFunFact() {
        currentFactIndex = (currentFactIndex + 1) % funFacts.length;
        funFactElement.innerHTML = `<i class="fas fa-lightbulb"></i> Le saviez-vous? ${funFacts[currentFactIndex]}`;
        funFactElement.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => {
            funFactElement.classList.remove('animate__animated', 'animate__fadeIn');
        }, 1000);
    }

    // Changer le fait amusant au clic
    document.querySelector('.fun-fact').addEventListener('click', changeFunFact);

    // Changer automatiquement le fait amusant
    setInterval(changeFunFact, 10000);
});
