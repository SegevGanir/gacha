

const SAVE_KEY = "gacha";

function getNewGame() {
    return {
        res: {
            points: 0,
            shreds: 0,
            energy: 0,

            fire: 0,
            water: 0,
            leaf: 0,
            sun: 0,
            moon: 0,
        },
        flags: {
            statUnlocks: {},
        },
        time: {
            now: Date.now(),
            drawCooldown: 0,
            skillCooldowns: {},
            pickit: 5,
        },
        stats: {
            timePlayed: 0,
            cardsDrawn: 0,
            skillsUsed: {},
            reactionCount: 0,
        },
        cards: {},
        badges: {},
        drawPref: {
            faction: "",
            skills: {}
        },
        option: {
            notation: "default",
            music: "",
        },
    }
}