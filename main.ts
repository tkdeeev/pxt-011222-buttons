//Inicializace
const config = {
    updateRate: 400 //Rychlost hry - jeden frame (ms)
}
let char = {
    pos: [2, 2],
    rot: 0,
    len: 1,
    dead: false
}
let positions = [[2, 2], [2, 3], [2, 4]]
let score = 0

let tempPosX = 0;
let tempPosY = 0;

let fruitCoords = GenerateRandomFruit()

music.playTone(500, 10)

//Eventy
input.onButtonPressed(Button.A, () => {
    //Otoci smer o -90° (-1)
    char.rot = char.rot <= 0 ? 3 : (char.rot - 1)
})
input.onButtonPressed(Button.B, () => {
    //Otoci smer o 90° (1)
    char.rot = char.rot >= 3 ? 0 : (char.rot + 1)
})

//Iterace
basic.forever(() => {
    DrawFruit()
    //Updaterate = 2 Hz
    basic.pause(config.updateRate)
    console.log("New frame");

    //Nahraje momentální pozici do arr positions,
    tempPosX = char.pos[0];
    tempPosY = char.pos[1];
    positions.push([tempPosX, tempPosY])

    //Vymaze momentální pozici
    basic.clearScreen()

    //Vyhodnoti dalsi pole podle smeru
    GetNewPosition(); // <---

    DrawSnake();

    CheckFruitCollection();
})

function Debug_LogPositions(mssg: string): void {
    console.log(`POSITION ${mssg}:`);
    for (let i = positions.length - 1; i >= 0; i--) {
        console.log(`${positions[i][0]}, ${positions[i][1]}`);
    }
}

function DrawSnake(): void {

    //console.log("DRAW SNAKES");

    for (let i = positions.length - 1; i >= (positions.length - char.len); i--) {
        led.plot(positions[i][0], positions[i][1])
    }

    //Zobrazi hlavu hada (aktualni pozice)
    led.plot(char.pos[0], char.pos[1])
}

function GetNewPosition(): void {
    switch (char.rot) {
        case 0:
            char.pos[1] = char.pos[1] <= 0 ? 4 : (char.pos[1] - 1)
            break;

        case 1:
            char.pos[0] = char.pos[0] >= 4 ? 0 : (char.pos[0] + 1)
            break;

        case 2:
            char.pos[1] = char.pos[1] >= 4 ? 0 : (char.pos[1] + 1)
            break;

        case 3:
            char.pos[0] = char.pos[0] <= 0 ? 4 : (char.pos[0] - 1)
            break;

        default:
            break;
    }
}

function CheckFruitCollection(): void {
    if (fruitCoords[0] == char.pos[0] && fruitCoords[1] == char.pos[1]) {
        score++
        led.unplot(fruitCoords[0], fruitCoords[1])
        GenerateRandomFruit()
        char.len++
    }
}

function GenerateRandomFruit(): number[] {
    let randomCoords = [randint(0, 4), randint(0, 4)]
    led.plot(randomCoords[0], randomCoords[1])
    fruitCoords = randomCoords
    DrawFruit()
    return fruitCoords
}

function DrawFruit(): any {
    let i = 0
    loops.everyInterval(50, function () {
        if (i >= 9) return null
        led.toggle(fruitCoords[0], fruitCoords[1])
        i++
    })
}

function GetSnakesPosition() : any {

    let742 retPos

    for (let i = positions.length - 1; i >= (positions.length - char.len); i--) {
        led.plot(positions[i][0], positions[i][1])
    }
}