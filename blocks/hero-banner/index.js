import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit.js';
import Save from './save.js';

// Funkcija za registraciju bloka
const registerHeroBannerBlock = () => {
    registerBlockType("trapavisanjar/hero-banner", {
        title: "Hero Banner",
        category: "design",
        icon: "cover-image",
        supports: { html: false },
        attributes: {
            bgImage: { type: "string", default: "" },
            title: { type: "string", default: "Hero Title" },
            lottieJson: { type: "string", default: "" },
            description: { type: "string", default: "Short description here..." }
        },
        edit: Edit,
        save: Save
    });
};

// Proveravamo da li je wp.blocks dostupan i registrujemo blok
if (typeof wp !== "undefined" && typeof wp.blocks !== "undefined") {
    registerHeroBannerBlock();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        if (typeof wp !== "undefined" && typeof wp.blocks !== "undefined") {
            registerHeroBannerBlock();
        }
    });
}