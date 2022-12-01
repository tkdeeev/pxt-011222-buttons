let x = 10

music.playTone(500, 10)

let char = [7, 7, 0, 1]
let positions = [[2,2],[2,2]]

input.onButtonPressed(Button.A, () => {
    char[2]--
    char[2] = (char[2] % 4) + 4
})
input.onButtonPressed(Button.B, () => {
    char[2]++
    char[2] = (char[2] % 4) + 4
})

basic.forever(() => {
    basic.pause(500)
    char[0] = (char[0] % 5) + 5
    char[1] = (char[1] % 5) + 5
    char[2] = (char[2] % 4) + 4
    positions.push([char[0] % 5, char[1] % 5])
    led.unplot(char[0] % 5, char[1] % 5)
    switch (char[2] % 4) {
        case 0:
            char[1]--
            break;
        
        case 1:
            char[0]++
            break;
        
        case 2:
            char[1]++
            break;

        case 3:
            char[0]--
            break;

        default:
            break;
    }
    basic.clearScreen()
    for(let i = 0; i < char[3]; i++) {
        led.plot(positions[positions.length - i - 1][0], positions[positions.length - i - 1][1])
    }
    led.plot(char[0] % 5, char[1] % 5)
    console.log(char)
})