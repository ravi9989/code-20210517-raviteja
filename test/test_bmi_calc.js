'use strict'

const assert = require('assert');

const bmi = require('../bmi_processor');

describe('Testing caluclateBmi function from package', () => {
    it("TestCase --> 1", async () => {
        let res1 = await bmi.caluclateBmi(175, 60);
        assert.strictEqual(res1, '19.6');
    })
    it("TestCase --> 2", async () => {
        let res2 = await bmi.caluclateBmi(0,55);
        assert.strictEqual(res2, 'Infinity');
    })
    it("TestCase --> 3", async () => {
        let res3 = await bmi.caluclateBmi(0,0);
        assert.strictEqual(res3, 'NaN')
    })
})