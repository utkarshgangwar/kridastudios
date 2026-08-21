const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
const hoverSound = document.getElementById("hoverSound");
const content = document.getElementById("content");

const consentModal = document.getElementById("consentModal");
const acceptConsentBtn = document.getElementById("acceptConsent");
const gamesList = document.getElementById("gamesList");

let audioEnabled = false;

/* -------- ACCEPT CONSENT -------- */
acceptConsentBtn.addEventListener("click", () => {

    audioEnabled = true;

    // unlock music
    music.muted = false;
    music.volume = 0.6;

    music.play().then(() => {
        musicBtn.textContent = "⏸";
    }).catch(() => { });

    // prepare hover sound
    hoverSound.volume = 0.4;

    // save consent
    localStorage.setItem("kridaConsent", "true");

    // hide modal
    consentModal.classList.add("hidden");
});

/* -------- PLAY / PAUSE BUTTON -------- */
musicBtn.addEventListener("click", () => {
    if (!audioEnabled) return;

    if (music.paused) {
        music.play();
        musicBtn.textContent = "⏸";
    } else {
        music.pause();
        musicBtn.textContent = "▶";
    }
});

/* -------- HOVER SOUND -------- */
let hoverCooldown = false;

document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        if (!audioEnabled || hoverCooldown) return;

        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => { });

        hoverCooldown = true;
        setTimeout(() => hoverCooldown = false, 120);
    });
});


/* -------- CONTENT SWITCH -------- */
const sections = {
    home: `Kridā Studios is an independent creative studio building immersive games and interactive digital experiences across mobile and web.

We blend gameplay, sound, and thoughtful design to create products that feel responsive, engaging, and alive. From mobile games to custom web applications, we approach every project with clarity, performance, and player-first experiences.

Small team. Big ideas. Built to scale.`,

    about: `Kridā Studios is a small, agile team of developers, designers, and creators working at the intersection of games, mobile, and the web.

We primarily build mobile games using React Native, while also creating modern web applications and interactive platforms. Our size allows us to move fast, adapt quickly, and experiment freely.

If it can be imagined and shipped, we’ll find a way to build it.`,

    games: `
We design and develop mobile-first games that focus on immersion, responsiveness, and long-term engagement.
<br><br>
<a href="games.html" class="games-cta-btn">Explore Our Games →</a>
`,

    contact: `Interested in building a game, a web app, or something entirely new?

We collaborate with creators, studios, and partners on projects ranging from mobile games to full-scale web applications. Whether you have a clear plan or just an idea, we’re always open to conversations.

studioskrida@gmail.com`
};


document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const section = btn.dataset.section;

        content.style.opacity = 0;

        setTimeout(() => {
            content.innerHTML = sections[section];
            content.style.opacity = 1;
        }, 200);

        const pageContent = document.querySelector(".page-content");

        if (section === "games") {
            pageContent.classList.add("static-flow");
        } else {
            pageContent.classList.remove("static-flow");
        }
    });
});


