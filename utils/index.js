const calcCostType = (currentAmount, prop, { paying, free }) => {
    const type = {
        FIXED: 1,
        PER_PERSON: paying + free,
        PER_PAYER: paying,
        PER_FREE: free,
        INCOME: -1
    }[prop]
    
    return currentAmount * type;
}

const calcCostWhen = (currentAmount, prop, days) => {
    const when = {
        ONETIME: 1,
        PER_DAY: days,
        PER_NIGHT: days - 1
    }[prop]
    
    return currentAmount * when;
}

module.exports = {
    calcCostType,
    calcCostWhen
}