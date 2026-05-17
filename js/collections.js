// MUNDANA Culture Page Interactions

// Dynamically Inject Mobile Drawer Menu
function createMobileDrawer() {
    if (document.getElementById("mobile-menu")) return;

    const drawer = document.createElement("div");
    drawer.id = "mobile-menu";
    drawer.className = "fixed inset-0 z-40 bg-background flex flex-col justify-center items-center gap-stack-lg transition-transform duration-300 translate-x-full md:hidden";
    drawer.innerHTML = `
        <span class="material-symbols-outlined absolute top-6 right-6 text-primary cursor-pointer text-display-lg" id="close-drawer">close</span>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="index.html">Intro</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="culture.html">Culture</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="tech.html">Tech</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="politics.html">Politics</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="health.html">Health</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="collections.html">Collections</a>
        <a class="font-display-lg text-display-lg text-on-surface hover:text-primary transition-colors" href="about.html">About</a>
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

    // 3. Article Scroll Progress Indicator (Premium Micro-Feature)
    const progressContainer = document.createElement("div");
    progressContainer.className = "fixed top-[73px] left-0 w-full h-1 bg-secondary/10 z-50 md:top-[88px]";
    const progressBar = document.createElement("div");
    progressBar.className = "h-full bg-primary w-0 transition-all duration-100";
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });

    // 4. Newsletter Submission Simulation
    const signupForm = document.querySelector("form");
    // Find form inside container that is a newsletter sign up (usually has Sign Up button)
    const signupButton = document.querySelector("button[type='submit']") || Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Sign Up"));

    if (signupButton) {
        const targetForm = signupButton.closest("form");
        if (targetForm) {
            targetForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const input = targetForm.querySelector("input[type='email']");
                if (input && input.value.trim() !== "") {
                    const parent = targetForm.parentElement;

                    targetForm.style.opacity = "0";
                    setTimeout(() => {
                        targetForm.classList.add("hidden");

                        const successMessage = document.createElement("div");
                        successMessage.className = "text-primary font-bold text-center py-stack-md border border-primary/20 bg-primary/5 rounded font-body-md animate-fade-in";
                        successMessage.innerHTML = `✓ Thank you! <br><span class="text-on-surface font-normal">${input.value.trim()}</span> has been subscribed to the Mundana Newsletter.`;

                        parent.appendChild(successMessage);
                    }, 300);
                }
            });
        }
    }

    // 5. Social Share Action Feedback
    const shareLinks = document.querySelectorAll("aside a[href='javascript:void(0)']");
    shareLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Flash notification toast
            const toast = document.createElement("div");
            toast.className = "fixed bottom-8 right-8 bg-primary text-white px-stack-lg py-stack-md rounded-lg shadow-xl font-label-md tracking-wider text-label-md animate-fade-in-up z-50";
            toast.innerText = "✓ LINK COPIED TO CLIPBOARD & SHARED";
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.add("opacity-0", "transition-opacity", "duration-500");
                setTimeout(() => toast.remove(), 500);
            }, 2000);
        });
    });
});
