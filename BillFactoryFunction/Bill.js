
const billSettings = () => {
    // initialising amounts
    let theCallCost = 0
    let theSmsCost = 0
    let theWarningLevel = 0
    let theCriticalLevel = 0
    // total amounts

    let totalAmount = 0;

    // Setting the call & sms cost
    const setCallCost = $ => theCallCost = $
    const setSmsCost = $ => theSmsCost = $
    // factorising the functions and pass it in ass a parameter
    const getCallCost = $ => $
    const getSmsCost = $ => $

    // Setting the levels
    const setWarningLevel = $ => theWarningLevel = $
    const setCriticalLevel = $ => theCriticalLevel = $
    // getting the levels
    const getWarningLevel = _ => theWarningLevel
    const getCriticalLevel = _ => theCriticalLevel

    // get sms total cost
    const getCallTotalCost = $ => $
    // get sms total cost
    const getSmsTotalCost = $ => $

    // get total amount and if total amount is greater than critical level do not add
    const allTotalAmounts = (setCall, setSms) => totalAmount >= theCriticalLevel ? totalAmount : totalAmount = getCallTotalCost(setCall) + getSmsTotalCost(setSms)
    const getAllTotalAmount = $ => totalAmount
    // set warning levels
    const totalClassName = $ => getAllTotalAmount() < theWarningLevel ? 'level okay' : getAllTotalAmount() >= theWarningLevel & theWarningLevel < theCriticalLevel ? 'warning' : 'danger'

    return {
        // retrieving the set functions
        setCallCost,
        setSmsCost,
        setWarningLevel,
        setCriticalLevel,

        // retrieving the get functions
        getCallCost,
        getSmsCost,
        getWarningLevel,
        getCriticalLevel,

        // retrieving the total amount functions
        getCallTotalCost,
        getSmsTotalCost,
        allTotalAmounts,
        getAllTotalAmount,

        // retrieving warning level limit
        totalClassName,
    }
}