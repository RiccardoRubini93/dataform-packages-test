function manage_bool_in_SAP(field) {
    return  `CASE
            WHEN ${field} = 'X' then True ELSE False END
     `
}


module.exports = {manage_bool_in_SAP}