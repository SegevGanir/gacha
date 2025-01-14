const baseEffect = {
    bulk: 1,
    bulkPower: 0,
    bulkMult: 1,

    energyCap: 10,
    
    points: 0,
    pointsExtra: 0,
    pointsMult: 1,

    cooldownTime: 3,
    breakTime: 5,
    breakSkip: 0.3,
    revealTime: 0.5,
    revealSkip: 1,
}

const priority = {
    additive_before:       0,
    additive:              1,
    additive_after:        2,
    multiplicative_before: 10,
    multiplicative:        11,
    multiplicative_after:  12,
}