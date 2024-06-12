console.log("Hello Hackerman. Thanks for checking out the website.")

const masterworkCosts = [
    { tier: 1, description: 'Affixes are 5% stronger.', gold: 100000, common: 10, veiled: 3, obducite: 10, ingolith: 0, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 2, description: 'Affixes are 5% stronger.', gold: 150000, common: 10, veiled: 3, obducite: 20, ingolith: 0, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 3, description: 'Affixes are 5% stronger.', gold: 200000, common: 15, veiled: 3, obducite: 30, ingolith: 0, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 4, description: 'A random affix is 25% stronger.', gold: 300000, common: 15, veiled: 4, obducite: 40, ingolith: 0, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 5, description: 'Affixes are 5% stronger.', gold: 150000, common: 25, veiled: 7, obducite: 0, ingolith: 30, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 6, description: 'Affixes are 5% stronger.', gold: 200000, common: 25, veiled: 7, obducite: 0, ingolith: 40, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 7, description: 'Affixes are 5% stronger.', gold: 600000, common: 30, veiled: 8, obducite: 0, ingolith: 50, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 8, description: 'A random affix is 25% stronger.', gold: 800000, common: 40, veiled: 10, obducite: 0, ingolith: 80, neathiron: 0, legendary: 0, forgotten: 0 },
    { tier: 9, description: 'Affixes are 5% stronger.', gold: 375000, common: 0, veiled: 9, obducite: 0, ingolith: 0, neathiron: 20, legendary: 2, forgotten: 1 },
    { tier: 10, description: 'Affixes are 5% stronger.', gold: 450000, common: 0, veiled: 12, obducite: 0, ingolith: 0, neathiron: 25, legendary: 2, forgotten: 1 },
    { tier: 11, description: 'Affixes are 5% stronger.', gold: 2000000, common: 0, veiled: 10, obducite: 0, ingolith: 0, neathiron: 50, legendary: 20, forgotten: 3 },
    { tier: 12, description: 'A random affix is 25% stronger.', gold: 10000000, common: 0, veiled: 50, obducite: 0, ingolith: 0, neathiron: 250, legendary: 20, forgotten: 10 },
];

const populateTierOptions = () => {
    const tierSelect = document.getElementById('tier');
    masterworkCosts.forEach(cost => {
        const option = document.createElement('option');
        option.value = cost.tier;
        option.textContent = `Tier ${cost.tier}`;
        tierSelect.appendChild(option);
    });
};

const displayTierDetails = (tier) => {
    const cost = masterworkCosts.find(c => c.tier === tier);
    if (cost) {
        const tierResults = document.getElementById('tier-results');
        tierResults.innerHTML = `
            <p><b>Description</b>: ${cost.description}</p>
            <p><b>Gold</b>: ${cost.gold.toLocaleString()}</p>
            <p><b>Common Upgrade Material</b>: ${cost.common}</p>
            <p><b>Veiled Crystals</b>: ${cost.veiled}</p>
            <p><b>Obducite</b>: ${cost.obducite}</p>
            <p><b>Ingolith</b>: ${cost.ingolith}</p>
            <p><b>Neathiron</b>: ${cost.neathiron}</p>
            <p><b>Legendary Upgrade Material</b>: ${cost.legendary}</p>
            <p><b>Forgotten Soul</b>: ${cost.forgotten}</p>
        `;
    }
};

// Event listener for tier form submission
document.getElementById('tier-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const tier = parseInt(document.getElementById('tier').value);
    displayTierDetails(tier);
});

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
    } else if (tier >= 61) {
        neathiron = 20 + (tier - 61);
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
