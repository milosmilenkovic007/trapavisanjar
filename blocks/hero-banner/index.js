const registerHeroBannerBlock = () => {
    if (wp.blocks.getBlockType("trapavisanjar/hero-banner")) {
        return; // Blok je već registrovan, nema potrebe za duplom registracijom
    }

    wp.blocks.registerBlockType("trapavisanjar/hero-banner", {
        title: "Hero Banner",
        category: "layout",
        icon: "cover-image",
        supports: { html: false },
        edit: () => wp.element.createElement("div", {}, "Hero Banner - Gutenberg Blok"),
        save: () => wp.element.createElement("div", {}, "Hero Banner - Gutenberg Blok")
    });
};

// Proveravamo da li je wp.blocks dostupan
if (typeof wp !== "undefined" && typeof wp.blocks !== "undefined") {
    registerHeroBannerBlock();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        if (typeof wp !== "undefined" && typeof wp.blocks !== "undefined") {
            registerHeroBannerBlock();
        }
    });
}

// Očekujemo da se blok pojavi u listi blokova
setTimeout(() => {
    if (typeof wp !== "undefined" && typeof wp.blocks !== "undefined") {
        wp.blocks.getBlockType("trapavisanjar/hero-banner");
    }
}, 3000);
