/**
 * Dynamic BASE_URL config.
 * - On localhost / 127.0.0.1  →  direct to backend (local dev or Docker on same machine)
 * - On any other IP / hostname →  /api  (Nginx reverse proxy, remote access from other devices)
 */
const BASE_URL = (() => {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
        return "http://localhost:8080";
    }
    return "/api";
})();
