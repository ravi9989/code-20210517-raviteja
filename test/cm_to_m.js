'use strict'

const assert = require('assert');

const bmi = require('../bmi_processor');

describe('Testing convert_cm_to_m function from package', () => {
    it("TestCase --> 1", () => {
        assert.strictEqual(bmi.convertCmToM(165), 1.65)
    })
    it("TestCase --> 2", () => {
        assert.strictEqual(bmi.convertCmToM(-123), -1.23)
    })
    it("TestCase --> 3", () => {
        assert.strictEqual(bmi.convertCmToM(0), 0)
    })
})