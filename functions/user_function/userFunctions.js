var connection = require('../../db/connection');
const crypto = require('crypto');
const { encryptData, decryptData } = require('../../helper/encrypt.helper');
const { sendMailFunction } = require('../../helper/email');

exports.loginWithMobile = (req) => {
  return new Promise((resolve, reject) => {
    let { mobileNo, otp } = req.body;
    if (mobileNo.match(/^[0-9]+$/) == null || mobileNo.length != 10) {
      reject({ 'status': 400, "message": "Mobile No is not valid" })
    } else if (otp.match(/^[0-9]+$/) == null || otp.length != 6) {
      reject({ 'status': 400, "message": "OTP is not valid" })
    }

    let userSelectQuery = `select intId, name,email, password,token from userslist where phone='${mobileNo}'`;
    connection.query(userSelectQuery, function (errSelect, userResult) {
      if (errSelect) reject({ data: errSelect, status: 0 });
      if (userResult.length > 0) {
        if (otp == '000000') {
          let loggedUser = userResult[0];
          resolve({ data: { intId: loggedUser.intId, token: loggedUser.token, name: loggedUser.name, email: loggedUser.email, username: loggedUser.username, username: loggedUser.username }, status: 1 })
        } else {
          reject({ data: 'Please check Mobile Number', status: 400 })
        }
      } else {
        reject({ data: 'Mobile No not exist', status: 503 })
      }
    })
  })
};

exports.sendOtp = (req) => {
  return new Promise((resolve, reject) => {
    let { mobileNo } = req.body;
    if (mobileNo.match(/^[0-9]+$/) == null || mobileNo.length != 10) {
      reject({ 'status': 400, "message": "Mobile No is not valid" })
    }

    let userSelectQuery = `select intId, name,email, password,token from userslist where phone='${mobileNo}'`;
    connection.query(userSelectQuery, function (errSelect, userResult) {
      if (errSelect) reject({ data: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: 'OTP Send to your mobile number', status: 200 })
      } else {
        reject({ data: 'Mobile no is not registerd', status: 503 })
      }
    })
  })
};

exports.verifyOtp = (req) => {
  return new Promise((resolve, reject) => {
    let { mobileNo, otp } = req.body;
    if (mobileNo.match(/^[0-9]+$/) == null || mobileNo.length != 10) {
      reject({ 'status': 400, "message": "Mobile No is not valid" })
    } else if (otp.match(/^[0-9]+$/) == null || otp.length != 6) {
      reject({ 'status': 400, "message": "OTP is not valid" })
    }

    let userSelectQuery = `select intId, name,email, password,token from userslist where phone='${mobileNo}'`;
    connection.query(userSelectQuery, function (errSelect, userResult) {
      if (errSelect) reject({ data: errSelect, status: 0 });
      if (userResult.length > 0) {
        if (otp == '000000') {
          let loggedUser = userResult[0];
          resolve({ data: { intId: loggedUser.intId, token: loggedUser.token, name: loggedUser.name, email: loggedUser.email, username: loggedUser.username, username: loggedUser.username }, status: 1 })
        } else {
          reject({ data: 'Please check Mobile Number', status: 400 })
        }
      } else {
        reject({ data: 'Mobile No not exist', status: 503 })
      }
    })
  })
};


exports.userLogin = (req) => {
  return new Promise((resolve, reject) => {
    let { email, password } = req.body;
    let userSelectQuery = `select intId, name,email, password,token from userslist where email='${email}' and userType = 'User'`;
    connection.query(userSelectQuery, function (errSelect, userResult) {
      if (errSelect) reject({ data: errSelect, status: 0 });
      if (userResult.length > 0) {
        let loggedUser = userResult[0];
        let userPassword = loggedUser.password;
        let decryptedPassword = decryptData(userPassword)
        if (decryptedPassword == password) {
          // sendMailFunction('Register', 'Rahul', 'testingweb02@gmail.com')
          resolve({ data: { intId: loggedUser.intId, token: loggedUser.token, name: loggedUser.name, email: loggedUser.email, username: loggedUser.username, username: loggedUser.username }, status: 1 })
        } else {
          resolve({ data: 'Please check username and password', status: 0 })
        }
      } else {
        resolve({ data: 'Please check username and password', status: 0 })
      }
    })
  })
};


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

exports.register = (req) => {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var password = req.body.password;

  return new Promise((resolve, reject) => {

    var validRegex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

    if (phone.match(/^[0-9]+$/) == null || phone.length != 10) {
      reject({ 'status': 400, "message": "Mobile No is not valid" })
    } else if (email.match(validRegex)) {
      reject({ 'status': 400, "message": "Email is not valid" })
    }


    if (req.body.email != '' && req.body.password != '' && req.body.name != '') {
      let sqlQuery = `select * from userslist where email='${email}'`;
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          reject({ data: err, status: 0 })
        }
        if (result.length == 0) {
          let hashPassword = encryptData(password)
          // let token_string = crypto.randomUUID();
          let token_string = makeid(32);
          let insertString = `INSERT INTO userslist (name, email, phone, password, userType, token) VALUES ('${name}', '${email}', '${phone}', '${hashPassword}', 'User', '${token_string}')`;
          connection.query(insertString, (errInsert, insertResult) => {
            let data = {
              username: name,
              email: email,
              name: name,
              intId: insertResult.insertId,
              token: token_string
            }
            if (errInsert) reject({ data: errInsert, status: 0 });
            sendMailFunction('Register', name, email)
            resolve({ data: "User successfully Created", data, status: 1 })
          });
        }
        else {
          reject({ 'status': 200, "message": "Email already exists." })
        }
      })
    } else {
      reject({ 'status': 400, "message": "Not valid Input" })
    }
  })
};

exports.getUserProfile = (req) => {
  var Query = `SELECT name,email,phone,image FROM userslist WHERE intId=${req.headers.userid}`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      } else {
        reject({ data: [], status: 200, message: "No Data Found" });
      }
    })
  });
};

exports.editUserProfile = (req) => {
  let { name, email, phone } = req.body;
  var Query = `UPDATE userslist SET name='${name}',email='${email}',phone='${phone}' WHERE intId=${req.headers.userid}`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.affectedRows > 0) {
        resolve({ data: [], status: 200, message: "Profile Updated Success" });
      } else {
        reject({ data: [], status: 503, message: "Error in updation" });
      }
    })
  });
};

exports.changePassword = (req) => {
  return new Promise((resolve, reject) => {
    let { userId, newPassword, repeatPassword, currentPassword } = req.body;
    if (newPassword != '' && repeatPassword != '' && currentPassword != '') {
      if (newPassword == repeatPassword) {

        let userSelectQuery = `select password,name,email from userslist where intId='${req.headers.userid}'`;
        connection.query(userSelectQuery, function (errSelect, userResult) {
          if (errSelect) reject({ data: errSelect, status: 0 });
          if (userResult.length > 0) {
            let loggedUser = userResult[0];
            let userPassword = loggedUser.password;
            let decryptedPassword = decryptData(userPassword)
            if (decryptedPassword == currentPassword) {

              let hashPassword = encryptData(newPassword)
              let insertString = `UPDATE userslist SET password ='${hashPassword}' WHERE intId=${req.headers.userid}`;
              connection.query(insertString, (errInsert, insertResult) => {
                let data = {}
                if (errInsert) reject({ data: errInsert, status: 0 });

                sendMailFunction('ChangePassword', loggedUser.name, loggedUser.email)
                resolve({ message: "Password Change successfully", data, status: 1 })
              });
            } else {
              reject({ message: 'Please check username and password', data: [], status: 200 })
            }
          } else {
            reject({ message: 'Please check username and password', data: [], status: 200 })
          }
        })
      } else {
        reject({ message: 'Password Not Metch', status: 400 })
      }
    } else {
      reject({ message: 'Error', status: 400 })
    }
  });
};



exports.getUserCourse = (req) => {
  var Query = `SELECT a.name,a.email,a.phone,b.courseName,b.courseFees,b.courseTime,b.courseType,c.createdDate,b.categoryName,c.courseId,b.language ,SUBSTRING_INDEX(b.courseIFrames, ',', 1) as courseIFrames, LENGTH(b.courseIFrames) - LENGTH(REPLACE(courseIFrames, ',', '')) + 1 as totalLesson FROM userslist a, courses b, usercourses c WHERE a.intId=c.userId AND b.intId=c.courseId AND c.userId=${req.headers.userid}`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      } else {
        resolve({ data: [], status: 1, message: "Success" });
      }
    })
  });
};


exports.getUserCourseDetail = (req) => {
  var Query = `SELECT a.name,a.email,a.phone,b.courseName,b.courseFees,b.courseTime,b.courseType,c.createdDate,b.categoryName,c.courseId,b.courseIFrames FROM userslist a, courses b, usercourses c WHERE a.intId=c.userId AND b.intId=c.courseId AND c.userId=${req.headers.userid} and c.courseId=${req.body.courseId}`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      console.log(userResult)
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" }); arguments
      }
    })
  });
};



exports.getUserPaymentHistory = (req) => {
  var Query = `SELECT a.name,a.email,a.phone,b.courseName,b.courseFees,b.courseTime,b.courseType,c.PayPalPaymentId, c.paymentStatus, c.createdDate FROM userslist a, courses b, userpayments c WHERE a.intId=c.userId AND b.intId=c.courseId AND c.userId=${req.headers.userid}`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      }
    })
  });
};



exports.addCoursePayemnt = (req) => {
  return new Promise((resolve, reject) => {
    let { userId, courseId, PayPalPaymentId, paymentStatus, expDate } = req.body;
    if (userId != '' && courseId != '' && PayPalPaymentId != '' && paymentStatus != '') {
      let insertString = `INSERT INTO userpayments (userId, courseId, PayPalPaymentId, paymentStatus) 
    values ('${userId}','${courseId}','${PayPalPaymentId}','${paymentStatus}')`;
      connection.query(insertString, (errInsert, insertResult) => {
        let data = {}
        if (errInsert) reject({ message: errInsert, status: 200 });

        let insertString_1 = `INSERT INTO usercourses (userId, courseId, PayPalPaymentId, expireDate) 
      values ('${userId}','${courseId}','${PayPalPaymentId}','${expDate}')`;
        connection.query(insertString_1, (errInsert_1, insertResult_1) => {
          let data = {}
          if (errInsert_1) reject({ data: errInsert_1, status: 200 });
          resolve({ message: "Course Added successfully", data, status: 200 })
        });
      });
    } else {
      reject({ message: "Error", data: [], status: 400 })
    }
  })
};

var request = require('request');
exports.getAccessToken = (req) => {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'POST',
      'url': 'https://api.prokerala.com/token',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'grant_type': 'client_credentials',
        'client_id': 'e9871ca9-24d1-4ade-83e5-a050dcb34ddf',
        'client_secret': 'gpakLmjyn9x43Le1SEZtouQTXF3lXp3ZbFRy4xvL'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var access_token = JSON.parse(response.body).access_token
      resolve({ data: access_token, status: 1, message: "Success" });
    });
  });
};


exports.getAllHoroscope = (req) => {
  var currentDate = new Date(new Date().getTime() + 0 * 60 * 60 * 1000);
  var day = ('0' + currentDate.getDate()).slice(-2)
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  var year = currentDate.getFullYear()

  var date = year + '-' + month + '-' + day
  if (req.body.date != null && req.body.date != '' && req.body.date != undefined) {
    date = req.body.date
  }

  var Query = `Select * from horoscope where rashi ='${req.body.rashi}' AND horoscopeDate='${date}'`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult?.length > 0) {
        let data = { "panchangDate": userResult[0].horoscopeDate, "fullData": JSON.parse(userResult[0].description) }
        resolve({ message: "successfully", data: data, status: 1 })
      } else {
        var mydata = this.getAccessToken()
        mydata.then(function (data) {
          var access_token = data.data
          var datetime = date + "T00:00:00.000Z"
          var options = {
            'method': 'GET',
            'url': `https://api.prokerala.com/v2/horoscope/daily?datetime=${datetime}&sign=${req.body.rashi.toLowerCase()}`,
            'headers': {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token
            },
            form: {}
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            var fullData = JSON.stringify(JSON.parse(response.body))
            let insertString_1 = `INSERT INTO horoscope (rashi, horoscopeDate, description) values ('${req.body.rashi}','${datetime.split("T")[0]}','${mysql_real_escape_string(fullData)}')`;
            connection.query(insertString_1, (errInsert_1, insertResult_1) => {
              if (errInsert_1) reject({ data: errInsert_1, status: 0 });

              let data = { "rashi": req.body.rashi, "horoscopeDate": date, "fullData": JSON.parse(fullData) }
              resolve({ message: "Added successfully", data: data, status: 1 })
            });
          });

        });
      }
    }.bind(this))
  });

};

exports.getTodayPanchang = (req) => {
  var currentDate = new Date(new Date().getTime() + 0 * 60 * 60 * 1000);
  var day = ('0' + currentDate.getDate()).slice(-2)
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
  var year = currentDate.getFullYear()

  var date = year + '-' + month + '-' + day
  if (req.body.date != null && req.body.date != '' && req.body.date != undefined) {
    date = req.body.date
  }

  var Query = `Select * from panchang where panchangDate='${date}'`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        let data = { "sunTime": userResult[0].sunTime, "moonTime": userResult[0].moonTime, "panchangDate": userResult[0].panchangDate, "fullData": JSON.parse(userResult[0].description).data }
        resolve({ message: "successfully", data: data, status: 1 })
      } else {
        var mydata = this.getAccessToken()
        mydata.then(function (data) {
          var access_token = data.data
          var ayanamsa = 1
          var coordinates = `23.1765,75.7885`
          var datetime = date + "T00:00:00.000Z"
          var language = `en`
          var options = {
            'method': 'GET',
            'url': `https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=${ayanamsa}&coordinates=${coordinates}&datetime=${datetime}&la=${language}`,
            'headers': {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token
            },
            form: {}
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            var fullData = JSON.stringify(JSON.parse(response.body))
            var sunrise = (JSON.parse(fullData)?.data?.sunrise?.split('T')[1])?.split("+")[0] + ' - ' + (JSON.parse(fullData)?.data?.sunset?.split('T')[1])?.split("+")[0]
            var moonrise = (JSON.parse(fullData)?.data?.moonrise?.split('T')[1])?.split("+")[0] + ' - ' + (JSON.parse(fullData)?.data?.moonset?.split('T')[1])?.split("+")[0]

            let insertString_1 = `INSERT INTO panchang (sunTime, moonTime, panchangDate, description) values ('${sunrise}','${moonrise}','${datetime.split("T")[0]}','${mysql_real_escape_string(fullData)}')`;
            connection.query(insertString_1, (errInsert_1, insertResult_1) => {
              if (errInsert_1) reject({ data: errInsert_1, status: 0 });

              let data = { "sunTime": sunrise, "moonTime": moonrise, "panchangDate": userResult[0]?.panchangDate, "fullData": JSON.parse(description).data }
              resolve({ message: "Added successfully", data: data, status: 1 })
            });
          });

        });
      }
    }.bind(this))
  });

};


exports.kundaliMatch = (req) => {
  return new Promise((resolve, reject) => {
    var ayanamsa = 5
    var girl_name = req.body.girl_name
    var boy_name = req.body.boy_name
    var girl_coordinates = req.body.girl_location
    var girl_dob = new Date(req.body.girl_dob).toISOString();
    var boy_coordinates = req.body.boy_location
    var boy_dob = new Date(req.body.boy_dob).toISOString();
    var language = req.body.language

    var Query = `Select * from kundalimatch where girl_name='${girl_name}' AND boy_name='${boy_name}' AND boyPlace='${boy_coordinates}'  AND girlPlace='${girl_coordinates}'`;
    // console.log(Query)
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        let data = { girl_name, boy_name, ayanamsa, girl_coordinates, girl_dob, boy_coordinates, boy_dob, language, "fullData": JSON.parse(userResult[0].fullData).data }
        resolve({ message: "successfully", data: data, status: 1 })
      } else {

        var mydata = this.getAccessToken()
        mydata.then(function (data) {
          var access_token = data.data

          var options = {
            'method': 'GET',
            'url': `https://api.prokerala.com/v2/astrology/kundli-matching/advanced?ayanamsa=${ayanamsa}&girl_coordinates=${girl_coordinates}&girl_dob=${girl_dob}&boy_coordinates=${boy_coordinates}&boy_dob=${boy_dob}&la=${language}`,
            'headers': {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token
            },
            form: {}
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            var fullData = JSON.stringify(JSON.parse(response.body))

            let insertString_1 = `INSERT INTO kundalimatch (girl_name, boy_name, userId, ipAddress, boyName, boyPlace, girlName, girlPlace, ayanamsa, language, fullData) 
          values ('${girl_name}','${boy_name}','2','127.0.0.1','${boy_dob}','${boy_coordinates}','${girl_dob}','${girl_coordinates}','${ayanamsa}','${language}','${mysql_real_escape_string(fullData)}')`;
            connection.query(insertString_1, (errInsert_1, insertResult_1) => {
              let data = { girl_name, boy_name, ayanamsa, girl_coordinates, girl_dob, boy_coordinates, boy_dob, language, "fullData": JSON.parse(fullData).data }
              if (errInsert_1) reject({ data: errInsert_1, status: 0 });
              resolve({ message: "Course Added successfully", data, status: 1 })
            });
          });


        })
      }
    }.bind(this))
  });
};


exports.myKundali = (req) => {
  return new Promise((resolve, reject) => {

    var ayanamsa = req.body.ayanamsa
    var language = req.body.language
    var fullName = req.body.fullName
    var gender = req.body.gender
    var coordinates = req.body.MyLocation
    var chartType = req.body.chartType
    var my_dob = new Date(req.body.my_dob).toISOString();

    var Query = `Select * from mykundali where fullName='${fullName}' AND coordinates='${coordinates}'`;
    // console.log(Query)
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        let data = { fullName, ayanamsa, gender, language, coordinates, my_dob, "fullData": JSON.parse(userResult[0].fullData).data, "lagnaChart": userResult[0].lagnaChart, "navasamaChart": userResult[0].navasamaChart }
        resolve({ message: "successfully", data: data, status: 1 })
      } else {

        var mydata = this.getAccessToken()
        mydata.then(function (data) {
          var access_token = data.data
          var options = {
            'method': 'GET',
            'url': `https://api.prokerala.com/v2/astrology/kundli/advanced?ayanamsa=${ayanamsa}&coordinates=${coordinates}&datetime=${my_dob}&la=${language}`,
            'headers': {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token
            },
            form: {}
          };

          request(options, function (error, response) {
            if (error) throw new Error(error);
            var fullData = JSON.stringify(JSON.parse(response.body))


            mydata.then(function (data) {
              var access_token = data.data
              var options_1 = {
                'method': 'GET',
                'url': `https://api.prokerala.com/v2/astrology/chart?ayanamsa=${ayanamsa}&coordinates=${coordinates}&chart_type=lagna&chart_style=${chartType}&datetime=${my_dob}&la=en`,
                'headers': {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + access_token
                },
                form: {}
              };

              request(options_1, function (error, response_1) {
                if (error) throw new Error(error);
                var lagnaChart = response_1.body


                mydata.then(function (data) {
                  var access_token = data.data
                  var options_2 = {
                    'method': 'GET',
                    'url': `https://api.prokerala.com/v2/astrology/chart?ayanamsa=${ayanamsa}&coordinates=${coordinates}&chart_type=navamsa&chart_style=${chartType}&datetime=${my_dob}&la=en`,
                    'headers': {
                      'Accept': 'application/json',
                      'Authorization': 'Bearer ' + access_token
                    },
                    form: {}
                  };

                  request(options_2, function (error, response_2) {
                    if (error) throw new Error(error);
                    var navasamaChart = response_2.body


                    let insertString_1 = `INSERT INTO mykundali (fullName, gender, userId, ipAddress, coordinates, dob, ayanamsa, language, fullData, lagnaChart, navasamaChart) 
                        values ('${fullName}','${gender}','2','127.0.0.1','${coordinates}','${my_dob}','${ayanamsa}','${language}','${mysql_real_escape_string(fullData)}', '${lagnaChart}', '${navasamaChart}')`;
                    connection.query(insertString_1, (errInsert_1, insertResult_1) => {
                      let data = { ayanamsa, coordinates, my_dob, language, "fullData": JSON.parse(fullData).data, "lagnaChart": lagnaChart, "navasamaChart": navasamaChart }
                      if (errInsert_1) reject({ data: errInsert_1, status: 0 });
                      resolve({ message: "Course Added successfully", data, status: 1 })
                    });



                  });

                })



              });

            })





          });

        })

      }
    }.bind(this))
  });
};



exports.test = (req) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  });
};



function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\" + char; // prepends a backslash to backslash, percent,
      // and double/single quotes
    }
  });
}