const tableGroups = [
  {
    name: 'loyalty_tables',
    database: 'c4m-customer-intelligence',
    schema: 'normalised',
    tables: ['d_customer', 'd_brand', 'd_coupon_rule','pippo','pluto','anto'],
  },
  {
    name: 'ecommerce_tables',
    database: 'c4m-customer-intelligence',
    schema: 'normalised',
    tables: ['f_order','f_order_flow'],
  }
];

module.exports = {tableGroups};