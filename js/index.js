// MUNDANA Homepage Interactions

// Dynamically Inject Mobile Drawer Menu
function createMobileDrawer() {
    if (document.getElementById("mobile-menu")) return;

    const drawer = document.createElement("div");
    drawer.id = "mobile-menu";
    drawer.className = "fixed inset-0 z-40 bg-background flex flex-col justify-center items-center gap-stack-lg transition-transform duration-300 translate-x-full md:hidden";
    drawer.innerHTML = `
        <span class="material-symbols-outlined absolute top-6 right-6 text-primary cursor-pointer text-display-lg" id="close-drawer">close</span>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="index.html">Intro</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="narrativa-oficial.html">Narrativa Oficial</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="contranarrativa.html">Contranarrativa</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="percepcion-social.html">Percepción Social</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="reconfiguracion-social.html">Reconfiguración Social</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="metodologia.html">Metodología</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="sobre-nosotrxs.html">Sobre Nosotrxs</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="datos-bibliografia.html">Datos y Bibliografía</a>
    `;

    document.body.appendChild(drawer);

    // Event listener to close
    document.getElementById("close-drawer").addEventListener("click", toggleMobileMenu);
}

function toggleMobileMenu() {
    createMobileDrawer();
    const drawer = document.getElementById("mobile-menu");
    if (drawer) {
        drawer.classList.toggle("translate-x-full");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggler
    const menuBtn = document.querySelector("header .md\\:hidden");
    if (menuBtn) {
        menuBtn.addEventListener("click", toggleMobileMenu);
    }

    // 2. Header scroll shadow and blurring effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            header.classList.add("shadow-md", "border-primary/20");
            header.classList.remove("border-secondary");
        } else {
            header.classList.remove("shadow-md", "border-primary/20");
            header.classList.add("border-secondary");
        }
    });

    // 3. Newsletter Submission Simulation
    const signupForm = document.querySelector("aside form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = signupForm.querySelector("input[type='email']");
            if (input && input.value.trim() !== "") {
                const parent = signupForm.parentElement;
                
                // Animate transition
                signupForm.style.opacity = "0";
                setTimeout(() => {
                    signupForm.classList.add("hidden");
                    
                    const successMessage = document.createElement("div");
                    successMessage.className = "text-primary font-bold text-center py-stack-md border border-primary/20 bg-primary/5 rounded font-body-md animate-fade-in";
                    successMessage.innerHTML = `✓ Thank you! <br><span class="text-on-surface font-normal">${input.value.trim()}</span> has been subscribed to the Mundana Newsletter.`;
                    
                    parent.appendChild(successMessage);
                }, 300);
            }
        });
    }

    // 4. Subtle cards elevation on hover
    const articles = document.querySelectorAll("article");
    articles.forEach(art => {
        art.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        art.addEventListener("mouseenter", () => {
            art.style.transform = "translateY(-2px)";
        });
        art.addEventListener("mouseleave", () => {
            art.style.transform = "translateY(0)";
        });
    });
});
