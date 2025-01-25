const baseEffect = {
    bulk: 1,
    bulkPower: 0,
    bulkMult: 1,

    cardRChance: 1e-3,
    cardSRChance: 0.99999e-5,
    cardSSRChance: 0.99999e-5,
    cardURChance: 0.99999e-6,

    energyCap: 10,
    
    points: 0,
    pointsExtra: 0,
    pointsMult: 1,

    shredMult: 1,
    shredRMult: 1,
    shredSRMult: 1,
    shredSSRMult: 1,
    shredURMult: 1,
    shredCrownMult: 10,

    fireGain: 1,
    waterGain: 1,
    leafGain: 1,
    sunGain: 1,
    moonGain: 1,
    factionMult: 1,
    factionChance: 1e-6,

    cooldownTime: 3,
    breakTime: 5,
    breakSkip: 0.3,
    revealTime: 0.5,
    revealSkip: 1,

    pickitRate: 1,
    pickitMax: 5,

    skillFireSkip: 60,
    skillFireCooldown: 120,
    skillWaterGain: 2,
    skillWaterCard: 1,
    skillWaterCard2: 1,
    skillWaterWait: 10,
    skillWaterCooldown: 240,
    skillLeafMult: 2,
    skillLeafCooldown: 600,
    skillSunBuff: 2,
    skillSunDebuff: 10,
    skillSunCooldown: 300,
    skillMoonBuff: 5,
    skillMoonDebuff: 2,
    skillMoonCooldown: 600,
}

const flags = {
    unlocked: {
        points: false,
        shreds: false,
        energy: false,
        market: false,
        faction: false,
        skills: false,
        pickit: false,
    }
}

const priority = {
    additive_before:       0,
    additive:              1,
    additive_after:        2,
    multiplicative_before: 10,
    multiplicative:        11,
    multiplicative_after:  12,
}

const statEntries = {
    general: {
        name: "General", 
        items: {
            timePlayed: {
                name: "Time played",
                display: () => _number(format.time(game.stats.timePlayed, 4)),
                cost: [100, "points"],
                event: "frame",
            },
        }
    },
    cards: {
        name: "Cards", 
        items: {
            cardsDrawn: {
                name: "Cards drawn",
                display: () => _number(format(game.stats.cardsDrawn, 0, 13)),
                cost: [100, "points"],
            },
            sep0: {
                separator: true,
            },
            bulkDraw: {
                name: "Bulk draw",
                display: () => _number(format(effects.bulk, 0, 7)),
                cost: [1e6, "points"],
            },
            bulkPower: {
                name: "Bulk power",
                display: () => _number(format(effects.bulkPower, 0, 7)),
                cost: [1e8, "points"],
            },
            bulkMult: {
                name: "Card draw multiplier",
                display: () => _number("×" + format(effects.bulkMult, 2, 7)),
                cost: [1e10, "points"],
            },
            sep1: {
                separator: true,
                condition: () => flags.unlocked.shreds,
            },
            cardRChance: {
                name: "<rarity rarity='r'></rarity> appear chance",
                condition: () => flags.unlocked.shreds,
                display: () => format.chance(effects.cardRChance, 0, 7),
                cost: [1e3, "shreds"],
            },
            cardSRChance: {
                name: "<rarity rarity='sr'></rarity> appear chance",
                condition: () => flags.unlocked.shreds,
                display: () => format.chance(effects.cardSRChance, 0, 7),
                cost: [1e5, "shreds"],
            },
            cardSSRChance: {
                name: "<rarity rarity='ssr'></rarity> appear chance",
                condition: () => flags.unlocked.shreds,
                display: () => format.chance(effects.cardSSRChance, 0, 7),
                cost: [1e7, "shreds"],
            },
            cardURChance: {
                name: "<rarity rarity='ur'></rarity> appear chance",
                condition: () => flags.unlocked.shreds,
                display: () => format.chance(effects.cardURChance, 0, 7),
                cost: [1e9, "shreds"],
            },
        }
    },
    points: {
        name: "Points", 
        items: {
            base: {
                name: "Base gain",
                display: () => _number(format(effects.points, 0, 7)),
                cost: [Math.E ** 20, "points"],
            },
            extra: {
                name: "Random gain",
                display: () => _number("0~" + format(effects.pointsExtra, 0, 7)),
                cost: [Math.E ** 28, "points"],
            },
            mult: {
                name: "Multiplier",
                display: () => _number("×" + format(effects.pointsMult, 2, 7)),
                cost: [Math.E ** 36, "points"],
            },
            calc: {
                name: "Gain on draw",
                display: () => {
                    let bulk = getDrawAmount();
                    return _number("~" + format((effects.points + effects.pointsExtra / 2) * effects.pointsMult * bulk, 0, 7))
                },
                cost: [10000, "energy"],
                event: "frame",
            },
        }
    },
    shreds: {
        name: "Shreds", 
        condition: () => flags.unlocked.shreds,
        items: {
            base: {
                name: "Base gain",
                display: () => _number(format(effects.shredMult, 0, 7)),
                cost: [1e4, "shreds"],
            },
            crownMult: {
                name: "Crowned card multi",
                display: () => _number("×" + format(effects.shredCrownMult, 2, 7)),
                cost: [Math.E ** 12, "shreds"],
            },
            rMult: {
                name: "<rarity rarity='r'></rarity> card multi",
                display: () => _number("×" + format(effects.shredRMult, 2, 7)),
                cost: [Math.E ** 15, "shreds"],
            },
            srMult: {
                name: "<rarity rarity='sr'></rarity> card multi",
                display: () => _number("×" + format(effects.shredSRMult, 2, 7)),
                cost: [Math.E ** 20, "shreds"],
            },
            ssrMult: {
                name: "<rarity rarity='ssr'></rarity> card multi",
                display: () => _number("×" + format(effects.shredSSRMult, 2, 7)),
                cost: [Math.E ** 30, "shreds"],
            },
            urMult: {
                name: "<rarity rarity='ur'></rarity> card multi",
                display: () => _number("×" + format(effects.shredURMult, 2, 7)),
                cost: [Math.E ** 50, "shreds"],
            },
        }
    },
    faction: {
        name: "Faction", 
        condition: () => flags.unlocked.faction,
        items: {
            chance: {
                name: "Power chance",
                display: () => format.chance(effects.factionChance, 0, 7),
                cost: [1e10, "shreds"],
            },
            sep0: {
                separator: true,
            },
            fire: {
                name: "Fire Power gain",
                display: () => _number(format(effects.fireGain, 0, 7)),
                cost: [120, "fire"],
            },
            water: {
                name: "Water Power gain",
                display: () => _number(format(effects.waterGain, 0, 7)),
                cost: [120, "water"],
            },
            leaf: {
                name: "Leaf Power gain",
                display: () => _number(format(effects.leafGain, 0, 7)),
                cost: [120, "leaf"],
            },
            sun: {
                name: "Sun Power gain",
                display: () => _number(format(effects.sunGain, 0, 7)),
                cost: [120, "sun"],
            },
            moon: {
                name: "Moon Power gain",
                display: () => _number(format(effects.moonGain, 0, 7)),
                cost: [120, "moon"],
            },
            mult: {
                name: "All Power mult",
                display: () => _number("×" + format(effects.factionMult, 2, 7)),
                cost: [1e18, "shreds"],
            },
            calc: {
                name: "Gain on draw",
                display: () => {
                    if (!game.drawPref.faction) return "-";
                    let bulk = getDrawAmount();
                    return _number("~" + format(effects[game.drawPref.faction + "Gain"] * effects.factionChance * effects.factionMult * bulk))
                        + " " + currencies[game.drawPref.faction].name;
                },
                cost: [1000000, "energy"],
                event: "frame",
            },
        }
    },
    skills: {
        name: "Skills", 
        condition: () => flags.unlocked.skills,
        items: {
            fireUse: {
                name: "\"Burst\" use count",
                condition: () => hasCard("standard", "ssr", "s_fire"),
                display: () => _number(format(game.stats.skillsUsed.fire ?? 0)),
                cost: [1e5, "fire"],
            },
            waterUse: {
                name: "\"Freeze Drop\" use count",
                condition: () => hasCard("standard", "ssr", "s_water"),
                display: () => _number(format(game.stats.skillsUsed.water ?? 0)),
                cost: [1e5, "water"],
            },
            leafUse: {
                name: "\"Fertilizer\" use count",
                condition: () => hasCard("standard", "ssr", "s_leaf"),
                display: () => _number(format(game.stats.skillsUsed.leaf ?? 0)),
                cost: [1e5, "leaf"],
            },
            sunUse: {
                name: "\"Photosynthesis\" use count",
                condition: () => hasCard("standard", "ssr", "s_sun"),
                display: () => _number(format(game.stats.skillsUsed.sun ?? 0)),
                cost: [1e5, "sun"],
            },
            moonUse: {
                name: "\"Simplification\" use count",
                condition: () => hasCard("standard", "ssr", "s_moon"),
                display: () => _number(format(game.stats.skillsUsed.moon ?? 0)),
                cost: [1e5, "moon"],
            },
            sep0: {
                separator: true,
                condition: () => game.stats.reactionCount > 0
            },
            reaction: {
                name: "Skill reactions",
                condition: () => game.stats.reactionCount > 0,
                display: () => _number(format(game.stats.reactionCount ?? 0)),
                cost: [1e14, "shreds"],
            },
        }
    }
}
