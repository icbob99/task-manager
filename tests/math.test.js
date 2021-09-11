const { TestWatcher } = require('jest')
// const math = require('../src/math')
const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')

test('Should calculate total with value', ()=>{
    const total = calculateTip(10, .3)
    
    expect(total).toBe(13)
})

test('Should calculate total with default tipPercenation', ()=>{
    const total = calculateTip(10)
    
    expect(total).toBe(11.2)
})

test('Should convert 32 F to 0 C', ()=>{
    const actual = fahrenheitToCelsius(32);

    expect(actual).toBe(0)
})

test('Should convert 0 C to 32 F', ()=>{
    const actual = celsiusToFahrenheit(0);

    expect(actual).toBe(32)
})

test(' Should add 2 numbers with Prommis', (done)=>{
    add(2,3).then((sum)=>{
        expect (sum).toBe(5)
        done()
    })
})

test('Should add 2 numbers async/await', async ()=>{
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})


