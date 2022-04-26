// importing packages
mocha.setup('bdd');
const assert = chai.assert;
const expect = chai.expect;
mocha.checkLeaks();
mocha.setup({ globals: ['_'] });
mocha.run();

// Function should test input and calculate the correct output
describe('Bill Settings Factory function test', () => {
    // setting costs
    describe('Setting costs', () => {
        // call costs
        it('should be able to set the call cost', () => {
            let billOne = BillSettings()
            billOne.setCriticalLevel(5)
            const setCall = billOne.setCallCost(.99)
            const getCall = billOne.getCallCost()
            assert.equal(getCall, setCall)
        });
        it('should be able to set the call cost of a different amount', () => {
            let billTwo = BillSettings()
            const setCall = billTwo.setCallCost(2.99)
            const getCall = billTwo.getCallCost()
            assert.equal(getCall, setCall)
        });
        // sms costs
        it('should be able to set the sms cost', () => {
            let bmsBill = BillSettings()
            const setSms = bmsBill.setSmsCost(.60)
            const getSms = bmsBill.getSmsCost()
            expect(setSms).to.be.eq(getSms)
        });
        it('should be able to set the sms cost of a different amount', () => {
            let smsBillTwo = BillSettings()
            const setSms = smsBillTwo.setSmsCost(.5)
            const getSms = smsBillTwo.getSmsCost()
            assert.equal(getSms, setSms)
        });
    });
    // setting levels
    describe('Setting Levels', () => {
        it('should be able to set the warning level', () => {
            let warningBill = BillSettings()
            const setWarning = warningBill.setWarningLevel(30)
            const getWarning = warningBill.getWarningLevel()
            assert.equal(setWarning, getWarning)
        });
        it('should be able to set the critical level', () => {
            let criticalBill = BillSettings()
            const setCritical = criticalBill.setCriticalLevel(50)
            const getCritical = criticalBill.getCriticalLevel()
            expect(setCritical).to.be.eq(getCritical)
        })
    });
    // total amounts
    describe('Total Amounts', () => {
        // call amount
        it('should be able to get the call total cost', () => {
            let instanceOne = BillSettings();
            instanceOne.setCallCost(1.99)
            instanceOne.makeCall()
            const getCall = instanceOne.getCallTotalCost()
            assert.equal(1.99, getCall)
        });
        it('should be able to get the call when multiole calls are made', () => {
            let instanceTwo = BillSettings();
            instanceTwo.setCallCost(3.99)
            instanceTwo.makeCall()
            instanceTwo.makeCall()
            const getCall = instanceTwo.getCallTotalCost()
            assert.equal(7.98, getCall)
        });

        // sms amount
        it('should be able to get the sms total amount', () => {
            let instanceThree = BillSettings()
            instanceThree.setSmsCost(2.35)
            instanceThree.sendSms()
            let getAllSmsCost = instanceThree.getSmsTotalCost()
            expect(getAllSmsCost).to.be.eq(2.35)
        });
        it('should be able to get the sms total amount for multiple sms(s)', () => {
            let instanceFour = BillSettings()
            instanceFour.setSmsCost(.95)
            instanceFour.sendSms()
            instanceFour.sendSms()
            instanceFour.sendSms()
            instanceFour.sendSms()
            let getAllSmsCost = instanceFour.getSmsTotalCost()
            expect(getAllSmsCost).to.be.eq(3.8)
        });
        it('should be able to get the total amount for multiple calls and sms(s) made', () => {
            let totalInstance = BillSettings()
            totalInstance.setSmsCost(.95)
            totalInstance.setCallCost(1.95)
            totalInstance.sendSms()
            totalInstance.sendSms()
            totalInstance.sendSms()
            totalInstance.sendSms()
            totalInstance.sendSms()
            totalInstance.makeCall()
            totalInstance.makeCall()
            totalInstance.makeCall()
            totalInstance.makeCall()
            totalInstance.makeCall()
            totalInstance.allTotalAmounts()
            let getTotal = totalInstance.getAllTotalAmount()
            expect(getTotal).to.be.eq(14.5)
        });
    });

    describe('Level Limit', () => {
        it('should return "" class name if the total is below warning level', () => {
            let nothingInstance = BillSettings()
            nothingInstance.setWarningLevel(10)
            nothingInstance.setCriticalLevel(20)
            nothingInstance.setCallCost(2.5)
            nothingInstance.setSmsCost(1.75)
            nothingInstance.makeCall()
            nothingInstance.makeCall()
            nothingInstance.sendSms()
            nothingInstance.sendSms()
            nothingInstance.allTotalAmounts()
            nothingInstance.getAllTotalAmount()
            assert.equal(nothingInstance.totalClassName(), '')
        });
        it('should return the "warning" class name if the total is below level', () => {
            let warningInstance = BillSettings()
            warningInstance.setWarningLevel(5)
            warningInstance.setCriticalLevel(10)
            warningInstance.setCallCost(2.5)
            warningInstance.setSmsCost(1.75)
            warningInstance.makeCall()
            warningInstance.makeCall()
            warningInstance.sendSms()
            warningInstance.allTotalAmounts()
            assert.equal(warningInstance.totalClassName(), 'warning')
        });
        it('should return "danger" class name when the total has reached critical level and stop from adding amounts', () => {
            let dangerInstance = BillSettings()
            dangerInstance.setWarningLevel(5)
            dangerInstance.setCriticalLevel(10)
            dangerInstance.setCallCost(2.5)
            dangerInstance.setSmsCost(1.75)
            dangerInstance.makeCall()
            dangerInstance.makeCall()
            dangerInstance.sendSms()
            dangerInstance.sendSms()
            dangerInstance.makeCall()
            dangerInstance.makeCall()
            dangerInstance.sendSms()
            dangerInstance.sendSms()
            dangerInstance.allTotalAmounts()
            dangerInstance.getAllTotalAmount()
            dangerInstance.totalClassName()
            assert.equal(dangerInstance.totalClassName(), 'danger')
        });
    })

});
