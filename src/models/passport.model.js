module.exports = (sequelize, DataTypes) => {
    const passports = sequelize.define("passports", {
        Applicantid:{
            type: DataTypes.INTEGER,
        },
        issue_Date : {
            type: DataTypes.DATE,
        },
        expire_date : {
            type: DataTypes.DATE,
        },
        passport_type : {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true
    });
    return passports;
};