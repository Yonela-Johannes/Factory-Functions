// importing packages
mocha.setup('bdd');
const assert = chai.assert;
const expect = chai.expect;
mocha.checkLeaks();
mocha.run();

// Function should test input and calculate the correct output
describe('Bill Settings Factory function test', () => {
    // calling and capturing the global function
    const BillSet = billSettings()

    // calling function with amount

    // setting costs
    describe('Setting costs', () => {
        // call costs
        it('should be able to set the call cost of any amount', () => {
            let setCall = BillSet.setCallCost(2.99)
            setCall += 2.99
            const getCall = BillSet.getCallCost(setCall)
            assert.equal(getCall, setCall)
        });
        it('should be able to set the call cost of multiple different amounts', () => {
            let setCall = BillSet.setCallCost(2.99)
            setCall += 2.99
            setCall += 1.99
            setCall += .98
            assert.equal(8.95, setCall.toFixed(2))
        });
        // sms costs
        it('should be able to set the sms cost', () => {
            let setSms = BillSet.setSmsCost(4.60)
            const getSms = BillSet.getSmsCost(setSms)
            expect(setSms).to.be.eq(getSms)
        });
        it('should be able to set the sms cost and add the same amount', () => {
            let setSms = BillSet.setSmsCost(4.60)
            setSms += setSms
            const getSms = BillSet.getSmsCost(setSms)
            expect(setSms).to.be.eq(getSms)
        });
        it('should be able to set the sms cost of multiple different amounts', () => {
            let setSms = BillSet.setSmsCost(.6)
            setSms += 2.99
            setSms += 1.99
            setSms += .98
            const getSms = BillSet.getSmsCost(setSms)
            assert.equal(getSms.toFixed(2), setSms.toFixed(2))
        });
    });
    // setting levels
    describe('Setting Levels', () => {
        it('should be able to set the warning level', () => {
            const setWarning = BillSet.setWarningLevel(70)
            const getWarning = BillSet.getWarningLevel(setWarning)
            assert.equal(setWarning, getWarning)
        });
        it('should be able to set the critical level', () => {
            const setCritical = BillSet.setCriticalLevel(100)
            const getCritical = BillSet.getCriticalLevel(setCritical)
            expect(setCritical).to.be.eq(getCritical)
        })
    });
    // total amounts
    describe('Total Amounts', () => {
        // call amount
        it('should be able to get the call total cost', () => {
            const setCall = BillSet.setCallCost(1.99)
            const getCall = BillSet.getCallTotalCost(setCall)
            assert.equal(setCall, getCall)
        });
        it('should be able to get the call and add more calls to the total call amount', () => {
            let setCall = BillSet.setCallCost(.99)
            setCall += .65
            setCall += .63
            setCall += .31
            setCall += 1.65
            const getCall = BillSet.getCallTotalCost(setCall)
            assert.equal(setCall, getCall)
        });

        it('should be able to get the total call cost when another amount is added', () => {
            let setCall = BillSet.setCallCost(1.69)
            let getAllCallCost = BillSet.getCallTotalCost(setCall) + BillSet.getCallTotalCost(2.64)
            const result = 1.69 + 2.64
            assert.equal(result, getAllCallCost)
        });
        // sms amount
        it('should be able to get the sms total amount', () => {
            let setSms = BillSet.setSmsCost(2.35)
            let getAllSmsCost = BillSet.getSmsTotalCost(setSms)
            expect(getAllSmsCost).to.be.eq(2.35)
        });
        it('should be able to get the sms total amount even when same amount is added', () => {
            let setSms = BillSet.setSmsCost(2.35)
            let getAllSmsCost = BillSet.getSmsTotalCost(setSms) + BillSet.getSmsTotalCost(setSms)
            let result = 2.35 + 2.35
            expect(getAllSmsCost).to.be.eq(result)
        });
        it('should be able to get the sms total amount even when another amount is added', () => {
            let setSms = BillSet.setSmsCost(2.35)
            let getAllSmsCost = BillSet.getSmsTotalCost(setSms) + BillSet.getSmsTotalCost(12.30)
            let result = 14.65
            expect(getAllSmsCost).to.be.eq(result)
        });
        describe('Total Amount', () => {
            it('should return total when call cost is R1.88 and sms cost is .25c', () => {
                const setCall = BillSet.getCallTotalCost(1.88)
                const setSms = BillSet.getSmsTotalCost(.25)
                const result = BillSet.allTotalAmounts(1.88, .25)
                const totalAmount = BillSet.allTotalAmounts(setCall, setSms)
                expect(result).to.be.eq(totalAmount)
            });
            it(`should return total when call cost is R1.59 and sms cost is R0.59`, () => {
                const setCall = BillSet.getCallTotalCost(1.59)
                const setSms = BillSet.getSmsTotalCost(.59)
                const result = setCall + setSms
                const totalAmount = BillSet.allTotalAmounts(1.59, .59)
                expect(totalAmount).to.be.eq(result)
            });
            it(`should return total when sms factory function is called`, () => {
                const setSms = BillSet.getSmsTotalCost(.5)
                let result = BillSet.allTotalAmounts(1.99, setSms)
                const totalAmount = BillSet.allTotalAmounts(1.99, .5)
                expect(result).to.be.eq(totalAmount)
            });
            it(`should return total when sms's are added and call remain at last total`, () => {
                let setSms = BillSet.getSmsTotalCost(11.10)
                let setCall = BillSet.getCallTotalCost(.99)
                const result = BillSet.allTotalAmounts(setCall, setSms)
                const totalAmount = setSms + setCall
                expect(result).to.be.eq(totalAmount)
            });
        });
    });

    describe('Level Limit', () => {
        it('should return "level okay" class name if the total is below level', () => {
            BillSet.setWarningLevel(20)
            const totalCall = BillSet.getCallTotalCost(12.5)
            const totalSms = BillSet.getSmsTotalCost(4.750)
            BillSet.allTotalAmounts(totalCall, totalSms)
            assert.equal(BillSet.totalClassName(), 'level okay')
        });
        it('should return "warning" class name, if the total is equals or above warning level', () => {
            BillSet.setWarningLevel(50)
            const totalCall = BillSet.getCallTotalCost(12.5)
            const totalSms = BillSet.getSmsTotalCost(50.750)
            BillSet.allTotalAmounts(totalCall, totalSms)
            assert.equal(BillSet.totalClassName(), 'warning')
        });
        it('should return "danger" class name, if the total is equals to critical level and do not any calls or sms(s)', () => {
            BillSet.setWarningLevel(100)
            const totalCall = BillSet.getCallTotalCost(50.5)
            const totalSms = BillSet.getSmsTotalCost(50.750)
            BillSet.allTotalAmounts(totalCall, totalSms)
            assert.equal(BillSet.totalClassName(), 'danger')
        });
    })

});
