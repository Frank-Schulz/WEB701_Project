const Orders = require('../models/orders.model');

const genData = async () => {
    let orderIDs = [];
    let tokensData = [];

    const orders = await Orders.find({})

    orders.forEach(order => {
        orderIDs.push(order.id);
    })

    for (var i = 0; i < 10; i++) {
        tokensData.push({
            userID: 'frank@mail.com',
            orderID: orderIDs[ i ],
        });
    };
    return tokensData;
}

module.exports = genData();
