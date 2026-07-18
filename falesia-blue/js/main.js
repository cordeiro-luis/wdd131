// Beach DB. Data can be retrived online in the future via an API.
const spots = [
    // --- REGIÃO: ARRÁBIDA ---
    {
        name: "Praia do Creiro",
        region: "Arrábida",
        img: "images/beaches/creiro-thumb.jpg",
        detailImg: "images/beaches/creiro-landscape.jpg",
        type: "Beach",
        temp: 19,
        waveHeight: 0.3,
        flag: "Green",
        description: "Nestled in the heart of the Arrábida Natural Park, Praia do Creiro is famous for its calm, crystalline waters and the iconic small island sitting just off the shore. It offers breathtaking mountain backdrops and fine white sand, making it a paradise for nature lovers.",
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds"]
    },
    {
        name: "Portinho da Arrábida",
        region: "Arrábida",
        img: "images/beaches/portinhoArrabida-thumb.jpg",
        detailImg: "images/beaches/portinhoArrabida-landscape.jpg",
        type: "Beach",
        temp: 19,
        waveHeight: 0.2,
        flag: "Green",
        description: "Considered one of Portugal's most beautiful natural bays, Portinho da Arrábida charms with its calm, crystal-clear emerald waters sheltered by the dramatic Arrábida hills. It features a scenic mix of sand and pebbles, rich marine life ideal for snorkeling, and a historic 17th-century fort. Note: Vehicle access is strictly regulated during the summer and parking is extremely limited, making early arrival or the use of eco-shuttles highly recommended.",
        amenities: ["🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🛶 Water Sports"]
    },
    {
        name: "Praia de Galapinhos",
        region: "Arrábida",
        img: "images/beaches/galapinhos-thumb.jpg",
        detailImg: "images/beaches/galapinhos-landscape.jpg",
        type: "Beach",
        temp: 18,
        waveHeight: 0.2,
        flag: "Green",
        description: "Once voted the best beach in Europe, Galapinhos is a stunning, semi-wild cove with pristine turquoise waters and white sand enveloped by dense Mediterranean vegetation. Note: Private car access is completely banned during the summer under the 'Arrábida Sem Carros' program. Access requires taking a municipal shuttle bus or walking down a steep, unpaved nature trail from the main road.",
        amenities: ["🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🪑 Sunbeds"]
    },
    {
        name: "Praia dos Coelhos",
        region: "Arrábida",
        img: "images/beaches/coelhos-thumb.jpg",
        detailImg: "images/beaches/coelhos-landscape.jpg",
        type: "Beach",
        temp: 18,
        waveHeight: 0.1,
        flag: "Green",
        description: "A completely wild, hidden gem tucked away in a secret pocket of the mountain. Praia dos Coelhos has zero infrastructure, rewarding adventurers with absolute peace and calm, transparent waters. Note: Access is highly demanding, requiring a foot trek down a steep, rough, and unmarked dirt path through dense bush. The sandy area shrinks significantly during high tide.",
        amenities: []
    },
    {
        name: "Praia da Figueirinha",
        region: "Arrábida",
        img: "images/beaches/figueirinha-thumb.jpg",
        detailImg: "images/beaches/figueirinha-landscape.jpg",
        type: "Beach",
        temp: 19,
        waveHeight: 0.4,
        flag: "Green",
        description: "The largest and most accessible beach along the Arrábida coast, famous for its long sandbank that emerges during low tide, creating a beautiful shallow lagoon. Offering excellent infrastructure, it is ideal for families. While it features a structured, paid parking lot, it fills up very early in the morning during high season, making public transport from Setúbal a highly popular alternative.",
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds", "♿ Accessibility"]
    },

    // --- Azores ---
    {
        name: "Pontas Negras",
        region: "Azores",
        img: "images/beaches/pontas-negras-thumb.jpg",
        detailImg: "images/beaches/pontas-negras-landscape.jpg",
        type: "Natural Pool",
        temp: 22,
        waveHeight: 1.8,
        flag: "Yellow",
        description: "Located on the south coast of Pico Island, this unique swimming area features crystal-clear waters built directly into a jagged basaltic lava field. It offers steel ladders for sea access and concrete sunbathing platforms. Because it sits on the open Atlantic coast, it is prone to deep-sea swells and shifting currents; checking local wave forecasts before diving in is highly recommended.",
        amenities: ["🚗 Parking", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🚽 Toilets"]
    },
    {
        name: "Simão Dias",
        region: "Azores",
        img: "images/beaches/simao-dias-thumb.jpg",
        detailImg: "images/beaches/simao-dias-landscape.jpg",
        type: "Natural Pool",
        temp: 21,
        waveHeight: 1.5,
        flag: "Yellow",
        description: "The crown jewel of Fajã do Ouvidor on São Jorge Island. This breathtaking natural pool is carved out of monumental, vertical basalt prisms formed by cooling volcanic lava. Swimming in its deep, intensely clear geometric pools feels otherworldly. Access involves a short walk down from the fajã's main parking area. Mind the swells, as waves occasionally crash over the rocky outer barrier.",
        amenities: ["🚗 Parking"]
    },
    {
        name: "Ilhéu de Vila Franca",
        region: "Azores",
        img: "images/beaches/ilheu-thumb.jpg",
        detailImg: "images/beaches/ilheu-landscape.jpg",
        type: "Natural Pool",
        temp: 23,
        waveHeight: 0.2,
        flag: "Green",
        description: "A magnificent flooded volcanic crater located just off the coast of São Miguel Island. The perfectly circular interior lagoon is connected to the open ocean by a narrow channel, creating a sheltered natural sanctuary with exceptionally warm, calm waters perfect for snorkeling. Note: As a protected nature reserve, daily visitor numbers are strictly capped, and tickets for the boat ferry must be booked online well in advance. No commercial shops exist inside.",
        amenities: ["🧑‍⚕️ Lifeguard", "🚿 Showers", "🚽 Toilets"]
    },
    {
        name: "Piscinas da Caloura",
        region: "Azores",
        img: "images/beaches/caloura-thumb.jpg",
        detailImg: "images/beaches/caloura-landscape.jpg",
        type: "Natural Pool",
        temp: 22,
        waveHeight: 1.2,
        flag: "Green",
        description: "Tucked inside a charming, traditional fishing harbor on São Miguel's southern shore, Caloura is one of the archipelago's most popular swimming spots. Sheltered by volcanic cliffs, its crystal-clear pool offers safe swimming and rich marine life. It sits adjacent to an iconic local seafood restaurant and features excellent concrete sunbathing decks with very convenient access.",
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers"]
    },
    {
        name: "Mosteiros",
        region: "Azores",
        img: "images/beaches/mosteiros-thumb.jpg",
        detailImg: "images/beaches/mosteiros-landscape.jpg",
        type: "Beach",
        temp: 20,
        waveHeight: 2.1,
        flag: "Red",
        description: "A dramatic volcanic beach on the westernmost tip of São Miguel Island, famous for its dark black sand and the towering basalt sea stacks rising from the ocean. It is globally renowned for hosting the most beautiful sunsets on the island. Note: The open sea here features strong Atlantic currents, heavy swells, and waves that frequently trigger a red flag, making it more suited for surfers and sightseers than casual swimmers.",
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers"]
    },

    // --- Algarve ---
    {
        name: "Praia da Marinha",
        region: "Algarve",
        img: "images/beaches/marinha-thumb.jpg",
        detailImg: "images/beaches/marinha-landscape.jpg",
        type: "Beach",
        temp: 21,
        waveHeight: 0.5,
        flag: "Green",
        description: "Consistently ranked among the most beautiful beaches in the world, Praia da Marinha is a masterclass in Algarve coastal scenery, boasting golden limestone cliffs, natural tunnels, and double rock arches. Access to the sand is via a long, steep set of wooden stairs. Note: The clifftop parking lot is highly prone to gridlock and fills completely by 9:00 AM during summer months.",
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard"]
    },
    {
        name: "Praia de Benagil",
        region: "Algarve",
        img: "images/beaches/benagil-thumb.jpg",
        detailImg: "images/beaches/benagil-landscape.jpg",
        type: "Beach",
        temp: 21,
        waveHeight: 0.4,
        flag: "Green",
        description: "A picturesque beach nestled in a deep valley, acting as the primary launching pad for exploring the world-famous Benagil Sea Cave (Algar de Benagil). Note: Due to intense maritime traffic from tour boats, kayaks, and SUP boards, swimming from the beach to the cave is highly dangerous and officially discouraged. Parking along the narrow, steep access roads is exceptionally difficult; utilizing remote parking areas is advised.",
        amenities: ["🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🛶 Water Sports"]
    },
    {
        name: "Praia do Camilo",
        region: "Algarve",
        img: "images/beaches/camilo-thumb.jpg",
        detailImg: "images/beaches/camilo-landscape.jpg",
        type: "Beach",
        temp: 22,
        waveHeight: 0.3,
        flag: "Green",
        description: "A breathtakingly intimate pocket beach in Lagos framed by sculpted, orange-toned rock formations and calm, translucent waters. Reaching the sand requires walking down a dramatic wooden staircase of roughly 200 steps. Note: The actual sandy area is quite small and can disappear entirely during high tide, leaving very little room for towels. The clifftop parking area is extremely limited.",
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard"]
    },
    {
        name: "Praia da Rocha",
        region: "Algarve",
        img: "images/beaches/rocha-thumb.jpg",
        detailImg: "images/beaches/rocha-landscape.jpg",
        type: "Beach",
        temp: 20,
        waveHeight: 0.8,
        flag: "Green",
        description: "One of Portugal's most famous and expansive urban beaches. Praia da Rocha features a massive, wide stretch of golden sand lined with a long wooden boardwalk connecting various beach bars and sports areas. Unlike smaller coves, it never feels overcrowded due to its scale. It offers top-tier amenities, wheelchair access, and is steps away from a bustling avenue filled with hotels and nightlife.",
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds", "♿ Accessibility", "🛶 Water Sports"]
    },
    {
        name: "Cacela Velha",
        region: "Algarve",
        img: "images/beaches/cacela-thumb.jpg",
        detailImg: "images/beaches/cacela-landscape.jpg",
        type: "Beach",
        temp: 23,
        waveHeight: 0.2,
        flag: "Green",
        description: "A pristine, completely undeveloped barrier island beach located at the eastern edge of the Ria Formosa Natural Park. It offers warm, shallow waters and vast, peaceful horizons. Note: The beach has no infrastructure whatsoever. Access requires either checking the tide charts to wade across the lagoon on foot at low tide from the historic village of Cacela Velha, or taking a small local fisherman's taxi boat.",
        amenities: []
    }
];

// DOM
const gridContainer = document.getElementById('beaches-grid');
const heroContainer = document.getElementById('hero-suggestion');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('details-modal');
const modalContent = document.getElementById('modal-dynamic-content');

// Accessibility: Keep track of the last focused element before opening the modal to return focus after closing
let lastActiveElement = null;


window.addEventListener('DOMContentLoaded', () => {
    setupHeroSuggestion();
    
    // performance optimization: render only Arrábida beaches initially to avoid overloading the DOM with all beaches at once
    const initialBeaches = spots.filter(beach => beach.region === 'Arrábida');
    renderCards(initialBeaches);
    
    // Força o botão da Arrábida a ficar ativo/pressionado logo no arranque
    const defaultBtn = document.querySelector('.filter-btn[data-region="Arrábida"]');
    if (defaultBtn) defaultBtn.classList.add('active');
    
    setupFilters();
    setupModalClose();
});

function setupHeroSuggestion() {
    if (!spots || spots.length === 0) return;

    // Randomly select a beach for the hero section. In a PROD system, maybe this wopuld be based on a daily rotation or an API call.
    const randomIndex = Math.floor(Math.random() * spots.length);
    const suggestion = spots[randomIndex]; 
    
    heroContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45)), url('${suggestion.detailImg}')`;

    // For long location descriptions, truncate to 120 characters for the hero section to maintain a clean layout.
    const textDescription = suggestion.description 
        ? suggestion.description.substring(0, 120) + "..." 
        : "Calm water, perfect for snorkeling!";

    // Accessibility: Define the hero section as a landmark region with an aria-label for screen readers
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
                    <span>${suggestion.temp}°C</span>
                </div>
                <span class="meta-divider" aria-hidden="true">|</span>
                <div class="meta-item">
                    <span class="hero-icon" aria-hidden="true">🌊</span>
                    <span>Swell: ${suggestion.waveHeight}m</span>
                </div>
            </div>
            
            <!-- ACCESSIBILITY: aria-label diz ao Narrator o que este botão explora -->
            <button class="hero-btn" id="hero-explore-btn" aria-label="Explore details for ${suggestion.name}">Explore</button>
        </div>
    `;

    document.getElementById('hero-explore-btn').addEventListener('click', () => {
        openDetails(suggestion.name);
    });
}

// Optimized rendering of beach cards to avoid DOM overload. Each card includes accessibility features for screen readers and keyboard navigation.
function renderCards(beaches) {
    gridContainer.innerHTML = ""; // Clear existing cards before rendering new ones

    beaches.forEach(beach => {
        const card = document.createElement('div');
        card.className = 'beach-card';
        
        // Accessibility: Logic to determine the color of the small circle (hint) for safety
        let statusClass = "hint-safe";
        let statusText = "Safe";
        if ((beach.type === "Natural Pool" && beach.waveHeight > 1.5) || beach.flag === "Red") {
            statusClass = "hint-danger";
            statusText = "Danger";
        } else if (beach.flag === "Yellow") {
            statusClass = "hint-caution";
            statusText = "Caution";
        }
        
        // Accessibility: Include the water temperature and safety status in the screen reader report
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Beach: ${beach.name}, Region: ${beach.region}. Water temperature: ${beach.temp} degrees. Condition: ${statusText}. Press Enter to view details.`);
        
        card.innerHTML = `
            <!-- Pequeno círculo indicador de segurança sobreposto à imagem -->
            <span class="status-badge ${statusClass}" title="Status: ${statusText}"></span>
            
            <img src="${beach.img}" alt="${beach.name}" loading="lazy">
            <div class="card-info">
                <h3>${beach.name}</h3>
                <div class="card-meta-layout">
                    <p><span aria-hidden="true">📍</span> ${beach.region}</p>
                    <span class="card-temp">🌡️ ${beach.temp}°C</span>
                </div>
            </div>
        `;
        
        // Clicking the card opens the modal with detailed information about the beach
        card.addEventListener('click', () => openDetails(beach.name));
        
        // Accessibility: Allow keyboard users to open the modal with Enter or Space keys
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); 
                openDetails(beach.name);
            }
        });

        gridContainer.appendChild(card);
    });
}

// Filter buttons allow users to view beaches by region. The active button is visually highlighted, and the grid updates dynamically based on the selected region.
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

//Modal logic: Opens a detailed view of the selected beach
function openDetails(beachName) {
    const beach = spots.find(b => b.name === beachName);
    if (!beach) return;

    //Accessibility: Store the last focused element before opening the modal to return focus after closing
    lastActiveElement = document.activeElement;

    modalContent.style.backgroundImage = 'none';
    modalContent.style.background = 'transparent';

    let alertTitle = "DAILY SAFETY VERDICT: SAFE";
    let alertDesc = "Conditions are perfect for swimming.";
    let alertClass = "verdict-safe";

    if ((beach.type === "Natural Pool" && beach.waveHeight > 1.5) || beach.flag === "Red") {
        alertTitle = "⚠️ HIGH SURF!";
        alertDesc = "Volcanic pools may be swept by waves.";
        alertClass = "verdict-danger";
    } else if (beach.flag === "Yellow") {
        alertTitle = "⚠️ CAUTION REQUIRED";
        alertDesc = "Moderate swell. Pay attention.";
        alertClass = "verdict-caution";
    }

    const windSpeed = beach.region === "Açores" ? "15 km/h" : "8 km/h";

    // Build amenity tags dynamically (safeguard with an empty array fallback)
    const amenitiesHTML = (beach.amenities || [])
        .map(amenity => `<span class="amenity-tag">${amenity}</span>`)
        .join('');

    // Criação do URL dinâmico de pesquisa no Google Maps para o botão DIRECTIONS
    const mapsQuery = encodeURIComponent(`${beach.name}, ${beach.region}, Portugal`);
    const mapsURL = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    // Accessibility: Force the container to behave as a focused popup dialog
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1'); 
    modal.setAttribute('aria-labelledby', 'modal-title');

    modalContent.innerHTML = `
        <div class="modal-card-container">
            <img src="${beach.detailImg}" alt="${beach.name}" class="modal-landscape-img">
            
            <div class="modal-glass-overlay">
                <div class="modal-header-text">
                    <!-- id="modal-title" faz com que o Narrator leia o título assim que abre -->
                    <h2 id="modal-title">${beach.name.toUpperCase()}</h2>
                    <p class="modal-subtitle">${beach.region.toUpperCase()} (${beach.type.toUpperCase()})</p>
                </div>
                
                <div class="modal-metrics-row">
                    <div class="metric-item">
                        <span>🌡️ ${beach.temp}°C</span>
                        <small>Water Temp</small>
                    </div>
                    <div class="metric-item">
                        <span>🌊 ${beach.waveHeight}m</span>
                        <small>Swell</small>
                    </div>
                    <div class="metric-item">
                        <span>💨 ${windSpeed}</span>
                        <small>Wind</small>
                    </div>
                </div>
                
                <div class="glass-verdict-box ${alertClass}">
                    <h4>${alertTitle}</h4>
                    <p>${alertDesc}</p>
                </div>

                <!-- NEW: LONG DESCRIPTION -->
                <p class="modal-description">${beach.description || 'No description available for this destination.'}</p>

                <!-- NEW: AMENITIES TAGS GRID -->
                <div class="modal-amenities-container">
                    ${amenitiesHTML}
                </div>
                
                <!-- O botão agora abre a rota real no Google Maps instantaneamente -->
                <button class="directions-btn" onclick="window.open('${mapsURL}', '_blank')">DIRECTIONS</button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');

    //Accessibility: Set focus to the modal for screen readers and keyboard users
    setTimeout(() => {
        modal.focus();
    }, 50);
}

// Modal close logic: Closes the modal and returns focus to the last active element
function setupModalClose() {
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-close-overlay').addEventListener('click', closeModal);

    // Fechar também com a tecla ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function closeModal() {
    modal.classList.add('hidden');
    
    //Accessibility: Return focus to the last active element before the modal was opened
    if (lastActiveElement) {
        lastActiveElement.focus();
    }
}

window.openDetails = openDetails;