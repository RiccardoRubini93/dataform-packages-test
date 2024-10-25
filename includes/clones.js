const TARGET_DATASETS = [
  { prefix: '1st_layer___', target: 'data__1st_layer' },
  { prefix: '2nd_layer___', target: 'data__2nd_layer' }
]

const TABLES = [
    { name: "1st_layer___0101__product_master_main",                          author: 'u7209608'},
    { name: "1st_layer___0005__customer_transactions_swacom",                 author: 'u6130137'},
    { name: "2nd_layer___0005__customer_transactions_swacom",                 author: 'u6130137'},         
    { name: "2nd_layer___0155__OTIF_B2C",                                     author: 'u5037967'},
    { name: "2nd_layer___fx",                                                 author: 'u5037967'},     
]

module.exports = { TABLES, TARGET_DATASETS }