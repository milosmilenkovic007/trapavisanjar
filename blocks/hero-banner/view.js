// ✅ PRAVILAN IMPORT
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, AnimationMixer, Clock, Raycaster, Vector2, LoopOnce } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 DOM Loaded - Three.js Initialized!");

    // ✅ Pronađi Three.js kontejner
    const container = document.querySelector(".three-container");
    if (!container) {
        console.error("❌ ERROR: Element .three-container NOT FOUND!");
        return;
    }

    // ✅ Preuzmi model URL iz hero-banner bloka
    const heroBanner = document.querySelector(".wp-block-trapavisanjar-hero-banner");
    if (!heroBanner) {
        console.error("❌ ERROR: Hero banner block NOT FOUND!");
        return;
    }

    const modelUrl = heroBanner.getAttribute("data-glb-url");
    if (!modelUrl) {
        console.error("❌ ERROR: Model URL is MISSING!");
        return;
    }

    console.log("✅ Model URL:", modelUrl);

    // ✅ Kreiranje Three.js scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

    // ✅ PODEŠAVANJE POČETNOG UGLa KAMERE
    camera.position.set(1, 1.5, 8); // Pomerena kamera
    camera.lookAt(0, 1, 0);  // Gleda blago iznad centra modela
    

    // ✅ Renderer - full screen
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    console.log("✅ Renderer created and appended!");

    // ✅ Dodaj svetla
    const ambientLight = new AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // ✅ OrbitControls (za rotaciju mišem)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    console.log("✅ OrbitControls added!");

    // ✅ GLTF Loader
    const loader = new GLTFLoader();
    console.log("🔄 Loading model...");

    let mixer; // Three.js Animation Mixer
    const clock = new Clock();
    let action; // Akcija za animaciju
    let model;  // GLTF model
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    let isPaused = false;  // Da li je animacija pauzirana?
    let isPlaying = false; // Da li je animacija u toku?
    let isFinished = true; // Da li je animacija završena?

    loader.load(
        modelUrl,
        function (gltf) {
            model = gltf.scene;
            scene.add(model);
            model.position.set(0, 0, 0); // Centriraj model
            model.scale.set(1, 1, 1); // Reset skaliranja
          



            console.log("✅ Model loaded!", model);

            // ✅ Ako model ima animacije, učitaj prvu
            if (gltf.animations.length > 0) {
                mixer = new AnimationMixer(model);
                action = mixer.clipAction(gltf.animations[0]); // Uzimamo prvu animaciju
                action.clampWhenFinished = true; // Stopira se nakon završetka
                action.setLoop(LoopOnce); // ✅ Loop samo jednom

                // ✅ Detektujemo kada se animacija završi preko MIXER-a
                mixer.addEventListener("finished", () => {
                    console.log("✅ Animation finished!");
                    isFinished = true;
                    isPlaying = false;
                    isPaused = false;
                });

                console.log("🎬 Animation loaded but NOT playing.");
            } else {
                console.warn("⚠️ No animations found in GLTF file.");
            }

            // ✅ Pokretanje render petlje
            function animate() {
                requestAnimationFrame(animate);
                const delta = clock.getDelta();
                if (mixer) mixer.update(delta);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
            console.log("✅ Animation loop started!");
        },
        function (xhr) {
            console.log(`⌛ Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        function (error) {
            console.error("❌ ERROR loading model:", error);
        }
    );

    // ✅ Funkcija za detekciju klika na model
    function onClick(event) {
        // Normalizovane koordinate miša (-1 do 1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(model, true);

        if (intersects.length > 0 && action) {
            if (isFinished) {
                // ✅ Restart animacije nakon završetka
                console.log("▶️ Restarting animation!");
                action.reset(); // Resetuje animaciju
                action.play();
                isFinished = false;
                isPaused = false;
                isPlaying = true;
            } else if (isPlaying) {
                // ✅ Pauziraj animaciju ako je u toku
                console.log("⏸️ Pausing animation!");
                action.paused = true;
                isPaused = true;
                isPlaying = false;
            } else if (isPaused) {
                // ✅ Nastavi animaciju ako je pauzirana
                console.log("▶️ Resuming animation!");
                action.paused = false;
                isPaused = false;
                isPlaying = true;
            }
        }
    }

    // ✅ Dodaj event listener za klik na knjigu
    window.addEventListener("click", onClick);

    // ✅ Resize event za full width i height
    window.addEventListener("resize", function () {
        console.log("🔄 Resizing...");
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});