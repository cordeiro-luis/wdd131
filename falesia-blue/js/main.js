// --- UI LABELS DICTIONARY ---
const UI_TEXTS = {
    pt: {
        exploreDestinations: "Explorar Destinos",
        todaysSpot: "Destaque do Dia",
        explore: "Explorar",
        waterTemp: "Temp. Água",
        swell: "Ondulação",
        tide: "Maré",
        wind: "Vento",
        sunSafety: "Índice UV",
        directions: "Como Chegar",
        verdictTitle: "Avaliação de Segurança",
        webcam: "Câmara em Direto",
        facilities: "Infraestruturas & Acessos",
        officialSource: "Fonte Oficial",
        jellyfish: "Medusas",
        weatherAir: "Clima & Ar",
        sun: "Sol",
        waterQuality: "Qualidade da Água",
        nearMe: "Perto de Mim",
        locationError: "Não foi possível obter a sua localização.",
        noBeachesNearby: "Nenhuma praia a menos de 15 km. A mostrar as mais próximas!",
        regions: {
            "All": "Todas",
            "Arrábida": "Arrábida",
            "Cascais": "Cascais",
            "Sintra": "Sintra",
            "Costa da Caparica": "Costa da Caparica",
            "Azores": "Açores",
            "Algarve": "Algarve"
        }
    },
    en: {
        exploreDestinations: "Explore Destinations",
        todaysSpot: "Today's Spot",
        explore: "Explore",
        waterTemp: "Water Temp",
        swell: "Swell",
        tide: "Tide",
        wind: "Wind",
        sunSafety: "Sun Safety",
        directions: "Directions",
        verdictTitle: "Daily Safety Verdict",
        webcam: "Live Webcam",
        facilities: "Facilities & Access",
        officialSource: "Official Source",
        jellyfish: "Jellyfish Status",
        weatherAir: "Weather & Air",
        sun: "Sun Schedule",
        waterQuality: "Water Quality",
        nearMe: "Near Me",
        locationError: "Unable to retrieve your location.",
        noBeachesNearby: "No beaches within 15 km. Showing closest spots!",
        regions: {
            "All": "All",
            "Arrábida": "Arrábida",
            "Cascais": "Cascais",
            "Sintra": "Sintra",
            "Costa da Caparica": "Costa da Caparica",
            "Azores": "Azores",
            "Algarve": "Algarve"
        }
    }
};

// --- AMENITIES CONFIGURATION ---
const AMENITIES_MAP = {
    parking: { icon: "🚗", en: "Parking", pt: "Estacionamento" },
    restaurant: { icon: "🍽️", en: "Restaurants", pt: "Restaurantes" },
    lifeguard: { icon: "🧑‍⚕️", en: "Lifeguard", pt: "Nadador-Salvador" },
    shower: { icon: "🚿", en: "Showers", pt: "Chuveiros" },
    sunbed: { icon: "🪑", en: "Sunbeds", pt: "Espreguiçadeiras" },
    accessibility: { icon: "♿", en: "Accessible", pt: "Acessibilidade" },
    water_sports: { icon: "🛶", en: "Water Sports", pt: "Desportos Náuticos" },
    toilet: { icon: "🚽", en: "Toilets", pt: "Casas de Banho" }
};

// State Variables
let beachesData = [];
let metaLastUpdated = null;
let currentLang = document.documentElement.lang || 'pt';
let lastActiveElement = null;
let currentModalBeachId = null;

// DOM Elements
const gridContainer = document.getElementById('beaches-grid');
const heroContainer = document.getElementById('hero-suggestion');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('details-modal');
const modalContent = document.getElementById('modal-dynamic-content');

// --- HELPER FUNCTIONS ---

function updateFilterNavLabels() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const regionTranslations = UI_TEXTS[currentLang].regions;

    filterBtns.forEach(btn => {
        const regionKey = btn.getAttribute('data-region');
        if (regionKey && regionTranslations[regionKey]) {
            btn.textContent = regionTranslations[regionKey];
        }
    });
}

// --- TOAST NOTIFICATION HELPER ---
function showToast(message, duration = 3500) {
    let toast = document.getElementById('app-toast');

    // Create element if it doesn't exist yet
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    // Automatically hide after duration
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// --- HAVERSINE DISTANCE HELPER ---
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in KM
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// --- GPS "NEAR ME" FILTER HANDLER ---
function setupNearMeFilter() {
    const nearMeBtn = document.querySelector('.filter-btn[data-region="near-me"]');
    if (!nearMeBtn) return;

    nearMeBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showToast(`⚠️ ${UI_TEXTS[currentLang].locationError}`);
            return;
        }

        const originalText = nearMeBtn.textContent;
        nearMeBtn.textContent = "📍 ...";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // 1. Calculate distance for all beaches and sort closest -> furthest
                const allSortedBeaches = beachesData.map(beach => {
                    const beachLat = beach.coordinates?.lat ?? beach.lat ?? beach.latitude ?? beach.location?.lat;
                    const beachLng = beach.coordinates?.lng ?? beach.lng ?? beach.longitude ?? beach.location?.lng;

                    let distKm = null;
                    if (beachLat !== undefined && beachLat !== null && beachLng !== undefined && beachLng !== null) {
                        distKm = calculateDistanceKm(userLat, userLng, Number(beachLat), Number(beachLng));
                    }
                    return { ...beach, distanceKm: distKm };
                })
                .filter(b => b.distanceKm !== null)
                .sort((a, b) => a.distanceKm - b.distanceKm);

                // 2. Filter strictly within 15 km radius
                const MAX_RADIUS_KM = 15;
                let displayBeaches = allSortedBeaches.filter(b => b.distanceKm <= MAX_RADIUS_KM);

                // Fallback: If no beaches are within 15km, show top 5 closest
                if (displayBeaches.length === 0 && allSortedBeaches.length > 0) {
                    displayBeaches = allSortedBeaches.slice(0, 5);
                    showToast(`📍 ${UI_TEXTS[currentLang].noBeachesNearby}`);
                } else if (displayBeaches.length > 0) {
                    showToast(`📍 ${displayBeaches.length} ${currentLang === 'pt' ? 'praias encontradas a < 15 km' : 'beaches found < 15 km'}`);
                }

                // Update UI button state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                nearMeBtn.classList.add('active');
                nearMeBtn.textContent = `📍 ${UI_TEXTS[currentLang].nearMe || 'Near Me'}`;

                // Render cards
                renderCards(displayBeaches, true);
            },
            (error) => {
                console.warn('Geolocation error:', error);
                nearMeBtn.textContent = originalText;

                let errorMsg = UI_TEXTS[currentLang].locationError;
                if (error.code === error.PERMISSION_DENIED) {
                    errorMsg = currentLang === 'pt' ? 'Permissão de localização negada.' : 'Location permission denied.';
                } else if (error.code === error.TIMEOUT) {
                    errorMsg = currentLang === 'pt' ? 'Sinal de GPS fraco. Tente novamente.' : 'GPS signal weak. Please try again.';
                }

                showToast(`⚠️ ${errorMsg}`);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 300000
            }
        );
    });
}

function getText(field) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field['en'] || field['pt'] || '';
}

// Checks if current loaded metadata is older than 60 minutes (or missing)
function isDataStale() {
    if (!metaLastUpdated) return true;
    const lastUpdated = new Date(metaLastUpdated).getTime();
    if (isNaN(lastUpdated)) return true;

    const diffInMinutes = Math.floor((Date.now() - lastUpdated) / (1000 * 60));
    return diffInMinutes >= 60;
}

function getLiveBadgeHTML(timestamp) {
    if (!timestamp) {
        const fallbackText = currentLang === 'pt' ? 'DADOS RECENTES' : 'RECENT DATA';
        return `<div id="live-badge" class="live-status-badge stale">
            <span class="badge-dot"></span> 🕒 ${fallbackText}
        </div>`;
    }

    const lastUpdated = new Date(timestamp).getTime();
    const now = Date.now();
    const diffInMinutes = Math.floor((now - lastUpdated) / (1000 * 60));
    const ONE_HOUR_MINUTES = 60;

    if (isNaN(lastUpdated) || diffInMinutes >= ONE_HOUR_MINUTES) {
        const hoursAgo = Math.floor(diffInMinutes / 60) || 1;
        const staleText = currentLang === 'pt'
            ? `ATUALIZADO HÁ ${hoursAgo}H`
            : `UPDATED ${hoursAgo}H AGO`;

        return `<div id="live-badge" class="live-status-badge stale">
            <span class="badge-dot"></span> 🕒 ${staleText}
        </div>`;
    }

    const liveText = currentLang === 'pt' ? '⚡ DADOS EM TEMPO REAL' : '⚡ LIVE DATA';
    return `<div id="live-badge" class="live-status-badge live">
        <span class="badge-dot"></span> ${liveText}
    </div>`;
}

function getSafetyBadgeInfo(flag) {
    switch (flag?.toLowerCase()) {
        case 'red':
            return { cssClass: "hint-danger", text: "Danger", verdictClass: "verdict-danger" };
        case 'yellow':
            return { cssClass: "hint-caution", text: "Caution", verdictClass: "verdict-caution" };
        case 'green':
        default:
            return { cssClass: "hint-safe", text: "Safe", verdictClass: "verdict-safe" };
    }
}

function renderAmenitiesHTML(amenityKeys) {
    if (!amenityKeys || !amenityKeys.length) return '';
    return amenityKeys.map(key => {
        const item = AMENITIES_MAP[key];
        if (!item) return '';
        const label = item[currentLang] || item.en;
        return `<span class="amenity-tag">${item.icon} ${label}</span>`;
    }).join('');
}

function renderWebcamHTML(beach) {
    const webcam = beach.webcam || beach.webcamUrl || beach.live?.webcam;
    if (!webcam) return '';

    const webcamUrl = typeof webcam === 'object' ? webcam.url : webcam;
    if (!webcamUrl || typeof webcamUrl !== 'string' || !webcamUrl.trim()) return '';

    const label = UI_TEXTS[currentLang].webcam;
    const isEmbeddable = webcamUrl.includes('embed') || webcamUrl.includes('player') || webcamUrl.includes('youtube.com/embed');

    if (isEmbeddable) {
        return `
            <div class="modal-webcam-block">
                <h4>📹 ${label}</h4>
                <div class="webcam-responsive-frame">
                    <iframe src="${webcamUrl}" title="${beach.name} Webcam" frameborder="0" allowfullscreen loading="lazy"></iframe>
                </div>
            </div>
        `;
    }

    return `
        <div class="modal-webcam-block">
            <a href="${webcamUrl}" target="_blank" rel="noopener noreferrer" class="webcam-direct-btn">
                📹 ${label}
            </a>
        </div>
    `;
}

// Extracts ALL live & static details into dynamic key-value rows
function getExtendedDetailRows(beach) {
    const rows = [];
    const isPt = currentLang === 'pt';
    const live = beach.live || {};
    const labels = UI_TEXTS[currentLang];

    // 1. Weather & Air Condition
    if (live.weather) {
        const w = live.weather;
        const temp = w.formattedAirTemp || (w.airTemp ? `${w.airTemp}°C` : '');
        const cond = getText(w.condition);
        const icon = w.icon || w.condition?.icon || '';
        const parts = [temp, cond, icon].filter(Boolean);

        if (parts.length > 0) {
            rows.push({
                label: `🌤️ ${labels.weatherAir}`,
                value: parts.join(' • ')
            });
        }
    }

    // 2. Sun Schedule
    if (live.sun && (live.sun.sunrise || live.sun.sunset)) {
        rows.push({
            label: `☀️ ${labels.sun}`,
            value: `🌅 ${live.sun.sunrise || '-'} &nbsp;|&nbsp; 🌇 ${live.sun.sunset || '-'}`
        });
    }

    // 3. Water Quality & Badges
    if (live.waterQuality) {
        const wq = live.waterQuality;
        const qStatus = getText(wq.status);
        const awards = [];

        if (wq.blueFlag) awards.push(isPt ? '🔷 Bandeira Azul' : '🔷 Blue Flag');
        if (wq.goldQuality) awards.push(isPt ? '🏆 Qualidade de Ouro' : '🏆 Gold Quality');

        let qualityText = qStatus;
        if (wq.lastTested) {
            qualityText += ` (${isPt ? 'Teste' : 'Tested'}: ${wq.lastTested})`;
        }

        if (awards.length > 0) {
            qualityText += qualityText ? ` • ${awards.join(' • ')}` : awards.join(' • ');
        }

        if (qualityText) {
            rows.push({
                label: `💧 ${labels.waterQuality}`,
                value: qualityText
            });
        }
    }

    // 4. Extra Local Info / Description Notes
    if (beach.extraDetails && Array.isArray(beach.extraDetails)) {
        beach.extraDetails.forEach(item => {
            const labelStr = getText(item.label);
            const valueStr = getText(item.value);
            if (labelStr && valueStr) {
                rows.push({ label: labelStr, value: valueStr });
            }
        });
    }

    // 5. Jellyfish Status
    if (live.jellyfish) {
        const j = live.jellyfish;
        const jStatus = getText(j.status);
        const jMsg = getText(j.message);
        if (jStatus) {
            rows.push({
                label: `🪼 ${labels.jellyfish}`,
                value: `${jStatus}${jMsg ? ' — ' + jMsg : ''}`
            });
        }
    }

    // 6. Official APA Facilities & Warnings
    if (beach.apaFacilities) {
        const fac = beach.apaFacilities;
        const active = [];

        if (fac.showers) active.push(isPt ? 'Duches' : 'Showers');
        if (fac.restrooms) active.push(isPt ? 'WCs' : 'Restrooms');
        if (fac.firstAid) active.push(isPt ? 'Posto de Primeiros Socorros' : 'First Aid Station');
        if (fac.amphibiousChair) active.push(isPt ? 'Cadeira Anfíbia' : 'Amphibious Chair');
        if (fac.landslideRisk) active.push(isPt ? '⚠️ Risco de Arriba' : '⚠️ Landslide Warning');

        if (active.length > 0) {
            rows.push({
                label: `🏖️ ${labels.facilities}`,
                value: active.join(' • ')
            });
        }
    }

    // 7. Official SNIRH Link
    if (beach.officialAPAInfo?.snirhUrl) {
        const euCodeStr = beach.euCode ? ` (${beach.euCode})` : '';
        rows.push({
            label: `🔗 ${labels.officialSource}`,
            value: `<a href="${beach.officialAPAInfo.snirhUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">Relatório APA / SNIRH${euCodeStr}</a>`
        });
    }

    return rows;
}

// --- INITIALIZATION ---

window.addEventListener('DOMContentLoaded', async () => {
    await loadBeachesData();
    setupModalClose();
    setupLangSwitcher();
    updateFilterNavLabels();
});

async function loadBeachesData() {
    try {
        const cacheBuster = new Date().getTime();
        const response = await fetch(`data/beaches-live.json?t=${cacheBuster}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        beachesData = data.beaches || [];
        metaLastUpdated = data.meta?.lastUpdated || null;

        setupHeroSuggestion();

        const defaultRegion = 'Arrábida';
        const filtered = beachesData.filter(b => b.region === defaultRegion);
        renderCards(filtered.length ? filtered : beachesData);

        const defaultBtn = document.querySelector(`.filter-btn[data-region="${defaultRegion}"]`);
        if (defaultBtn) defaultBtn.classList.add('active');

        setupFilters();
        setupNearMeFilter();

    } catch (error) {
        console.error('Failed to load beaches dataset:', error);
        if (gridContainer) {
            gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">Unable to load beach conditions. Please try again later.</p>`;
        }
    }
}

// --- HERO FEATURED SPOT ---

function getDailySpot(beaches) {
    if (!beaches || beaches.length === 0) return null;

    const today = new Date().toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
        hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % beaches.length;
    return beaches[index];
}

function setupHeroSuggestion() {
    if (!beachesData.length || !heroContainer) return;

    const suggestion = getDailySpot(beachesData);
    if (!suggestion) return;

    const live = suggestion.live || {};

    heroContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45)), url('${suggestion.detailImg || suggestion.img}')`;

    const description = getText(suggestion.description);
    const textDescription = description
        ? description.substring(0, 120) + "..."
        : "Calm water, perfect for swimming!";

    const tempFormatted = live.waterTemp?.formatted || "-";
    const swellFormatted = live.swell?.formatted || "-";
    const swellLabel = UI_TEXTS[currentLang].swell;

    heroContainer.setAttribute('role', 'region');
    heroContainer.setAttribute('aria-label', "Today's Featured Beach Spot");

    heroContainer.innerHTML = `
    <div class="hero-glass-card">
        <span class="hero-tag">${UI_TEXTS[currentLang].todaysSpot}</span>
        <h2 class="hero-title">${suggestion.name}</h2>
        <p class="hero-description">${textDescription}</p>
        
        <div class="hero-meta-row">
            <div class="meta-item">
                <span class="hero-icon" aria-hidden="true">🌡️</span>
                <span>${tempFormatted}</span>
            </div>
            <span class="meta-divider" aria-hidden="true">|</span>
            <div class="meta-item">
                <span class="hero-icon" aria-hidden="true">🌊</span>
                <span>${swellLabel}: ${swellFormatted}</span>
            </div>
        </div>
        
        <button class="hero-btn" id="hero-explore-btn" aria-label="Explore details for ${suggestion.name}">${UI_TEXTS[currentLang].explore}</button>
    </div>`;

    document.getElementById('hero-explore-btn').addEventListener('click', () => {
        openDetails(suggestion.id || suggestion.name);
    });
}

// --- BEACH CARDS GRID ---

function renderCards(beaches, isNearMeMode = false) {
    if (!gridContainer) return;
    gridContainer.innerHTML = "";

    beaches.forEach(beach => {
        const card = document.createElement('div');
        card.className = 'beach-card';
        card.setAttribute('data-beach', beach.id || beach.name);

        const live = beach.live || {};
        const statusInfo = getSafetyBadgeInfo(live.safety?.flag);
        const waterTemp = live.waterTemp?.formatted || "-";

        const locationLabel = (isNearMeMode && beach.distanceKm !== undefined)
            ? `📍 ${beach.distanceKm.toFixed(1)} km`
            : `📍 ${beach.region}`;

        card.innerHTML = `
            <span class="status-badge ${statusInfo.cssClass}" title="Status: ${statusInfo.text}"></span>
            <img src="${beach.img}" alt="${beach.name}" loading="lazy">
            <div class="card-info">
                <h3>${beach.name}</h3>
                <div class="card-meta-layout">
                    <p>${locationLabel}</p>
                    <span class="card-temp">🌡️ ${waterTemp}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openDetails(beach.id || beach.name));
        gridContainer.appendChild(card);
    });
}

// --- REGION FILTERS ---

function setupFilters() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const selectedRegion = e.target.getAttribute('data-region');
            const filtered = beachesData.filter(beach => beach.region === selectedRegion);
            renderCards(filtered);
        });
    });
}

// --- MODAL DETAILS POPUP ---

async function openDetails(beachIdentifier) {
    if (isDataStale()) {
        await loadBeachesData();
    }

    const beach = beachesData.find(b => b.id === beachIdentifier || b.name === beachIdentifier);
    if (!beach) return;

    currentModalBeachId = beachIdentifier;
    lastActiveElement = document.activeElement;

    const live = beach.live || {};
    const labels = UI_TEXTS[currentLang];

    const waterTemp = live.waterTemp?.formatted || "-";
    const swell = live.swell?.formatted || "-";
    const tide = live.tide?.formatted || "-";
    const wind = live.wind?.formatted || "-";
    const uv = live.uv?.formatted || "-";

    const badgeInfo = getSafetyBadgeInfo(live.safety?.flag);
    const verdictTitle = getText(live.safety?.verdict) || labels.verdictTitle;
    const verdictMessage = getText(live.safety?.message) || "Check ocean conditions prior to swimming.";

    const statusBadgeHTML = getLiveBadgeHTML(metaLastUpdated);
    const webcamHTML = renderWebcamHTML(beach);

    const detailRows = getExtendedDetailRows(beach);
    let extraDetailsHTML = "";
    if (detailRows.length > 0) {
        const rowsHTML = detailRows.map(item => `
            <div class="extra-detail-row">
                <span class="extra-detail-label">${item.label}</span>
                <span class="extra-detail-value">${item.value}</span>
            </div>
        `).join('');

        extraDetailsHTML = `<div class="extra-details-container">${rowsHTML}</div>`;
    }

    const amenitiesHTML = renderAmenitiesHTML(beach.amenities);

    const mapsQuery = encodeURIComponent(`${beach.name}, ${beach.region}, Portugal`);
    const mapsURL = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'modal-title');

    modalContent.innerHTML = `
        <div class="modal-card-container">
            <img src="${beach.detailImg || beach.img}" alt="${beach.name}" class="modal-landscape-img">
            
            <div class="modal-glass-overlay">
                <div class="modal-header-text">
                    <h2 id="modal-title">${beach.name.toUpperCase()}</h2>
                    <p class="modal-subtitle">${beach.region.toUpperCase()} (${(beach.type || 'BEACH').toUpperCase()})</p>
                </div>

                ${statusBadgeHTML}
                
                <div class="modal-metrics-grid">
                    <div class="metric-item">
                        <span id="metric-temp">🌡️ ${waterTemp}</span>
                        <small>${labels.waterTemp}</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-swell">🌊 ${swell}</span>
                        <small>${labels.swell}</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-tide">⚓ ${tide}</span>
                        <small>${labels.tide}</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-wind">💨 ${wind}</span>
                        <small>${labels.wind}</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-uv">☀️ ${uv}</span>
                        <small>${labels.sunSafety}</small>
                    </div>
                </div>
                
                <div class="glass-verdict-box ${badgeInfo.verdictClass}">
                    <h4>${verdictTitle}</h4>
                    <p>${verdictMessage}</p>
                </div>

                ${webcamHTML}

                <p class="modal-description">${getText(beach.description) || ''}</p>

                ${extraDetailsHTML}

                <div class="modal-amenities-container">
                    ${amenitiesHTML}
                </div>
                
                <button class="directions-btn" id="modal-directions-btn">${labels.directions}</button>
            </div>
        </div>
    `;

    const directionsBtn = document.getElementById('modal-directions-btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', () => window.open(mapsURL, '_blank'));
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => modal.focus(), 50);
}

// --- MODAL CLOSE HANDLERS ---

function setupModalClose() {
    const closeBtn = document.getElementById('modal-close-btn');
    const closeOverlay = document.getElementById('modal-close-overlay');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeOverlay) closeOverlay.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    if (lastActiveElement) {
        lastActiveElement.focus();
    }
}

// --- LANGUAGE SWITCHER LOGIC ---

function setupLangSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.currentTarget.getAttribute('data-lang');
            if (selectedLang && selectedLang !== currentLang) {
                changeLanguage(selectedLang);
            }
        });
    });
}

function changeLanguage(newLang) {
    currentLang = newLang;
    document.documentElement.lang = newLang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === newLang);
    });

    const exploreTitle = document.getElementById('section-explore-title');
    if (exploreTitle) {
        exploreTitle.textContent = UI_TEXTS[currentLang].exploreDestinations;
    }

    updateFilterNavLabels();
    setupHeroSuggestion();

    const activeBtn = document.querySelector('.filter-btn.active');
    const activeRegion = activeBtn ? activeBtn.getAttribute('data-region') : 'Arrábida';
    const filtered = beachesData.filter(b => b.region === activeRegion);
    renderCards(filtered.length ? filtered : beachesData);

    if (modal && !modal.classList.contains('hidden') && currentModalBeachId) {
        openDetails(currentModalBeachId);
    }
}

// Silently refresh data when user returns to the tab after 60+ minutes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isDataStale()) {
        loadBeachesData();
    }
});

window.openDetails = openDetails;