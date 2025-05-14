// Effet de parallaxe pour le fond d'écran
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    // Ajustez cette valeur pour modifier la vitesse de défilement (plus petit = plus lent)
    const parallaxSpeed = -0.1;
    
    // Application de l'effet de parallaxe
    document.body.style.setProperty('--parallax-offset', `${scrollPosition * parallaxSpeed}px`);
    
    // Si on utilise la méthode directe sur body, on peut aussi utiliser:
    // document.body.style.backgroundPositionY = `calc(50% + ${scrollPosition * parallaxSpeed}px)`;
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Updated includeHTML function for your specific case
function includeHTML(file, elementId) {
    fetch(`../html/${file}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading file:', error));
}

// Fonction d'initialisation pour toutes les pages
function initializePageComponents() {
    // Charger le header et le footer
    includeHTML('header.html', 'header-placeholder');
    includeHTML('footer.html', 'footer-placeholder');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }
    
    // Smooth scroll pour la page d'accueil
    const scrollDown = document.getElementById('scrollDown');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    const heroScrollDown = document.getElementById('heroScrollDown');
    if (heroScrollDown) {
        heroScrollDown.addEventListener('click', function() {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            this.reset();
        });
    }
    
    // Script du formulaire de devis
    initializeDevisForm();
}

// Fonction pour initialiser le formulaire de devis
function initializeDevisForm() {
    // Gestion des sous-options pour chaque service
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    
    if (serviceCheckboxes.length > 0) {
        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const parentOption = this.closest('.service-option');
                const subOptions = parentOption.querySelector('.sub-options');
                
                if (this.checked) {
                    subOptions.style.display = 'block';
                } else {
                    subOptions.style.display = 'none';
                    // Décocher les sous-options quand le service principal est décoché
                    const subCheckboxes = subOptions.querySelectorAll('input[type="checkbox"]');
                    subCheckboxes.forEach(subCheck => {
                        subCheck.checked = false;
                    });
                }
            });
        });
        
        // Validation du SIRET
        const siretInput = document.getElementById('siret');
        if (siretInput) {
            siretInput.addEventListener('input', function() {
                // Supprimer tous les caractères non numériques
                this.value = this.value.replace(/[^0-9]/g, '');
                
                // Limiter à 14 chiffres
                if (this.value.length > 14) {
                    this.value = this.value.slice(0, 14);
                }
            });
        }
        
        // Validation du formulaire avant envoi
        const devisForm = document.getElementById('devisForm');
        if (devisForm) {
            devisForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Vérifier qu'au moins un service est sélectionné
                const anyServiceChecked = Array.from(serviceCheckboxes).some(checkbox => checkbox.checked);
                
                if (!anyServiceChecked) {
                    alert('Veuillez sélectionner au moins un service.');
                    return;
                }
                
                // Vous pourriez ajouter ici d'autres validations si nécessaire
                
                // Simuler l'envoi du formulaire
                alert('Votre demande de devis a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.');
                
                // En production, vous pourriez soumettre le formulaire ou utiliser fetch/ajax
                // this.submit();
            });
        }
    }
}

// Exécuter l'initialisation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', initializePageComponents);