// Beach DB — Scalable schema ready for real-time API overlays
const spots = [
    // --- REGIÃO: ARRÁBIDA ---
    {
        name: "Praia do Creiro",
        region: "Arrábida",
        lat: 38.4811,
        lng: -8.9719,
        img: "images/beaches/creiro-thumb.jpg",
        detailImg: "images/beaches/creiro-landscape.jpg",
        type: "Beach",
        description: "Nestled in the heart of the Arrábida Natural Park, Praia do Creiro is famous for its calm, crystalline waters and the iconic small island sitting just off the shore. It offers breathtaking mountain backdrops and fine white sand, making it a paradise for nature lovers.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null, flag: "Green",
        wind: { speed: "8 km/h", direction: "NW" },
        uvIndex: { value: 6, label: "High" },
        tide: { nextLow: "14:20", nextHigh: "20:35" },

        extraDetails: [
            { label: "🅿️ Parking Info", value: "Paid structured lot • Fills quickly by 10 AM" },
            { label: "🛡️ Wind Shelter", value: "Protected from North winds by Arrábida hills" },
            { label: "🌊 Tide Tip", value: "Swimming zone remains calm across all tides" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds"]
    },
    {
        name: "Portinho da Arrábida",
        region: "Arrábida",
        lat: 38.4772,
        lng: -8.9847,
        img: "images/beaches/portinhoArrabida-thumb.jpg",
        detailImg: "images/beaches/portinhoArrabida-landscape.jpg",
        type: "Beach",
        description: "Considered one of Portugal's most beautiful natural bays, Portinho da Arrábida charms with its calm, crystal-clear emerald waters sheltered by the dramatic Arrábida hills. It features a scenic mix of sand and pebbles, rich marine life ideal for snorkeling, and a historic 17th-century fort.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "6 km/h", direction: "NW" },
        uvIndex: { value: 6, label: "High" },
        tide: { nextLow: "14:20", nextHigh: "20:35" },

        extraDetails: [
            { label: "🚗 Access Warning", value: "Summer car restrictions apply • Use municipal shuttle" },
            { label: "🤿 Snorkeling", value: "Oceanographic Museum & protected bay area nearby" }
        ],
        amenities: ["🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🛶 Water Sports"]
    },
    {
        name: "Praia de Galapinhos",
        region: "Arrábida",
        lat: 38.4839,
        lng: -8.9642,
        img: "images/beaches/galapinhos-thumb.jpg",
        detailImg: "images/beaches/galapinhos-landscape.jpg",
        type: "Beach",
        description: "Once voted the best beach in Europe, Galapinhos is a stunning, semi-wild cove with pristine turquoise waters and white sand enveloped by dense Mediterranean vegetation.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "7 km/h", direction: "NW" },
        uvIndex: { value: 6, label: "High" },
        tide: { nextLow: "14:20", nextHigh: "20:35" },

        extraDetails: [
            { label: "🚌 Access Restriction", value: "Private cars banned in summer • Hike or shuttle required" },
            { label: "🎒 Foot Trail", value: "Steep dirt trail down from the main road" }
        ],
        amenities: ["🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🪑 Sunbeds"]
    },
    {
        name: "Praia dos Coelhos",
        region: "Arrábida",
        lat: 38.4828,
        lng: -8.9615,
        img: "images/beaches/coelhos-thumb.jpg",
        detailImg: "images/beaches/coelhos-landscape.jpg",
        type: "Beach",
        description: "A completely wild, hidden gem tucked away in a secret pocket of the mountain. Praia dos Coelhos has zero infrastructure, rewarding adventurers with absolute peace and calm, transparent waters.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "5 km/h", direction: "N" },
        uvIndex: { value: 7, label: "High" },
        tide: { nextLow: "14:20", nextHigh: "20:35" },

        extraDetails: [
            { label: "🥾 Hike Required", value: "Unmarked steep bush path • Sturdy shoes recommended" },
            { label: "🌊 Tide Warning", value: "Beach area shrinks significantly during high tide" }
        ],
        amenities: []
    },
    {
        name: "Praia da Figueirinha",
        region: "Arrábida",
        lat: 38.4844,
        lng: -8.9467,
        img: "images/beaches/figueirinha-thumb.jpg",
        detailImg: "images/beaches/figueirinha-landscape.jpg",
        type: "Beach",
        description: "The largest and most accessible beach along the Arrábida coast, famous for its long sandbank that emerges during low tide, creating a beautiful shallow lagoon.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "10 km/h", direction: "NW" },
        uvIndex: { value: 6, label: "High" },
        tide: { nextLow: "14:20", nextHigh: "20:35" },

        extraDetails: [
            { label: "🅿️ Parking Info", value: "Large paid lot available • Buses available from Setúbal" },
            { label: "🏖️ Sandbank Feature", value: "Low tide exposes shallow lagoon ideal for kids" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds", "♿ Accessibility"]
    },

    // --- REGIÃO: AZORES ---
    {
        name: "Pontas Negras",
        region: "Azores",
        lat: 38.3970,
        lng: -28.0312,
        img: "images/beaches/pontas-negras-thumb.jpg",
        detailImg: "images/beaches/pontas-negras-landscape.jpg",
        type: "Natural Pool",
        description: "Located on the south coast of Pico Island, this unique swimming area features crystal-clear waters built directly into a jagged basaltic lava field. It offers steel ladders for sea access and concrete sunbathing platforms.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Yellow",
        wind: { speed: "18 km/h", direction: "SW" },
        uvIndex: { value: 5, label: "Moderate" },
        tide: { nextLow: "12:10", nextHigh: "18:25" },

        extraDetails: [
            { label: "🅿️ Parking Info", value: "Free dedicated parking lot next to the bay" },
            { label: "⚠️ Swell Warning", value: "Exposed ocean pool • Check wave height before entering" }
        ],
        amenities: ["🚗 Parking", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🚽 Toilets"]
    },
    {
        name: "Simão Dias",
        region: "Azores",
        lat: 38.6433,
        lng: -28.0494,
        img: "images/beaches/simao-dias-thumb.jpg",
        detailImg: "images/beaches/simao-dias-landscape.jpg",
        type: "Natural Pool",
        description: "The crown jewel of Fajã do Ouvidor on São Jorge Island. This breathtaking natural pool is carved out of monumental, vertical basalt prisms formed by cooling volcanic lava.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Yellow",
        wind: { speed: "16 km/h", direction: "W" },
        uvIndex: { value: 4, label: "Moderate" },
        tide: { nextLow: "11:50", nextHigh: "18:05" },

        extraDetails: [
            { label: "🌋 Geological Wonder", value: "Framed by massive prismatic basalt columns" },
            { label: "⚠️ Sea Conditions", value: "Waves can wash over outer wall during high swell" }
        ],
        amenities: ["🚗 Parking"]
    },
    {
        name: "Ilhéu de Vila Franca",
        region: "Azores",
        lat: 37.7058,
        lng: -25.4419,
        img: "images/beaches/ilheu-thumb.jpg",
        detailImg: "images/beaches/ilheu-landscape.jpg",
        type: "Natural Pool",
        description: "A magnificent flooded volcanic crater located just off the coast of São Miguel Island. The perfectly circular interior lagoon is connected to the open ocean by a narrow channel.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "12 km/h", direction: "S" },
        uvIndex: { value: 6, label: "High" },
        tide: { nextLow: "13:00", nextHigh: "19:15" },

        extraDetails: [
            { label: "🎟️ Ticket Requirement", value: "Strict visitor quota • Book ferry online in advance" },
            { label: "🏬 Commercial Note", value: "Protected reserve • No shops or food on the islet" }
        ],
        amenities: ["🧑‍⚕️ Lifeguard", "🚿 Showers", "🚽 Toilets"]
    },
    {
        name: "Piscinas da Caloura",
        region: "Azores",
        lat: 37.7094,
        lng: -25.5008,
        img: "images/beaches/caloura-thumb.jpg",
        detailImg: "images/beaches/caloura-landscape.jpg",
        type: "Natural Pool",
        description: "Tucked inside a charming fishing harbor on São Miguel's southern shore. Sheltered by volcanic cliffs, its crystal-clear pool offers safe swimming and rich marine life.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "14 km/h", direction: "S" },
        uvIndex: { value: 5, label: "Moderate" },
        tide: { nextLow: "13:00", nextHigh: "19:15" },

        extraDetails: [
            { label: "🍽️ Dining Highlight", value: "Located next to famous local harbor seafood restaurant" },
            { label: "🪜 Access", value: "Concrete platforms with steel ladders into clear water" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers"]
    },
    {
        name: "Mosteiros",
        region: "Azores",
        lat: 37.8925,
        lng: -25.8236,
        img: "images/beaches/mosteiros-thumb.jpg",
        detailImg: "images/beaches/mosteiros-landscape.jpg",
        type: "Beach",
        description: "A dramatic volcanic beach on the westernmost tip of São Miguel Island, famous for its dark black sand and the towering basalt sea stacks rising from the ocean.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Red",
        wind: { speed: "22 km/h", direction: "W" },
        uvIndex: { value: 4, label: "Moderate" },
        tide: { nextLow: "11:05", nextHigh: "17:15" },

        extraDetails: [
            { label: "🌅 Highlight", value: "Renowned as the best sunset viewpoint in São Miguel" },
            { label: "⚠️ Current Alert", value: "Strong Atlantic rip currents • Exercise extreme caution" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers"]
    },

    // --- REGIÃO: ALGARVE ---
    {
        name: "Praia da Marinha",
        region: "Algarve",
        lat: 37.0898,
        lng: -8.4128,
        img: "images/beaches/marinha-thumb.jpg",
        detailImg: "images/beaches/marinha-landscape.jpg",
        type: "Beach",
        description: "Consistently ranked among the most beautiful beaches in the world, Praia da Marinha is a masterclass in Algarve coastal scenery, boasting golden limestone cliffs, natural tunnels, and double rock arches.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "12 km/h", direction: "N" },
        uvIndex: { value: 7, label: "High" },
        tide: { nextLow: "15:00", nextHigh: "21:15" },

        extraDetails: [
            { label: "🅿️ Parking Status", value: "Clifftop lot prone to gridlock • Arrive before 9 AM" },
            { label: "🪜 Access", value: "Long steep wooden staircase down the cliffside" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard"]
    },
    {
        name: "Praia de Benagil",
        region: "Algarve",
        lat: 37.0872,
        lng: -8.4258,
        img: "images/beaches/benagil-thumb.jpg",
        detailImg: "images/beaches/benagil-landscape.jpg",
        type: "Beach",
        description: "A picturesque beach nestled in a deep valley, acting as the primary launching pad for exploring the world-famous Benagil Sea Cave (Algar de Benagil).",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null, flag: "Green",
        wind: { speed: "10 km/h", direction: "N" },
        uvIndex: { value: 7, label: "High" },
        tide: { nextLow: "15:00", nextHigh: "21:15" },

        extraDetails: [
            { label: "🛶 Cave Advisory", value: "Heavy boat traffic • Swimming to the cave is unsafe" },
            { label: "🚗 Traffic Warning", value: "Narrow steep valley roads • Limited parking" }
        ],
        amenities: ["🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🛶 Water Sports"]
    },
    {
        name: "Praia do Camilo",
        region: "Algarve",
        lat: 37.0875,
        lng: -8.6678,
        img: "images/beaches/camilo-thumb.jpg",
        detailImg: "images/beaches/camilo-landscape.jpg",
        type: "Beach",
        description: "A breathtakingly intimate pocket beach in Lagos framed by sculpted, orange-toned rock formations and calm, translucent waters.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "8 km/h", direction: "NW" },
        uvIndex: { value: 7, label: "High" },
        tide: { nextLow: "14:45", nextHigh: "21:00" },

        extraDetails: [
            { label: "🌊 Tide Caution", value: "High tide covers most of the sandy beach area" },
            { label: "🪜 Stairway", value: "200 wooden steps leading down to the cove" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard"]
    },
    {
        name: "Praia da Rocha",
        region: "Algarve",
        lat: 37.1172,
        lng: -8.5358,
        img: "images/beaches/rocha-thumb.jpg",
        detailImg: "images/beaches/rocha-landscape.jpg",
        type: "Beach",
        description: "One of Portugal's most famous and expansive urban beaches. Praia da Rocha features a massive, wide stretch of golden sand lined with a long wooden boardwalk connecting various beach bars and sports areas.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "14 km/h", direction: "NW" },
        uvIndex: { value: 7, label: "High" },
        tide: { nextLow: "14:50", nextHigh: "21:05" },

        extraDetails: [
            { label: "🏖️ Capacity", value: "Extremely wide shoreline • Never feels crowded" },
            { label: "♿ Facilities", value: "Full wooden boardwalk access & accessible beach ramps" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds", "♿ Accessibility", "🛶 Water Sports"]
    },
    {
        name: "Cacela Velha",
        region: "Algarve",
        lat: 37.1565,
        lng: -7.5458,
        img: "images/beaches/cacela-thumb.jpg",
        detailImg: "images/beaches/cacela-landscape.jpg",
        type: "Beach",
        description: "A pristine, completely undeveloped barrier island beach located at the eastern edge of the Ria Formosa Natural Park. It offers warm, shallow waters and vast, peaceful horizons.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "9 km/h", direction: "E" },
        uvIndex: { value: 8, label: "Very High" },
        tide: { nextLow: "14:10", nextHigh: "20:25" },

        extraDetails: [
            { label: "🚤 Lagoon Transit", value: "Wade across at low tide or take a fisherman's taxi boat" },
            { label: "🎒 Zero Amenities", value: "Wild island beach • Bring your own water and shade" }
        ],
        amenities: []
    },
    {
        name: "Ilha de Faro",
        region: "Algarve",
        lat: 37.0083,
        lng: -7.9943,
        img: "images/beaches/faro-thumb.jpg",
        detailImg: "images/beaches/faro-landscape.jpg",
        type: "Beach",
        description: "Situated on a barrier island within the Ria Formosa Natural Park, Ilha de Faro is an easily accessible beach connected to the mainland by a single-lane bridge. It features an expansive golden sand beach facing the open ocean, alongside a sheltered lagoon side popular for water sports.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "11 km/h", direction: "S" },
        uvIndex: { value: 7, label: "High" },
        tide: { nextLow: "14:15", nextHigh: "20:30" },

        extraDetails: [
            { label: "🌉 Bridge Access", value: "New bridge • Heavy traffic during summer peak hours" },
            { label: "🏖️ Dual Coastline", value: "Calm Ria Formosa lagoon on one side, open Atlantic waves on the other" },
            { label: "🚌 Public Transit", value: "Direct municipal bus connection (Line 16) from Faro Airport & city center" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds", "♿ Accessibility", "🛶 Water Sports"]
    },
    {
        name: "Praia do Cabeço",
        region: "Algarve",
        lat: 37.1754,
        lng: -7.4721,
        img: "images/beaches/cabeco-thumb.jpg",
        detailImg: "images/beaches/cabeco-landscape.jpg",
        type: "Beach",
        description: "Also known as Praia da Retur, this tranquil Eastern Algarve gem in Castro Marim is framed by a lush pine forest and pristine sand dunes. Renowned for its calm, shallow waters and noticeably warmer sea temperatures, it offers a peaceful, expansive coastal escape.",

        // Set to null so live API feeds dictate the grid UI
        temp: null,
        waveHeight: null,
        flag: "Green",
        wind: { speed: "9 km/h", direction: "SE" },
        uvIndex: { value: 7, label: "High" },
        tide: { nextLow: "14:10", nextHigh: "20:25" },

        extraDetails: [
            { label: "🌲 Pine Forest", value: "Framed by the dense Gancho pine woods with wooden boardwalks protecting the dunes" },
            { label: "🌡️ Warm Waters", value: "Enjoys some of the warmest sea temperatures in mainland Portugal" },
            { label: "👨‍👩‍👧 Family Friendly", value: "Gentle seabed slope, minimal swell, and safe swimming conditions" }
        ],
        amenities: ["🚗 Parking", "🍽️ Restaurants", "🧑‍⚕️ Lifeguard", "🚿 Showers", "🪑 Sunbeds", "♿ Accessibility"]
    }

];