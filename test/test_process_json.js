'use strict'

const assert = require('assert');

const bmi = require('../bmi_processor');

describe('Testing bmiDetails function from package', () => {
    it("TestCase --> 1", async () => {
        let test_data = [{"Gender" : "Male", "HeightCm" : 161, "WeightKg" : 85}]
        let res1 = await bmi.processJsonData(test_data);
        let tar1 = [{"Gender":"Male","HeightCm":161,"WeightKg":85,"bmi_category":"moderate obese","health_risk":"medium risk","bmi":"32.8"}]
        assert.deepStrictEqual(res1, tar1);
    })
    
})