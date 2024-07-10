console.log("Hello Hackerman. Thanks for checking out the website.");

let selectedTier = null;

const masterworkCosts = [
    {   tier: 1, 
        description: 'Affixes are 5% stronger.', 
        obducite: 10, 
        Rawhide: 10,
        'Iron Chunk': 10,
        'Veiled Crystal': 3,
        gold: '100,000',
    },
    {   tier: 2, 
        description: 'Affixes are 5% stronger.', 
        obducite: 20, 
        Rawhide: 10,
        'Iron Chunk': 10,
        'Veiled Crystal': 3,
        gold: '150,000',
    },
    {   tier: 3, 
        description: 'Affixes are 5% stronger.', 
        obducite: 30, 
        Rawhide: 15,
        'Iron Chunk': 15,
        'Veiled Crystal': 4,
        gold: '200,000',
    },
    {   tier: 4, 
        description: 'Affixes are 25% stronger.', 
        obducite: 40, 
        Rawhide: 15,
        'Iron Chunk': 15,
        'Veiled Crystal': 4,
        gold: '300,000',
    },
    {   tier: 5, 
        description: 'Affixes are 5% stronger.', 
        Ingolith: 20, 
        Rawhide: 25,
        'Iron Chunk': 25,
        'Veiled Crystal': 6,
        gold: '400,000',
    },
    {   tier: 6, 
        description: 'Affixes are 5% stronger.', 
        Ingolith: 40, 
        Rawhide: 30,
        'Iron Chunk': 30,
        'Veiled Crystal': 8,
        gold: '600,000',
    },
    {   tier: 7, 
        description: 'Affixes are 5% stronger.', 
        Ingolith: 80, 
        Rawhide: 40,
        'Iron Chunk': 40,
        'Veiled Crystal': 10,
        gold: '800,000',
    },
    {   tier: 8, 
        description: 'Affixes are 25% stronger.', 
        Ingolith: 120, 
        Rawhide: 50,
        'Iron Chunk': 50,
        'Veiled Crystal': 15,
        gold: '800,000',
    },
    {   tier: 9, 
        description: 'Affixes are 5% stronger.', 
        Neathiron: 50, 
        'Abstruce Sigil': 10,
        'Baleful Fragment': 10,
        'Coiling Ward': 10,
        'Forgotten Soul': 3,
        'Veiled Crystal': 20,
        gold: '2,000,000',
    },
    {   tier: 10, 
        description: 'Affixes are 5% stronger.', 
        Neathiron: 100, 
        'Abstruce Sigil': 10,
        'Baleful Fragment': 10,
        'Coiling Ward': 10,
        'Forgotten Soul': 5,
        'Veiled Crystal': 30,
        gold: '3,000,000',
    },
    {   tier: 11, 
        description: 'Affixes are 5% stronger.', 
        Neathiron: 150, 
        'Abstruce Sigil': 15,
        'Baleful Fragment': 15,
        'Coiling Ward': 15,
        'Forgotten Soul': 7,
        'Veiled Crystal': 40,
        gold: '5,000,000',
    },
    {   tier: 12, 
        description: 'Affixes are 25% stronger.', 
        Neathiron: 250, 
        'Abstruce Sigil': 20,
        'Baleful Fragment': 20,
        'Coiling Ward': 20,
        'Forgotten Soul': 10,
        'Veiled Crystal': 50,
        gold: '2,500,000', 
    },
];

const populateTierOptions = () => {
    const tierSelect = document.getElementById('tier');

    tierSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select tier';
    tierSelect.appendChild(defaultOption);

    masterworkCosts.forEach(cost => {
        const option = document.createElement('option');
        option.value = cost.tier;
        option.textContent = `Tier ${cost.tier}`;
        tierSelect.appendChild(option);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    populateTierOptions();

    document.getElementById('tier').addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === '') {
            selectedTier = null;
        } else {
            selectedTier = parseInt(selectedValue);
        }
    });

    document.getElementById('show-details').addEventListener('click', () => {
        if (selectedTier !== null) {
            displayTierDetails(selectedTier);
        } else {
            alert('Please select a tier.');
        }
    });
});

const displayTierDetails = (tier) => {
    const cost = masterworkCosts.find(c => c.tier === tier);
    if (cost) {
        const tierResults = document.getElementById('tier-results');
        
        let details = `
            <p><b>Description</b>: ${cost.description}</p>
            <p><b>Gold</b>: ${cost.gold}</p>
        `;

        const resources = ['obducite', 'Ingolith', 'Neathiron', 'Rawhide', 'Iron Chunk', 'Veiled Crystal', 'Abstruce Sigil', 'Baleful Fragment', 'Coiling Ward', 'Forgotten Soul'];
        resources.forEach(resource => {
            if (cost[resource] !== undefined) {
                details += `<p><b>${resource}</b>: ${cost[resource]}</p>`;
            }
        });

        tierResults.innerHTML = details;
    }
};

const convertMaterials = (type, quantity) => {
    let ingolith = 0, obducite = 0;

    if (type === 'neathiron') {
        ingolith = quantity * 3;
        obducite = ingolith * 3;
    } else if (type === 'ingolith') {
        obducite = quantity * 3;
    }

    return { ingolith, obducite };
};

document.getElementById('material-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const materialType = document.getElementById('material-type').value;
    const materialQuantity = parseInt(document.getElementById('material-quantity').value);
    const conversion = convertMaterials(materialType, materialQuantity);

    const conversionResults = document.getElementById('conversion-results');
    if (materialType === 'neathiron') {
        conversionResults.innerHTML = `
            <p class="disclaimer"><i><b><u>Disclaimer</u></b>: The amount of Obducite is based on transmuting Ingolith, which comes from Neathiron. Only Ingolith is provided initially; Obducite is obtained after further transmutation.</i></p>
            <p><b>Ingolith</b>: ${conversion.ingolith}</p>
            <p><b>Obducite</b>: ${conversion.obducite}</p>
        `;
    } else if (materialType === 'ingolith') {
        conversionResults.innerHTML = `
            <p><b>Obducite</b>: ${conversion.obducite}</p>
        `;
    }
});

const getRewards = (tier) => {
    let obducite = 0, ingolith = 0, neathiron = 0;

    if (tier >= 1 && tier <= 30) {
        obducite = 10 + tier - 1;
    } else if (tier >= 31 && tier <= 60) {
        ingolith = 20 + (tier - 31);
    } else if (tier >= 61 && tier < 101) {
        neathiron = 20 + (tier - 61);
    } else if (tier >= 101) {
        if (tier <= 102) {
            neathiron = 60;
        } else if (tier <= 104) {
            neathiron = 61;
        } else if (tier <= 107) {
            neathiron = 62;
        } else if (tier <= 109) {
            neathiron = 63;
        } else if (tier <= 112) {
            neathiron = 64;
        } else if (tier <= 114) {
            neathiron = 65;
        } else if (tier <= 117) {
            neathiron = 66;
        } else if (tier <= 120) {
            neathiron = 67;
        } else if (tier <= 122) {
            neathiron = 68;
        } else if (tier <= 124) {
            neathiron = 69;
        } else if (tier == 125) {
            neathiron = 70;
        } else {
            neathiron = 70 + Math.floor((tier - 125) / 3);
        }
    }

    return { obducite, ingolith, neathiron };
};


document.getElementById('pit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pitTier = parseInt(document.getElementById('pit-tier').value);
    const rewards = getRewards(pitTier);

    const pitResults = document.getElementById('pit-results');
    pitResults.innerHTML = `
        <p><b>Obducite</b>: ${rewards.obducite}</p>
        <p><b>Ingolith</b>: ${rewards.ingolith}</p>
        <p><b>Neathiron</b>: ${rewards.neathiron}</p>
        <hr />
    `;
});

document.addEventListener('DOMContentLoaded', () => {
    populateTierOptions();
});
