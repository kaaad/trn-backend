
const validateMerchant = (webhook, amount) => {
    let arr = [];

    if(webhook.length !== 5) {
        arr.push("Invalid webhook")
    }

    switch (amount) {
        case "$500":
            arr.push("not applicable")
            break;
    
        default:
            break;
    }
}

module.exports = validateMerchant;