const descriptions = {
    '0201': 'CRM customer master',
    '0202': 'CRM mapping'
    }

const fields = {

    '0201': [

        {
            field_name_interface: 'idnum',
            attribute_technical_name_standard: 'customer_number',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'customer number | SAP Customer Number; SAP Business Partner Number | Source System: CRM_P60. Source Field: idnum'
        },
        {
            field_name_interface: 'address_inval',
            attribute_technical_name_standard: 'address_invalid_flag',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'BOOLEAN',
            description: 'address invalid flag | Indicator if the address is invalid | Source System: CRM_P60. Source Field: address_inval'
        },
        {
            field_name_interface: 'address_cntry',
            attribute_technical_name_standard: 'address_country_code_iso',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address country code | ISO country code for the address | Source System: CRM_P60. Source Field: address_cntry'
        },
        {
            field_name_interface: 'address_pstcd',
            attribute_technical_name_standard: 'address_zip_code',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address zip code | Postal code of the address | Source System: CRM_P60. Source Field: address_pstcd'
        },
        {
            field_name_interface: 'address_state',
            attribute_technical_name_standard: 'address_state_name',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address state name | State or region of the address | Source System: CRM_P60. Source Field: address_state'
        },
        {
            field_name_interface: 'address_district',
            attribute_technical_name_standard: 'address_district_name',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address district name | District or locality of the address | Source System: CRM_P60. Source Field: address_district'
        },
        {
            field_name_interface: 'address_city',
            attribute_technical_name_standard: 'address_city_name',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address city name | City or town of the address | Source System: CRM_P60. Source Field: address_city'
        },
        {
            field_name_interface: 'address_stret',
            attribute_technical_name_standard: 'address_street_name',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address street name | Street name of the address | Source System: CRM_P60. Source Field: address_stret'
        },
        {
            field_name_interface: 'address_stret2',
            attribute_technical_name_standard: 'address_street_name_2',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address street name 2 | Additional street name information for the address | Source System: CRM_P60. Source Field: address_stret2'
        },
        {
            field_name_interface: 'address_stret3',
            attribute_technical_name_standard: 'address_street_name_3',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'address street name 3 | Additional street name information for the address | Source System: CRM_P60. Source Field: address_stret3'
        },
        {
            field_name_interface: 'phone_number',
            attribute_technical_name_standard: 'phone_number_hash_code',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'phone number hash code | Encrypted phone number for privacy reasons | Source System: CRM_P60. Source Field: phone_number'
        },
        {
            field_name_interface: 'communication_email',
            attribute_technical_name_standard: 'email_address_hash_code',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'email address hash code | Encrypted email address for privacy reasons | Source System: CRM_P60. Source Field: communication_email'
        },
        {
            field_name_interface: 'mail_domain',
            attribute_technical_name_standard: 'email_address_domain_name',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'email address domain name | Domain part of the email address | Source System: CRM_P60. Source Field: mail_domain'
        },
        {
            field_name_interface: 'person_delet',
            attribute_technical_name_standard: 'customer_isdeleted_flag',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'BOOLEAN',
            description: 'customer is deleted flag | Flag indicating whether the customer is deleted | Source System: CRM_P60. Source Field: person_delet'
        },
        {
            field_name_interface: 'person_bdate',
            attribute_technical_name_standard: 'customer_birth_year',
            field_data_type_interface: 'DATE',
            attribute_data_type_standard: 'DATE',
            description: 'customer birth year | Year of birth of the customer | Source System: CRM_P60. Source Field: person_bdate'
        },
        {
            field_name_interface: 'person_corla',
            attribute_technical_name_standard: 'customer_language_code',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'customer language code | Language code of the customer | Source System: CRM_P60. Source Field: person_corla'
        },
        {
            field_name_interface: 'person_origin',
            attribute_technical_name_standard: 'customer_source_code',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'customer source code | Code indicating the source of the customer data | Source System: CRM_P60. Source Field: person_origin'
        },
        {
            field_name_interface: 'person_sex',
            attribute_technical_name_standard: 'customer_gender_code',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'customer gender code | Gender code of the customer | Source System: CRM_P60. Source Field: person_sex'
        }
    ],

    '0202': [{
            field_name_interface: 'idnum',
            attribute_technical_name_standard: 'customer_number',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'Customer number | SAP Customer Number aka SAP Business Partner Number | Source System: CRM_P60. Source Field: idnum'
        },
        {
            field_name_interface: 'date_entry',
            attribute_technical_name_standard: 'customer_number_created_date',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'DATE',
            description: 'Customer number created date | Date when the customer number was created | Source System: CRM_P60. Source Field: date_entry'
        },
        {
            field_name_interface: 'date_fr',
            attribute_technical_name_standard: 'customer_number_validfrom_date',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'DATE',
            description: 'Customer number valid from date | Start date of the validity period for the customer number | Source System: CRM_P60. Source Field: date_fr'
        },
        {
            field_name_interface: 'date_to',
            attribute_technical_name_standard: 'customer_number_validto_date',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'DATE',
            description: 'Customer number valid to date | End date of the validity period for the customer number | Source System: CRM_P60. Source Field: date_to'
        },
        {
            field_name_interface: 'idnum_other',
            attribute_technical_name_standard: 'customer_number_soe',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'Customer number (SOE) | Another customer number associated with a different source of entry (SOE) | Source System: CRM_P60. Source Field: idnum_other'
        },
        {
            field_name_interface: 'idtyp',
            attribute_technical_name_standard: 'customer_number_type',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'Customer number type | Type of customer number (e.g., individual or business) | Source System: CRM_P60. Source Field: idtyp'
        },
        {
            field_name_interface: 'subsy',
            attribute_technical_name_standard: 'customer_number_soe_name',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'Customer number source of entry (SOE) name | Name of the system from which the customer number was sourced | Source System: CRM_P60. Source Field: subsy'
        },
        {
            field_name_interface: 'subsy_stats',
            attribute_technical_name_standard: 'customer_number_status_soe',
            field_data_type_interface: 'STRING',
            attribute_data_type_standard: 'STRING',
            description: 'Customer number SOE status | Status of the customer number in the source of entry system | Source System: CRM_P60. Source Field: subsy_stats'
        }


    ]

};


// crm transforms
const makeSelectStatement = (pipeNumber) => {
    const fieldsArr = fields[pipeNumber]
    return fieldsArr.reduce((agg, fieldObj, index) => {
        const {
            attribute_technical_name_standard,
            field_name_interface,
            field_data_type_interface,
            attribute_data_type_standard
        } = fieldObj
        // transform STRING to DATE
        if (attribute_data_type_standard === 'DATE' && field_data_type_interface === 'STRING') {
            return agg + ' ' + ` IF (${field_name_interface} IS NULL OR LEFT(${field_name_interface},4) = '9999', null, parse_date('%Y-%m-%d',${field_name_interface})) as ${attribute_technical_name_standard}  ${(index !== fieldsArr.length - 1) ?',' : ''}`
        }
        // transform STRING to BOOL
        if (attribute_data_type_standard === 'BOOLEAN' && field_data_type_interface === 'STRING') {
            return agg + ' ' + `${field_name_interface} = 'true' as ${attribute_technical_name_standard}  ${(index !== fieldsArr.length - 1) ?',' : ''}`
        }
        return agg + ' ' +
            `${field_name_interface} as ${attribute_technical_name_standard} ` +
            ((index !== fieldsArr.length - 1) ? ',' : '')
    }, '')
};

const makeFieldDefinitions = (pipeNumber) => {
    const fieldsArr = fields[pipeNumber]
    return fieldsArr.reduce((agg, fieldObj) => {
        const {
            attribute_technical_name_standard,
            description
        } = fieldObj
        const obj = agg
        obj[attribute_technical_name_standard] = description
        return obj
    }, {})
};

module.exports = {
    descriptions,
    makeSelectStatement,
    makeFieldDefinitions
};
