module.exports = (sequelize, DataTypes) => {
    const passportApplicant = sequelize.define("passportApplicant", {
        applicationNumber: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        first_name : {
            type: DataTypes.STRING,
        },
        middle_name : {
            type: DataTypes.STRING,
        },
        last_name : {
            type: DataTypes.STRING
        },
        first_name_amharic : {
            type: DataTypes.STRING,
        },
        middle_name_amharic : {
            type: DataTypes.STRING,
        },
        last_name_amharic : {
            type: DataTypes.STRING
        },
        phone : {
            type: DataTypes.STRING,
        },
        email : {
            type: DataTypes.STRING
        },
        date_of_birth : {
            type: DataTypes.DATE,
        },
        place_of_birth : {
            type: DataTypes.STRING,
        },
        date_of_birth_amharic : {
            type: DataTypes.DATE,
        },
        place_of_birth_amharic : {
            type: DataTypes.STRING,
        },
        gender : {
            type: DataTypes.STRING,
        },
        nationality : {
            type: DataTypes.STRING,
        },
        occupation : {
            type: DataTypes.STRING,
        },
        hair_color : {
            type: DataTypes.STRING,
        },
        eye_color : {
            type: DataTypes.STRING,
        },
        martial_status : {
            type: DataTypes.STRING,
        },
        country_code : {
            type: DataTypes.STRING,
        },
        birth_certificate_id : {
            type: DataTypes.STRING,
        },
        height : {
            type: DataTypes.STRING,
        },
        region : {
            type: DataTypes.STRING,
        },
        city : {
            type: DataTypes.STRING,
        },
        state : {
            type: DataTypes.STRING,
        },
        zone : {
            type: DataTypes.STRING,
        },
        woreda : {
            type: DataTypes.STRING,
        },
        kebele : {
            type: DataTypes.STRING,
        },
        street : {
            type: DataTypes.STRING,
        },
        house_number : {
            type: DataTypes.STRING,
        },
        useResidentialAsBilling : {
            type: DataTypes.BOOLEAN,
        },
        Billing_region : {
            type: DataTypes.STRING,
        },
        Billing_city : {
            type: DataTypes.STRING,
        },
        Billing_state : {
            type: DataTypes.STRING,
        },
        Billing_zone : {
            type: DataTypes.STRING,
        },
        Billing_woreda : {
            type: DataTypes.STRING,
        },
        Billing_kebele : {
            type: DataTypes.STRING,
        },
        Billing_street : {
            type: DataTypes.STRING,
        },
        Billing_house_number : {
            type: DataTypes.STRING,
        },
        passport_page_number : {
            type: DataTypes.STRING,
        },
        old_passport_number : {
            type: DataTypes.STRING,
        },
        old_passport_issue_date : {
            type: DataTypes.STRING,
        },
        old_passport_expire_date : {
            type: DataTypes.STRING,
        },
        application_type : {
            type: DataTypes.STRING,
        },
        correction_document : {
            type: DataTypes.STRING,
        },
        old_passport_picture : {
            type: DataTypes.STRING,
        },
        passport_size_photo : {
            type: DataTypes.STRING,
        },
        viditure : {
            type: DataTypes.STRING,
        },
        signiture : {
            type: DataTypes.STRING,
        },
        applicantId : {
            type: DataTypes.STRING,
        },
        status : {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    });
    return passportApplicant;
};