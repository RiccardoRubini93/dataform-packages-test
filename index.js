function manage_bool_in_SAP(field) {
    return  `CASE
            WHEN ${field} = 'X' then True ELSE False END
     `
}

/**
 * Returns SQL expression to remove leading zero from string containing only numbers 
 * 
 *  @param {column} String - Column:
 *  @returns {string} -> SQL expression to remove leading zeros
 */
function removeLeadingZeros(column) {
    return `
        CASE
             WHEN SAFE_CAST(${column} AS INT64) IS NOT NULL THEN
                    LTRIM(${column},"0") 
             ELSE ${column} END
    `
}


module.exports = {
    manage_bool_in_SAP,
    removeLeadingZeros
    }