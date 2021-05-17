'use strict'

const assert = require('assert');

const bmi = require('../bmi_processor');

describe('Testing bmiDetails function from package', () => {
    it("TestCase --> 1", async () => {
        let res1 = await bmi.getBmiDetails(23);
        let tar1 = {'bmi_category' : 'normal weight', "health_risk" : 'low risk', "bmi" : 23}
        assert.deepStrictEqual(res1, tar1);
    })
    it("TestCase --> 2", async () => {
        let res2 = await bmi.getBmiDetails(32.8);
        let tar2 = {"bmi_category" : 'moderate obese', "health_risk" : 'medium risk', "bmi" : 32.8}
        assert.deepStrictEqual(res2, tar2);
    })
    it("TestCase --> 3", async () => {
        let res3 = await bmi.getBmiDetails(0);
        let tar3 = {'bmi_category' : 'NA', "health_risk" : 'NA', "bmi" : -1}
        assert.deepStrictEqual(res3, tar3)
    })
})