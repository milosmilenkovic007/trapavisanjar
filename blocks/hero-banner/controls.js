export function initControls(model, camera, gsap, action, mixer) {
    console.log("✅ Controls Initialized!");

    // ✅ Kreiranje kontejnera za kontrole
    const controlsContainer = document.createElement("div");
    controlsContainer.classList.add("three-controls");
    controlsContainer.innerHTML = `
        <button id="rotateLeft">⬅ Rotate Left</button>
        <button id="rotateRight">Rotate Right ➡</button>
        <button id="rotateUp">⬆ Rotate Up</button>
        <button id="rotateDown">Rotate Down ⬇</button>
        <button id="openBook">📖 Open Book</button>
    `;
    document.body.appendChild(controlsContainer);

    // ✅ Dugme "Open Book"
    const openBookBtn = document.getElementById("openBook");

    // ✅ Stanje animacije
    let isPlaying = false;
    let isPaused = false;

    function toggleBookAnimation() {
        if (!action) {
            console.warn("⚠️ No animation found in model!");
            return;
        }

        if (!isPlaying) {
            console.log("▶️ Starting animation...");
            action.reset();
            action.play();
            isPlaying = true;
            isPaused = false;
            openBookBtn.innerHTML = "⏸ Pause"; // Menja tekst na dugmetu

            // ✅ **DODAJ GSAP ANIMACIJU ZA KAMERU KAO NA KLIKU NA KNJIGU**
            gsap.to(camera.position, {
                x: 0,
                y: 0,
                z: 6,
                duration: 1.5,
                onUpdate: () => camera.lookAt(0, 0, 0)
            });

        } else if (isPlaying && !isPaused) {
            console.log("⏸ Pausing animation...");
            action.paused = true;
            isPaused = true;
            openBookBtn.innerHTML = "▶ Play"; // Menja tekst na dugmetu
        } else if (isPaused) {
            console.log("▶ Resuming animation...");
            action.paused = false;
            isPaused = false;
            openBookBtn.innerHTML = "⏸ Pause"; // Menja tekst na dugmetu
        }
    }

    // ✅ Event listener za dugme "Open Book"
    openBookBtn.addEventListener("click", toggleBookAnimation);

    // ✅ Kada se animacija završi, resetuj dugme na "Open Book"
    if (mixer) {
        mixer.addEventListener("finished", () => {
            console.log("✅ Animation finished!");
            isPlaying = false;
            isPaused = false;
            openBookBtn.innerHTML = "📖 Open Book";

            // ✅ VRATI KAMERU U POČETNU POZICIJU
            gsap.to(camera.position, {
                x: 1,
                y: 1.5,
                z: 8,
                duration: 1.5,
                onUpdate: () => camera.lookAt(0, 1, 0)
            });
        });
    }

    // ✅ Event listeneri za rotaciju
    document.getElementById("rotateLeft").addEventListener("click", () => {
        gsap.to(model.rotation, { y: model.rotation.y + Math.PI / 8, duration: 0.5 });
    });

    document.getElementById("rotateRight").addEventListener("click", () => {
        gsap.to(model.rotation, { y: model.rotation.y - Math.PI / 8, duration: 0.5 });
    });

    document.getElementById("rotateUp").addEventListener("click", () => {
        gsap.to(model.rotation, { x: model.rotation.x - Math.PI / 8, duration: 0.5 });
    });

    document.getElementById("rotateDown").addEventListener("click", () => {
        gsap.to(model.rotation, { x: model.rotation.x + Math.PI / 8, duration: 0.5 });
    });
}
