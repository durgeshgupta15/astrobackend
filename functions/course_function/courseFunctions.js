var connection = require('../../db/connection');
const crypto = require('crypto');
const { encryptData, decryptData } = require('../../helper/encrypt.helper');
const { sendMailFunction } = require('../../helper/email');


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



exports.login = (req) => {
  return new Promise((resolve, reject) => {
    let { email, password } = req.body;
    let userSelectQuery = `select intId, name,email, password,token from userslist where email='${email}' and userType = 'Admin'`;
    connection.query(userSelectQuery, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        let loggedUser = userResult[0];
        let userPassword = loggedUser.password;
        let decryptedPassword = decryptData(userPassword)
        if (decryptedPassword == password) {
          resolve({ data: { intId: loggedUser.intId, token: loggedUser.token, name: loggedUser.name, email: loggedUser.email }, status: 1 })
        } else {
          resolve({ message: 'Please check username and password', data: [], status: 0 })
        }
      } else {
        resolve({ message: 'Please check username and password', data: [], status: 0 })
      }
    })
  })
};

exports.getAllUsers = (req) => {
  return new Promise((resolve, reject) => {
    var Query = `select intId, name,email, phone,image,createdDate,status from userslist where userType = 'User'`;
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      }
    })
  });
};

exports.addNewCourse = (req, filePath, filePath1) => {
  return new Promise((resolve, reject) => {
    let { categoryName, courseName, courseFees, courseTime, courseType, courseDescription, courseIFrames, language, courseFullDescription } = req.body;
    let insertString = `INSERT INTO courses (categoryName, courseName, courseFees, courseTime, courseType, courseDescription, courseIFrames, language, fullDescription, courseImage, courseImage1) 
    values ('${categoryName}','${courseName}','${courseFees}','${courseTime}','${courseType}','${mysql_real_escape_string(courseDescription)}','${courseIFrames}','${language}','${mysql_real_escape_string(courseFullDescription)}', '${filePath}', '${filePath1}')`;
    // console.log(insertString)
    connection.query(insertString, (errInsert, insertResult) => {
      let data = {}
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Course Added successfully", data, status: 1 })
    });

  })
}

exports.getAllCourses = (req) => {
  var Query = ``
  if (req.body.type != '' && req.body.type != undefined && req.body.type != null && req.body.type == 'all') {
    Query = `SELECT intId, categoryName, courseDescription,courseFees,courseName,courseType,courseTime,createdDate,fullDescription, courseImage,courseImage1,language ,courseIFrames, LENGTH(courseIFrames) - LENGTH(REPLACE(courseIFrames, ',', '')) + 1 as totalLesson  FROM courses ORDER BY intId DESC`;
  } else {
    Query = `SELECT intId, categoryName, courseDescription,courseFees,courseName,courseType,courseTime,createdDate,fullDescription, courseImage,courseImage1,language ,SUBSTRING_INDEX(courseIFrames, ',', 1) as courseIFrames, LENGTH(courseIFrames) - LENGTH(REPLACE(courseIFrames, ',', '')) + 1 as totalLesson  FROM courses ORDER BY intId DESC`;
  }
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


exports.getCoursesDetail = (req) => {
  var Query = `SELECT intId, categoryName, courseDescription,courseFees,courseName,courseType,courseTime,createdDate,fullDescription,language, courseImage,courseImage1 ,SUBSTRING_INDEX(courseIFrames, ',', 1) as courseIFrames, LENGTH(courseIFrames) - LENGTH(REPLACE(courseIFrames, ',', '')) + 1 as totalLesson  FROM courses WHERE intId=${req.body.id} ORDER BY intId DESC`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      console.log(userResult, errSelect)
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      }
    })
  });
};


exports.editCourse = (req) => {
  return new Promise((resolve, reject) => {
    let { categoryName, courseId, courseName, courseFees, courseTime, courseType, courseDescription, courseIFrames, language, courseFullDescription } = req.body;
    if (courseId != '', courseName != '' && courseFees != '' && courseTime != '' && courseType != '' && courseDescription != '' && courseIFrames != '') {
      let sqlQuery = `select * from courses where intId='${courseId}'`;
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          reject({ data: err, status: 0 })
        }
        if (result.length > 0) {
          let insertString = `UPDATE courses SET categoryName='${categoryName}',courseName='${courseName}', courseFees='${courseFees}', courseTime='${courseTime}', courseType='${courseType}', courseDescription='${mysql_real_escape_string(courseDescription)}', courseIFrames= '${courseIFrames}', language='${language}', courseDescription='${mysql_real_escape_string(courseFullDescription)}' WHERE intId = ${courseId}`;
          console.log(insertString)
          connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ data: errInsert, status: 0 });
            resolve({ message: "Course Updated successfully", data, status: 1 })
          });
        }
        else {
          resolve({ message: 'No Course exists', status: 0 })
        }
      })
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};


exports.editCoursess = (req, filePath) => {
  return new Promise((resolve, reject) => {
    let { categoryName, courseId, courseName, courseFees, courseTime, courseType, courseDescription, courseIFrames, language, courseFullDescription } = req.body;
    if (courseId != '', courseName != '' && courseFees != '' && courseTime != '' && courseType != '' && courseDescription != '' && courseIFrames != '') {
      let sqlQuery = `select * from courses where intId='${courseId}'`;
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          reject({ data: err, status: 0 })
        }
        if (result.length > 0) {
          let insertString = `UPDATE courses SET categoryName='${categoryName}',courseName='${courseName}', courseFees='${courseFees}', courseTime='${courseTime}', courseType='${courseType}', courseDescription='${mysql_real_escape_string(courseDescription)}', courseIFrames= '${courseIFrames}', language='${language}',courseImage='${filePath}', courseDescription='${mysql_real_escape_string(courseFullDescription)}' WHERE intId = ${courseId}`;
          console.log(insertString)
          connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ data: errInsert, status: 0 });
            resolve({ message: "Course Updated successfully", data, status: 1 })
          });
        }
        else {
          resolve({ message: 'No Course exists', status: 0 })
        }
      })
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};

exports.editCoursesss = (req, filePath) => {
  return new Promise((resolve, reject) => {
    let { categoryName, courseId, courseName, courseFees, courseTime, courseType, courseDescription, courseIFrames, language, courseFullDescription } = req.body;
    if (courseId != '', courseName != '' && courseFees != '' && courseTime != '' && courseType != '' && courseDescription != '' && courseIFrames != '') {
      let sqlQuery = `select * from courses where intId='${courseId}'`;
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          reject({ data: err, status: 0 })
        }
        if (result.length > 0) {
          let insertString = `UPDATE courses SET categoryName='${categoryName}',courseName='${courseName}', courseFees='${courseFees}', courseTime='${courseTime}', courseType='${courseType}', courseDescription='${mysql_real_escape_string(courseDescription)}', courseIFrames= '${courseIFrames}', language='${language}',courseImage1='${filePath}', courseDescription='${mysql_real_escape_string(courseFullDescription)}' WHERE intId = ${courseId}`;
          console.log(insertString)
          connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ data: errInsert, status: 0 });
            resolve({ message: "Course Updated successfully", data, status: 1 })
          });
        }
        else {
          resolve({ message: 'No Course exists', status: 0 })
        }
      })
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};



exports.updateCourse = (req, filePath, filePath1) => {
  return new Promise((resolve, reject) => {
    let { categoryName, courseId, courseName, courseFees, courseTime, courseType, courseDescription, courseIFrames, language, courseFullDescription } = req.body;
    if (courseId != '', courseName != '' && courseFees != '' && courseTime != '' && courseType != '' && courseDescription != '' && courseIFrames != '') {
      let sqlQuery = `select * from courses where intId='${courseId}'`;
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          reject({ data: err, status: 0 })
        }
        if (result.length > 0) {
          let insertString = `UPDATE courses SET categoryName='${categoryName}',courseName='${courseName}', courseFees='${courseFees}', courseTime='${courseTime}', courseType='${courseType}', courseDescription='${mysql_real_escape_string(courseDescription)}', courseIFrames= '${courseIFrames}', language='${language}',courseImage='${filePath}',courseImage1='${filePath1}', courseDescription='${mysql_real_escape_string(courseFullDescription)}' WHERE intId = ${courseId}`;
          connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ data: errInsert, status: 0 });
            resolve({ message: "Course Updated successfully", data, status: 1 })
          });
        }
        else {
          resolve({ message: 'No Course exists', status: 0 })
        }
      })
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};

exports.deleteCourse = (req) => {
  return new Promise((resolve, reject) => {
    let { courseId } = req.body;
    if (courseId != '') {
      let sqlQuery = `select * from courses where intId='${courseId}'`;
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          reject({ data: err, status: 0 })
        }
        if (result.length > 0) {
          let insertString = `DELETE FROM courses WHERE intId = ${courseId}`;
          connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ data: errInsert, status: 0 });
            resolve({ message: "Course Deleted successfully", data, status: 1 })
          });
        }
        else {
          resolve({ message: 'No Course exists', status: 0 })
        }
      })
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};

exports.getAllPaymentHistory = (req) => {
  var Query = '';
  if (req.body.id != undefined && req.body.id > 0) {
    Query = `SELECT a.name,a.email,a.phone,b.courseName,b.courseFees,b.courseTime,b.courseType,c.PayPalPaymentId,b.categoryName, c.paymentStatus, c.createdDate FROM userslist a, courses b, userpayments c WHERE a.intId=c.userId AND b.intId=c.courseId AND c.userId=${req.body.id}`;
  } else {
    Query = `SELECT a.name,a.email,a.phone,b.courseName,b.courseFees,b.courseTime,b.courseType,c.PayPalPaymentId,b.categoryName, c.paymentStatus, c.createdDate FROM userslist a, courses b, userpayments c WHERE a.intId=c.userId AND b.intId=c.courseId`;
  }
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      }
    })
  });
};

exports.getAllPurchasedCourse = (req) => {
  var Query = '';
  if (req.body.id != undefined && req.body.id > 0) {
    Query = `SELECT a.name,a.email,a.phone,b.courseName,b.courseFees,b.courseTime,b.courseType,c.createdDate,b.categoryName FROM userslist a, courses b, usercourses c WHERE a.intId=c.userId AND b.intId=c.courseId AND a.intId=${req.body.id}`;
  } else {
    Query = `SELECT a.name,a.email,a.phone,b.courseName,b.courseFees,b.courseTime,b.courseType,c.createdDate,b.categoryName FROM userslist a, courses b, usercourses c WHERE a.intId=c.userId AND b.intId=c.courseId`;
  }
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

exports.getAllCategory = (req) => {
  var Query = `SELECT * FROM category`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      }
    })
  });
};

exports.blockUnblockUser = (req) => {
  return new Promise((resolve, reject) => {
    let { userId } = req.body;
    if (userId != '') {
      var insertString = ''
      if (req.body.status == 'N') {
        insertString = `UPDATE userslist SET status = 'N' WHERE intId = ${userId}`;
      } else {
        insertString = `UPDATE userslist SET status = 'Y' WHERE intId = ${userId}`;
      }
      connection.query(insertString, (errInsert, insertResult) => {
        let data = {}
        if (errInsert) reject({ data: errInsert, status: 0 });
        resolve({ message: "Category Deleted successfully", data, status: 1 })
      });
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};

exports.deleteCategory = (req) => {
  return new Promise((resolve, reject) => {
    let { categoryId } = req.body;
    if (categoryId != '') {
      let sqlQuery = `select * from category where intId='${categoryId}'`;
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          reject({ data: err, status: 0 })
        }
        if (result.length > 0) {
          let insertString = `DELETE FROM category WHERE intId = ${categoryId}`;
          connection.query(insertString, (errInsert, insertResult) => {
            let data = {}
            if (errInsert) reject({ data: errInsert, status: 0 });
            resolve({ message: "Category Deleted successfully", data, status: 1 })
          });
        }
        else {
          resolve({ message: 'No Category exists', status: 0 })
        }
      })
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};


exports.addCategory = (req) => {
  return new Promise((resolve, reject) => {
    let { categoryName } = req.body;
    let insertString = `INSERT INTO category (categoryName) values ('${categoryName}')`;
    connection.query(insertString, (errInsert, insertResult) => {
      let data = {}
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Category Added successfully", data, status: 1 })
    });

  })
}




exports.getSliderDetail = (req) => {
  var Query = `SELECT * From slider where slug = '${req.body.slug}'`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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


exports.getSliders = (req) => {
  var Query = `SELECT * From slider`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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


exports.deleteSliders = (req) => {
  return new Promise((resolve, reject) => {
    let { sliderId } = req.body;
    if (sliderId != '') {
      let insertString = `DELETE FROM slider WHERE intId = ${sliderId}`;
      connection.query(insertString, (errInsert, insertResult) => {
        let data = {}
        if (errInsert) reject({ data: errInsert, status: 0 });
        resolve({ message: "Slider Deleted successfully", data, status: 1 })
      });
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};


exports.addSliders = (filePath, data) => {
  return new Promise((resolve, reject) => {
    let insertString = `INSERT INTO slider (image,title,slug,author,fulldiscription) values ('${filePath}','${data.title}','${data.title.replace(/ /g, '-')}','${data.author}','${mysql_real_escape_string(data.fullDescription)}')`;
    connection.query(insertString, (errInsert, insertResult) => {
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Category Added successfully", data: [], status: 1 })
    })
  })
}



exports.checkCoursePurchasedOrNot = (req) => {
  var Query = `SELECT intId From usercourses WHERE userId='${req.body.userId}' AND courseId='${req.body.courseId}' `;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      } else {
        resolve({ data: [], status: 0, message: "Success" });
      }
    })
  });
};



exports.insertPayment = (req) => {
  return new Promise((resolve, reject) => {

    let userSelectQuery = `select name,email from userslist where intId='${req.body.userId}'`;
    connection.query(userSelectQuery, function (errSelect, userResult) {
      if (errSelect) reject({ data: errSelect, status: 0 });
      if (userResult.length > 0) {
        let loggedUser = userResult[0];

        let insertString = `INSERT INTO userpayments (userId,courseId,PayPalPaymentId,paymentStatus,paymentAllData) 
        values ('${req.body.userId}','${req.body.courseId}','${req.body.PayPalPaymentId}','${req.body.paymentStatus}','${req.body.paymentAllData}')`;
        connection.query(insertString, (errInsert, insertResult) => {
          if (errInsert) reject({ message: errInsert, status: 0 });

          let insertString_1 = `INSERT INTO usercourses (userId, courseId, PayPalPaymentId, expireDate) 
          values ('${req.body.userId}','${req.body.courseId}','${req.body.PayPalPaymentId}','')`;
          connection.query(insertString_1, (errInsert_1, insertResult_1) => {
            let data = {}
            if (errInsert_1) reject({ data: errInsert_1, status: 0 });

            sendMailFunction('PurchasedCourse', loggedUser.name, loggedUser.email)

            resolve({ message: "Payment Added successfully", data: [], status: 1 })
          });

        })
      }

    });
  })
}





exports.getAllPanchang = (req) => {
  var Query = `SELECT * From panchang order by panchangDate`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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


exports.deletePanchang = (req) => {
  return new Promise((resolve, reject) => {
    let { panchangId } = req.body;
    if (panchangId != '') {
      let insertString = `DELETE FROM panchang WHERE intId = ${panchangId}`;
      connection.query(insertString, (errInsert, insertResult) => {
        let data = {}
        if (errInsert) reject({ data: errInsert, status: 0 });
        resolve({ message: "Panchang Deleted successfully", data, status: 1 })
      });
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};


exports.addNewPanchang = (req) => {
  return new Promise((resolve, reject) => {
    let insertString = `INSERT INTO panchang (sunTime, moonTime, panchangDate, description) 
    values ('${req.body.sunTime}','${req.body.moonTime}','${req.body.panchangDate}','${req.body.description}')`;
    connection.query(insertString, (errInsert, insertResult) => {
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Category Added successfully", data: [], status: 1 })
    })
  })
}

exports.editPanchang = (req) => {
  return new Promise((resolve, reject) => {
    let insertString = `UPDATE panchang SET sunTime='${req.body.sunTime}', moonTime='${req.body.moonTime}', panchangDate='${req.body.panchangDate}', description='${req.body.description}' WHERE intId = ${req.body.panchangId}`;
    connection.query(insertString, (errInsert, insertResult) => {
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Category Added successfully", data: [], status: 1 })
    })
  })
}




exports.getAllRashi = (req) => {
  var Query = `SELECT * FROM rashi`;
  return new Promise((resolve, reject) => {
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      }
    })
  });
};



exports.addReviews = (filePath, data) => {
  return new Promise((resolve, reject) => {
    let insertString = `INSERT INTO reviews (name, place, image, review) values ('${data.name}','${data.place}','${filePath}','${mysql_real_escape_string(data.review)}')`;
    connection.query(insertString, (errInsert, insertResult) => {
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Review Added successfully", data: [], status: 1 })
    })
  })
}


exports.getAllReviews = (req) => {
  var Query = `SELECT * From reviews`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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


exports.deleteReview = (req) => {
  return new Promise((resolve, reject) => {
    let { sliderId } = req.body;
    if (sliderId != '') {
      let insertString = `DELETE FROM reviews WHERE intId = ${sliderId}`;
      connection.query(insertString, (errInsert, insertResult) => {
        let data = {}
        if (errInsert) reject({ data: errInsert, status: 0 });
        resolve({ message: "Slider Deleted successfully", data, status: 1 })
      });
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};



exports.getAllBirthDetail = (req) => {
  var Query = `SELECT * From userdownloadpdf`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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

exports.getAllMacthDetail = (req) => {
  var Query = `SELECT * From usermatchdownloadpdf`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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
exports.getAllBirthMobileDetail = (req) => {
  var Query = `SELECT * From downloadpdf`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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

exports.getAllMacthMobileDetail = (req) => {
  var Query = `SELECT * From downloadmatchpdf`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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



exports.getBlog = (req) => {
  var Query = `SELECT * From blogs ORDER BY intId Desc`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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

exports.getBlogBySlug = (req) => {
  var Query = `SELECT * From blogs WHERE slug = '${req.body.slug}'`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
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

exports.addBlog = (req, filePath) => {
  return new Promise((resolve, reject) => {
    var slug = req.body.title.replace(/ /g, '-');
    let insertString = `INSERT INTO blogs (title,slug, addedBy, longDiscription, blogImage) values ('${req.body.title}','${slug}','${req.body.addedBy}','${mysql_real_escape_string(req.body.description)}','${filePath}')`;
    connection.query(insertString, (errInsert, insertResult) => {
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Blog Added successfully", data: [], status: 1 })
    })
  })
}

exports.editBlog = (req, filePath) => {
  return new Promise((resolve, reject) => {
    var slug = req.body.title.replace(/ /g, '-');
    console.log(filePath)
    var insertString = ''
    if (filePath != '' && filePath != undefined && filePath != null && filePath != 'uploads/undefined') {
      insertString = `UPDATE blogs set title='${req.body.title}', blogImage='${filePath}', addedBy='${req.body.addedBy}', slug='${slug}', longDiscription='${mysql_real_escape_string(req.body.description)}' WHERE intId = ${req.body.blogId}`;
    } else {
      insertString = `UPDATE blogs set title='${req.body.title}', addedBy='${req.body.addedBy}', slug='${slug}', longDiscription='${mysql_real_escape_string(req.body.description)}' WHERE intId = ${req.body.blogId}`;
    }
    connection.query(insertString, (errInsert, insertResult) => {
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Blog Added successfully", data: [], status: 1 })
    })
  })
}

exports.deleteBlog = (req) => {
  return new Promise((resolve, reject) => {
    let { blogId } = req.body;
    if (blogId != '') {
      let insertString = `DELETE FROM blogs WHERE intId = ${blogId}`;
      connection.query(insertString, (errInsert, insertResult) => {
        let data = {}
        if (errInsert) reject({ data: errInsert, status: 0 });
        resolve({ message: "Blog Deleted successfully", data, status: 1 })
      });
    } else {
      resolve({ message: 'Error', status: 0 })
    }
  });
};


exports.getSubscribe = (req) => {
  var Query = `SELECT * From subscribes GROUP BY email ORDER BY intId Desc`;
  return new Promise((resolve, reject) => {
    // console.log(Query)
    connection.query(Query, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });
      if (userResult?.length > 0) {
        resolve({ data: userResult, status: 1, message: "Success" });
      } else {
        resolve({ data: [], status: 1, message: "Success" });
      }
    })
  });
};

exports.addSubscribe = (req) => {
  return new Promise((resolve, reject) => {
    let insertString = `INSERT INTO subscribes (email) values ('${req.body.email}')`;
    connection.query(insertString, (errInsert, insertResult) => {
      if (errInsert) reject({ message: errInsert, status: 0 });
      resolve({ message: "Subscriber Added successfully", data: [], status: 1 })
    })
  })
}

exports.sendMail = (req) => {
  return new Promise((resolve, reject) => {
    var Query_1 = `SELECT * From blogs ORDER BY intId Desc LIMIT 0,1`;
    connection.query(Query_1, function (errSelect, userResult) {
      if (errSelect) reject({ message: errSelect, status: 0 });

      var Query = `SELECT * From subscribes GROUP BY email ORDER BY intId Desc`;
      connection.query(Query, (errInsert, insertResult) => {
        if (errInsert) reject({ message: errInsert, status: 0 });
        for (let index = 0; index < insertResult.length; index++) {
          const element = insertResult[index]['email'];
          sendMailFunction('NewPost', userResult[0]['title'] + '|' + userResult[0]['slug'], element)
        }
        resolve({ message: "Mail Sent successfully", data: [], status: 1 })
      })

    })
  })
}