// ✅ PRAVILAN IMPORT
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Box3, Vector3, Clock, AnimationMixer } from "three";
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
    camera.position.set(0, 1, 5); // Privremena pozicija kamere

    // ✅ Renderer - zauzima ceo ekran
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "25%";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";
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

    loader.load(
        modelUrl,
        function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            console.log("✅ Model loaded!", model);

            // 📌 AUTOMATSKO CENTRIRANJE I SKALIRANJE MODELA
            const box = new Box3().setFromObject(model);
            const size = new Vector3();
            box.getSize(size);

            const maxSize = Math.max(size.x, size.y, size.z);
            const desiredSize = 2;
            const scale = desiredSize / maxSize;
            model.scale.set(scale, scale, scale);

            const center = new Vector3();
            box.getCenter(center);
            model.position.sub(center);

            const cameraDistance = maxSize * 1.5;
            camera.position.set(0, size.y / 2, cameraDistance);
            camera.lookAt(0, 0, 0);

            console.log("📏 Model scaled & centered!", { scale, cameraDistance });

            // ✅ Ako model ima animacije, pokreće ih
            if (gltf.animations.length > 0) {
                mixer = new AnimationMixer(model);
                gltf.animations.forEach((clip) => {
                    const action = mixer.clipAction(clip);
                    action.play();
                });
                console.log("🎬 GLTF Animations started!");
            } else {
                console.warn("⚠️ No animations found in GLTF file. Rotating manually.");
            }

            // ✅ Pokretanje animacije
            function animate() {
                requestAnimationFrame(animate);

                // Ako nema animacija, rotiramo model ručno
                if (!mixer) {
                    model.rotation.y += 0.005;
                } else {
                    mixer.update(clock.getDelta());
                }

                controls.update(); // OrbitControls update
                renderer.render(scene, camera);
            }
            animate();
            console.log("✅ Animation started!");
        },
        function (xhr) {
            console.log(`⌛ Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        function (error) {
            console.error("❌ ERROR loading model:", error);
        }
    );

    // ✅ Resize event za full width i height
    window.addEventListener("resize", function () {
        console.log("🔄 Resizing...");
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
