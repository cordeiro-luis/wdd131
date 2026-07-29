// DOM Selectors
const gridContainer = document.getElementById('beaches-grid');
const heroContainer = document.getElementById('hero-suggestion');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('details-modal');
const modalContent = document.getElementById('modal-dynamic-content');

// Accessibility: Track active element before modal opens
let lastActiveElement = null;

window.addEventListener('DOMContentLoaded', () => {
    setupHeroSuggestion();

    // Initial view rendering Arrábida spots
    const initialBeaches = spots.filter(beach => beach.region === 'Arrábida');
    renderCards(initialBeaches);

    const defaultBtn = document.querySelector('.filter-btn[data-region="Arrábida"]');
    if (defaultBtn) defaultBtn.classList.add('active');

    setupFilters();
    setupModalClose();
});

// Helper: Format temperature with exactly 1 decimal digit
function formatTemp(val) {
    if (val === null || val === undefined || val === "-") return "-";
    const num = Number(val);
    return isNaN(num) ? "-" : `${num.toFixed(1)}°C`;
}

// Helper function to find current hour index from Open-Meteo time array
function getCurrentHourIndex(timeArray) {
    if (!timeArray || timeArray.length === 0) return 0;
    const nowISO = new Date().toISOString().slice(0, 13);
    const index = timeArray.findIndex(t => t.startsWith(nowISO));
    return index !== -1 ? index : 0;
}

// Calculates dynamic safety badge state based on live/stored swell & flag data
function computeBeachStatus(beach) {
    const swell = beach.waveHeight;

    if (swell !== null && swell !== undefined) {
        if ((beach.type === "Natural Pool" && swell > 1.5) || beach.flag === "Red" || swell >= 2.0) {
            return { cssClass: "hint-danger", text: "Danger" };
        } else if (beach.flag === "Yellow" || swell >= 1.2) {
            return { cssClass: "hint-caution", text: "Caution" };
        }
        return { cssClass: "hint-safe", text: "Safe" };
    }

    if (beach.flag === "Red") return { cssClass: "hint-danger", text: "Danger" };
    if (beach.flag === "Yellow") return { cssClass: "hint-caution", text: "Caution" };
    return { cssClass: "hint-safe", text: "Safe" };
}

// Updates a specific beach card on the main grid dynamically
function updateCardInGrid(beach) {
    const safeName = CSS.escape(beach.name);
    const cardEl = document.querySelector(`.beach-card[data-beach="${safeName}"]`);
    if (!cardEl) return;

    const cardTempEl = cardEl.querySelector('.card-temp');
    const statusBadgeEl = cardEl.querySelector('.status-badge');

    if (cardTempEl) {
        cardTempEl.innerHTML = `🌡️ ${formatTemp(beach.temp)}`;
    }

    if (statusBadgeEl) {
        const statusInfo = computeBeachStatus(beach);
        statusBadgeEl.className = `status-badge ${statusInfo.cssClass}`;
        statusBadgeEl.setAttribute('title', `Status: ${statusInfo.text}`);
    }
}

// Helper to compute and update the modal's verdict box dynamically
function updateModalVerdict(beach) {
    const verdictBox = document.querySelector('.glass-verdict-box');
    if (!verdictBox) return;

    let alertTitle = "DAILY SAFETY VERDICT: SAFE";
    let alertDesc = "Conditions are perfect for swimming.";
    let alertClass = "verdict-safe";

    const swell = beach.waveHeight;

    if ((beach.type === "Natural Pool" && swell > 1.5) || beach.flag === "Red" || swell >= 2.0) {
        alertTitle = "⚠️ HIGH SURF / STRONG CURRENTS";
        alertDesc = "Exercise extreme caution or avoid swimming.";
        alertClass = "verdict-danger";
    } else if (beach.flag === "Yellow" || swell >= 1.2) {
        alertTitle = "⚠️ CAUTION REQUIRED";
        alertDesc = "Moderate swell or tide movement. Pay attention.";
        alertClass = "verdict-caution";
    }

    verdictBox.className = `glass-verdict-box ${alertClass}`;
    verdictBox.innerHTML = `
        <h4>${alertTitle}</h4>
        <p>${alertDesc}</p>
    `;
}

async function fetchLiveMetrics(lat, lng) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=wind_speed_10m,wind_direction_10m,uv_index&timezone=auto`;
        // ✅ Updated parameter: sea_level_height_msl
        const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=wave_height&hourly=sea_surface_temperature,sea_level_height_msl&timezone=auto`;

        const [weatherRes, marineRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(marineUrl)
        ]);

        if (!weatherRes.ok) throw new Error(`Weather API returned HTTP ${weatherRes.status}`);
        if (!marineRes.ok) throw new Error(`Marine API returned HTTP ${marineRes.status}`);

        const weatherData = await weatherRes.json();
        const marineData = await marineRes.json();

        const currentHourIdx = getCurrentHourIndex(marineData.hourly?.time || []);
        const rawTemp = marineData.hourly?.sea_surface_temperature?.[currentHourIdx] ?? null;

        // --- TIDE CALCULATION (Compact Format) ---
        const seaLevels = marineData.hourly?.sea_level_height_msl || [];
        const currentSeaLevel = seaLevels[currentHourIdx] ?? null;
        const nextSeaLevel = seaLevels[currentHourIdx + 1] ?? null;

        let tideFormatted = "-";
        if (currentSeaLevel !== null) {
            const sign = currentSeaLevel >= 0 ? "+" : "";
            const heightStr = `${sign}${currentSeaLevel.toFixed(1)}m`;

            if (nextSeaLevel !== null) {
                // Compact arrow trend
                const trendIcon = nextSeaLevel >= currentSeaLevel ? "↗" : "↘";
                tideFormatted = `${heightStr} ${trendIcon}`;
            } else {
                tideFormatted = heightStr;
            }
        }

        const getCardinalDirection = (deg) => {
            const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            return directions[Math.round(deg / 45) % 8];
        };

        const rawSwell = marineData.current?.wave_height ?? null;
        const rawWindSpeed = weatherData.current?.wind_speed_10m ?? null;
        const rawWindDir = weatherData.current?.wind_direction_10m ? getCardinalDirection(weatherData.current.wind_direction_10m) : '';
        const rawUV = weatherData.current?.uv_index ?? null;

        return {
            temp: rawTemp !== null ? formatTemp(rawTemp) : "-",
            waveHeight: rawSwell !== null ? `${rawSwell.toFixed(1)}m` : "-",
            wind: rawWindSpeed !== null ? `${Math.round(rawWindSpeed)} km/h (${rawWindDir})` : "-",
            uv: rawUV !== null ? `UV ${Math.round(rawUV)}` : "-",
            tide: tideFormatted,

            rawTempNum: rawTemp !== null ? Number(rawTemp.toFixed(1)) : null,
            rawSwellNum: rawSwell !== null ? Number(rawSwell.toFixed(1)) : null
        };
    } catch (error) {
        console.warn("Could not fetch live metrics:", error);
        return {
            temp: "-",
            waveHeight: "-",
            wind: "-",
            uv: "-",
            tide: "-",
            rawTempNum: null,
            rawSwellNum: null
        };
    }
}

function fetchMetricsForVisibleBeaches(beaches) {
    beaches.forEach(async (beach) => {
        if (!beach.lat || !beach.lng) return;

        if (beach.temp !== null && beach.waveHeight !== null) {
            updateCardInGrid(beach);
            return;
        }

        const liveData = await fetchLiveMetrics(beach.lat, beach.lng);

        if (liveData.rawTempNum !== null) beach.temp = liveData.rawTempNum;
        if (liveData.rawSwellNum !== null) beach.waveHeight = liveData.rawSwellNum;

        updateCardInGrid(beach);
    });
}

function setupHeroSuggestion() {
    if (typeof spots === 'undefined' || spots.length === 0) return;

    const randomIndex = Math.floor(Math.random() * spots.length);
    const suggestion = spots[randomIndex];

    heroContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45)), url('${suggestion.detailImg}')`;

    const textDescription = suggestion.description
        ? suggestion.description.substring(0, 120) + "..."
        : "Calm water, perfect for snorkeling!";

    heroContainer.setAttribute('role', 'region');
    heroContainer.setAttribute('aria-label', "Today's Featured Beach Spot");

    heroContainer.innerHTML = `
        <div class="hero-glass-card">
            <span class="hero-tag">TODAY'S SPOT</span>
            <h2 class="hero-title">${suggestion.name}</h2>
            <p class="hero-description">${textDescription}</p>
            
            <div class="hero-meta-row">
                <div class="meta-item">
                    <span class="hero-icon" aria-hidden="true">🌡️</span>
                    <span id="hero-temp-val">${formatTemp(suggestion.temp)}</span>
                </div>
                <span class="meta-divider" aria-hidden="true">|</span>
                <div class="meta-item">
                    <span class="hero-icon" aria-hidden="true">🌊</span>
                    <span id="hero-swell-val">Swell: ${suggestion.waveHeight !== null ? `${suggestion.waveHeight.toFixed(1)}m` : '-'}</span>
                </div>
            </div>
            
            <button class="hero-btn" id="hero-explore-btn" aria-label="Explore details for ${suggestion.name}">Explore</button>
        </div>
    `;

    document.getElementById('hero-explore-btn').addEventListener('click', () => {
        openDetails(suggestion.name);
    });

    if (suggestion.lat && suggestion.lng && (suggestion.temp === null || suggestion.waveHeight === null)) {
        fetchLiveMetrics(suggestion.lat, suggestion.lng).then(liveData => {
            if (liveData.rawTempNum !== null) suggestion.temp = liveData.rawTempNum;
            if (liveData.rawSwellNum !== null) suggestion.waveHeight = liveData.rawSwellNum;

            const heroTempEl = document.getElementById('hero-temp-val');
            const heroSwellEl = document.getElementById('hero-swell-val');

            if (heroTempEl) heroTempEl.textContent = liveData.temp;
            if (heroSwellEl) heroSwellEl.textContent = `Swell: ${liveData.waveHeight}`;
        });
    }
}

function renderCards(beaches) {
    gridContainer.innerHTML = "";

    beaches.forEach(beach => {
        const card = document.createElement('div');
        card.className = 'beach-card';
        card.setAttribute('data-beach', beach.name);

        const statusInfo = computeBeachStatus(beach);

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Beach: ${beach.name}, Region: ${beach.region}. Water temperature: ${formatTemp(beach.temp)}. Condition: ${statusInfo.text}. Press Enter to view details.`);

        card.innerHTML = `
            <span class="status-badge ${statusInfo.cssClass}" title="Status: ${statusInfo.text}"></span>
            <img src="${beach.img}" alt="${beach.name}" loading="lazy">
            <div class="card-info">
                <h3>${beach.name}</h3>
                <div class="card-meta-layout">
                    <p><span aria-hidden="true">📍</span> ${beach.region}</p>
                    <span class="card-temp">🌡️ ${formatTemp(beach.temp)}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openDetails(beach.name));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDetails(beach.name);
            }
        });

        gridContainer.appendChild(card);
    });

    fetchMetricsForVisibleBeaches(beaches);
}

function setupFilters() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const selectedRegion = e.target.getAttribute('data-region');
            const filtered = spots.filter(beach => beach.region === selectedRegion);
            renderCards(filtered);
        });
    });
}

function openDetails(beachName) {
    const beach = spots.find(b => b.name === beachName);
    if (!beach) return;

    lastActiveElement = document.activeElement;

    const windText = beach.wind ? `${beach.wind.speed} (${beach.wind.direction})` : "-";
    const uvText = beach.uvIndex ? `UV ${beach.uvIndex.value} (${beach.uvIndex.label})` : "-";

    let extraDetailsHTML = "";
    if (beach.extraDetails && beach.extraDetails.length > 0) {
        const rows = beach.extraDetails.map(item => `
            <div class="extra-detail-row">
                <span class="extra-detail-label">${item.label}</span>
                <span class="extra-detail-value">${item.value}</span>
            </div>
        `).join('');

        extraDetailsHTML = `<div class="extra-details-container">${rows}</div>`;
    }

    const amenitiesHTML = (beach.amenities || [])
        .map(amenity => `<span class="amenity-tag">${amenity}</span>`)
        .join('');

    const mapsQuery = encodeURIComponent(`${beach.name}, ${beach.region}, Portugal`);
    const mapsURL = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'modal-title');

    modalContent.innerHTML = `
        <div class="modal-card-container">
            <img src="${beach.detailImg}" alt="${beach.name}" class="modal-landscape-img">
            
            <div class="modal-glass-overlay">
                <div class="modal-header-text">
                    <h2 id="modal-title">${beach.name.toUpperCase()}</h2>
                    <p class="modal-subtitle">${beach.region.toUpperCase()} (${beach.type.toUpperCase()})</p>
                </div>

                <div id="live-badge" class="live-status-badge loading">
                    <span class="badge-dot"></span> FETCHING LIVE DATA...
                </div>
                
                <div class="modal-metrics-grid">
                    <div class="metric-item">
                        <span id="metric-temp">🌡️ ${formatTemp(beach.temp)}</span>
                        <small>Water Temp</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-swell">🌊 ${beach.waveHeight !== null ? `${beach.waveHeight.toFixed(1)}m` : '-'}</span>
                        <small>Swell</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-tide">⚓ -</span>
                        <small>Tide</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-wind">💨 ${windText}</span>
                        <small>Wind</small>
                    </div>
                    <div class="metric-item">
                        <span id="metric-uv">☀️ ${uvText}</span>
                        <small>Sun Safety</small>
                    </div>
                </div>
                
                <!-- VERDICT BOX (Dynamic) -->
                <div class="glass-verdict-box"></div>

                <p class="modal-description">${beach.description || 'No description available for this destination.'}</p>

                ${extraDetailsHTML}

                <div class="modal-amenities-container">
                    ${amenitiesHTML}
                </div>
                
                <button class="directions-btn" onclick="window.open('${mapsURL}', '_blank')">DIRECTIONS</button>
            </div>
        </div>
    `;

    // Render initial verdict
    updateModalVerdict(beach);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => modal.focus(), 50);

    // Fetch live metrics including Tide
    if (beach.lat && beach.lng) {
        const badgeEl = document.getElementById('live-badge');

        fetchLiveMetrics(beach.lat, beach.lng).then(liveData => {
            if (liveData.rawTempNum !== null) beach.temp = liveData.rawTempNum;
            if (liveData.rawSwellNum !== null) beach.waveHeight = liveData.rawSwellNum;

            const tempEl = document.getElementById('metric-temp');
            const swellEl = document.getElementById('metric-swell');
            const tideEl = document.getElementById('metric-tide');
            const windEl = document.getElementById('metric-wind');
            const uvEl = document.getElementById('metric-uv');

            if (tempEl) tempEl.innerHTML = `🌡️ ${liveData.temp}`;
            if (swellEl) swellEl.innerHTML = `🌊 ${liveData.waveHeight}`;
            if (tideEl) tideEl.innerHTML = `⚓ ${liveData.tide}`;
            if (windEl) windEl.innerHTML = `💨 ${liveData.wind}`;
            if (uvEl) uvEl.innerHTML = `☀️ ${liveData.uv}`;

            // Update main grid card badge and modal verdict banner live
            updateCardInGrid(beach);
            updateModalVerdict(beach);

            if (badgeEl) {
                if (liveData.temp !== "-") {
                    badgeEl.className = "live-status-badge live";
                    badgeEl.innerHTML = `<span class="badge-dot"></span> ⚡ LIVE DATA`;
                } else {
                    badgeEl.className = "live-status-badge offline";
                    badgeEl.innerHTML = `<span class="badge-dot"></span> 📌 OFFLINE / STATIC`;
                }
            }
        });
    }
}

function setupModalClose() {
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-close-overlay').addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    if (lastActiveElement) {
        lastActiveElement.focus();
    }
}

window.openDetails = openDetails;