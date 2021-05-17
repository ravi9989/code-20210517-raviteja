const bmi = require('./bmi_processor');
// console.log(bmi)
let s = async function () {
    await bmi.processFile('/bmiProcessor/assets/testing_data.json', '/bmiProcessor/assets/testing_out.json')
}

console.log(s());
