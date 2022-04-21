
const billSettings = () => {
    // initialising amounts
    let theCallCost = 0
    let theSmsCost = 0
    let theWarningLevel = 0
    let theCriticalLevel = 0
    // total amounts
    let theSmsTotalCost = 0
    let theCallTotalCost = 0
    let totalAmount = 0


    // Setting the call & sms cost
    const setCallCost = $ => theCallCost = $
    const setSmsCost = $ => theSmsCost = $
    // factorising the functions and pass it in ass a parameter
    const getCallCost = $ => theCallCost
    const getSmsCost = _ => theSmsCost

    // Setting the levels
    const setWarningLevel = $ => theWarningLevel = $
    const setCriticalLevel = $ => theCriticalLevel = $
    // getting the levels
    const getWarningLevel = _ => theWarningLevel
    const getCriticalLevel = _ => theCriticalLevel

    // get sms total cost

    const makeCall = _ => !!hasReachedCriticalLevel ? theCallTotalCost += getCallCost() : theCallTotalCost

    const getCallTotalCost = $ => theCallTotalCost

    const sendSms = _ => !!hasReachedCriticalLevel ? theSmsTotalCost += getSmsCost() : theSmsTotalCost
    const getSmsTotalCost = $ => theSmsTotalCost

    // get sms total cost

    // get total amount and if total amount is greater than critical level do not add
    const allTotalAmounts = _ => totalAmount += getCallTotalCost() + getSmsTotalCost()
    const getAllTotalAmount = $ => totalAmount

    const hasReachedCriticalLevel = _ => getAllTotalAmount() >= getCriticalLevel()

    // set warning levels
    const totalClassName = $ => hasReachedCriticalLevel() ? 'danger' : getAllTotalAmount() >= getWarningLevel() && 'warning'

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

        // sending amounts
        makeCall,
        sendSms,
        // retrieving the total amount functions
        getCallTotalCost,
        getSmsTotalCost,
        allTotalAmounts,
        getAllTotalAmount,

        // retrieving warning level limit
        totalClassName,
    }
}