
const BillSettings = () => {
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
    const setCallCost = callCost => theCallCost = callCost
    const setSmsCost = smsCost => theSmsCost = smsCost
    // factorising the functions and pass it in ass a parameter
    const getCallCost = () => theCallCost
    const getSmsCost = () => theSmsCost

    // Setting the levels
    const setWarningLevel = setWarning => theWarningLevel = setWarning
    const setCriticalLevel = setCritical => theCriticalLevel = setCritical
    // getting the levels
    const getWarningLevel = () => theWarningLevel
    const getCriticalLevel = () => theCriticalLevel

    // get sms total cost

    const makeCall = () => !!hasReachedCriticalLevel ? theCallTotalCost += getCallCost() : theCallTotalCost

    const getCallTotalCost = () => theCallTotalCost

    const sendSms = () => !!hasReachedCriticalLevel ? theSmsTotalCost += getSmsCost() : theSmsTotalCost
    const getSmsTotalCost = () => theSmsTotalCost

    // get sms total cost

    // get total amount and if total amount is greater than critical level do not add
    const allTotalAmounts = () => totalAmount += getCallTotalCost() + getSmsTotalCost()
    const getAllTotalAmount = () => totalAmount

    const hasReachedCriticalLevel = () => getAllTotalAmount() >= getCriticalLevel()

    // set warning levels
    const totalClassName = () => hasReachedCriticalLevel() ? 'danger' : getAllTotalAmount() >= getWarningLevel() && 'warning'

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