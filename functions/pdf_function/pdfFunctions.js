var connection = require('../../db/connection');
const crypto = require('crypto');
const { encryptData, decryptData } = require('../../helper/encrypt.helper');
var request = require('request');
const http = require('http');
const fs = require('fs');

exports.downloadFile = (req) => {
    return new Promise((resolve, reject) => {
        let insertString = `INSERT INTO downloadpdf (mobileno) values ('${req.body.mobileno}')`;
        connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ message: errInsert, status: 0 });
            resolve({ message: "DownloadURl", data: '', status: 1 })
        });
    })
}
exports.downloadMatchingFile = (req) => {
    return new Promise((resolve, reject) => {
        let insertString = `INSERT INTO downloadMatchpdf (mobileno) values ('${req.body.mobileno}')`;
        connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ message: errInsert, status: 0 });
            resolve({ message: "DownloadURl", data: '', status: 1 })
        });
    })
}
exports.basicHoroscope = (req) => {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': 'https://pdf.astrologyapi.com/v1/basic_horoscope_pdf',
            'headers': {
                'Authorization': 'Basic NDU0NTpCeVZPSWFPREg1N1FSVmk2Q3Fzd0hYR2xjcER2ajd0WkJSb29yWQ==',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'name': req.body.fullName,
                'gender': req.body.gender.toLowerCase(),
                'day': (req.body.my_dob.split("T")[0]).split("-")[2],
                'month': (req.body.my_dob.split("T")[0]).split("-")[1],
                'year': (req.body.my_dob.split("T")[0]).split("-")[0],
                'hour': (req.body.my_dob.split("T")[1]).split(":")[0],
                'min': (req.body.my_dob.split("T")[1]).split(":")[1],
                'lat': req.body.MyLocation.split(",")[0],
                'lon': req.body.MyLocation.split(",")[1],
                'tzone': '5.5',
                'language': req.body.language,
                'place': req.body.MyLocationLabel,
                'chart_style': "north_indian", //req.body.chartType,
                'logo_url': 'https://astrosagga.com/assets/images/logo.png',
                'footer_link': 'astrosagga.com',
                'company_name': 'AstroSagga',
                'company_info': 'PLAN YOUR FUTURE WITH US,magine if you could plan your future;debunking all myths around predictions and fortune telling.',
                'domain_url': 'https://astrosagga.com',
                'company_email': 'astrosagga@gmail.com',
                'company_lanline': '9057111116',
                'company_mobile': '9057111116'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var fullData = JSON.parse(response.body)
            // console.log(fullData.pdf_url.split("/").pop())
            if (!fullData.status) {
                resolve({ message: fullData.msg, data: "", status: 0 })
            }
            request.get(fullData.pdf_url)
                // .pipe(fs.createWriteStream(__dirname + '../../../uploads/pdfs/' + ((req.body.fullName).replace(" ", "_")) + '_Birth_Detail.pdf'))
                .pipe(fs.createWriteStream(__dirname + '/../../uploads/pdfs/' + (fullData.pdf_url).split("/").pop()))
                .on('finish', function () {
                    // console.log('Le fichier a été téléchargé et enregistré avec succès.');

                    let insertString = `INSERT INTO userdownloadpdf (fullName, gender, my_dob, MyLocation, MyLocationLabel, language, chartType, pdfurl) 
                        values ('${req.body.fullName}','${req.body.gender}','${req.body.my_dob}','${req.body.MyLocation}','${req.body.MyLocationLabel}','${req.body.language}','${req.body.chartType}','${(fullData.pdf_url).split("/").pop()}')`;
                    // console.log(insertString)
                    connection.query(insertString, (errInsert, insertResult) => {
                        let data = {}
                        if (errInsert) reject({ message: errInsert, status: 0 });
                        // resolve({ message: "Course Added successfully", data, status: 1 })
                        resolve({ message: fullData.msg, data: "uploads/pdfs/" + (fullData.pdf_url).split("/").pop(), status: 1 })
                    });
                });
        });
    });
};



exports.matchingDetail = (req) => {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': 'https://pdf.astrologyapi.com/v1/match_making_pdf',
            'headers': {
                'Authorization': 'Basic NDU0NTpCeVZPSWFPREg1N1FSVmk2Q3Fzd0hYR2xjcER2ajd0WkJSb29yWQ==',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'm_first_name': req.body.boy_name.split(" ")[0],
                'm_last_name': req.body.boy_name.split(" ")[1],
                'm_day': (req.body.boy_dob.split("T")[0]).split("-")[2],
                'm_month': (req.body.boy_dob.split("T")[0]).split("-")[1],
                'm_year': (req.body.boy_dob.split("T")[0]).split("-")[0],
                'm_hour': (req.body.boy_dob.split("T")[1]).split(":")[0],
                'm_min': (req.body.boy_dob.split("T")[1]).split(":")[1],
                'm_lat': req.body.boy_location.split(",")[0],
                'm_lon': req.body.boy_location.split(",")[1],
                'm_tzone': '5.5',
                'm_place': req.body.boy_locationLabel,

                'f_first_name': req.body.girl_name.split(" ")[0],
                'f_last_name': req.body.girl_name.split(" ")[1],
                'f_day': (req.body.girl_dob.split("T")[0]).split("-")[2],
                'f_month': (req.body.girl_dob.split("T")[0]).split("-")[1],
                'f_year': (req.body.girl_dob.split("T")[0]).split("-")[0],
                'f_hour': (req.body.girl_dob.split("T")[1]).split(":")[0],
                'f_min': (req.body.girl_dob.split("T")[1]).split(":")[1],
                'f_lat': req.body.girl_location.split(",")[0],
                'f_lon': req.body.girl_location.split(",")[1],
                'f_tzone': '5.5',
                'f_place': req.body.girl_locationLabel,
                'language': req.body.language,
                'chart_style': req.body.chartType,
                'ashtakoot': 'true',
                'dashakoot': 'true',
                'papasamyam': 'true',
                'logo_url': 'https://astrosagga.com/assets/images/logo.png',
                'footer_link': 'astrosagga.com',
                'company_name': 'AstroSagga',
                'company_info': 'PLAN YOUR FUTURE WITH US,magine if you could plan your future;debunking all myths around predictions and fortune telling.',
                'domain_url': 'https://astrosagga.com',
                'company_email': 'astrosagga@gmail.com',
                'company_lanline': '9057111116',
                'company_mobile': '9057111116'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var fullData = JSON.parse(response.body)
            // console.log(fullData.pdf_url.split("/").pop())
            if (!fullData.status) {
                resolve({ message: fullData.msg, data: "", status: 0 })
            }
            request.get(fullData.pdf_url)
                // .pipe(fs.createWriteStream(__dirname + '../../../uploads/pdfs/' + ((req.body.fullName).replace(" ", "_")) + '_Birth_Detail.pdf'))
                .pipe(fs.createWriteStream(__dirname + '/../../uploads/pdfs/' + (fullData.pdf_url).split("/").pop()))
                .on('finish', function () {
                    // console.log('Le fichier a été téléchargé et enregistré avec succès.');

                    let insertString = `INSERT INTO usermatchdownloadpdf (fullName, my_dob, MyLocation, MyLocationLabel,f_fullName, f_my_dob, f_MyLocation, f_MyLocationLabel, language, chartType, pdfurl) 
                        values ('${req.body.boy_name}','${req.body.boy_dob}','${req.body.boy_location}','${req.body.boy_locationLabel}','${req.body.girl_name}','${req.body.girl_dob}','${req.body.girl_location}','${req.body.girl_locationLabel}','${req.body.language}','${req.body.chartType}','${(fullData.pdf_url).split("/").pop()}')`;
                    // console.log(insertString)
                    connection.query(insertString, (errInsert, insertResult) => {
                        let data = {}
                        if (errInsert) reject({ message: errInsert, status: 0 });
                        // resolve({ message: "Course Added successfully", data, status: 1 })
                        resolve({ message: fullData.msg, data: "uploads/pdfs/" + (fullData.pdf_url).split("/").pop(), status: 1 })
                    });
                });
        });
    });
};