const pdf_functions = require('../functions/pdf_function/pdfFunctions');

exports.basicHoroscope = (req, res, next) => {
    pdf_functions
        .basicHoroscope(req)
        .then((s) => {
            res.json(s);
        })
        .catch((s) => {
            res.json(s);
        });
};
exports.matchingDetail = (req, res, next) => {
    pdf_functions
        .matchingDetail(req)
        .then((s) => {
            res.json(s);
        })
        .catch((s) => {
            res.json(s);
        });
};
exports.downloadFile = (req, res, next) => {
    pdf_functions
        .downloadFile(req)
        .then((s) => {
            res.json(s);
        })
        .catch((s) => {
            res.json(s);
        });
};
exports.downloadMatchingFile = (req, res, next) => {
    pdf_functions
        .downloadMatchingFile(req)
        .then((s) => {
            res.json(s);
        })
        .catch((s) => {
            res.json(s);
        });
};