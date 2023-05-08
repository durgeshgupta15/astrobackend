const user_functions = require('../functions/user_function/userFunctions');

exports.loginWithMobile = (req, res, next) => {
  user_functions
    .loginWithMobile(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};

exports.sendOtp = (req, res, next) => {
  user_functions
    .sendOtp(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};
exports.verifyOtp = (req, res, next) => {
  user_functions
    .verifyOtp(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};
exports.userLogin = (req, res, next) => {
  user_functions
    .userLogin(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.register = (req, res, next) => {
  user_functions
    .register(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};

exports.getUserProfile = (req, res, next) => {
  user_functions
    .getUserProfile(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};

exports.editUserProfile = (req, res, next) => {
  user_functions
    .editUserProfile(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};

exports.changePassword = (req, res, next) => {
  user_functions
    .changePassword(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};

exports.getUserCourse = (req, res, next) => {
  user_functions
    .getUserCourse(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getUserCourseDetail = (req, res, next) => {
  user_functions
    .getUserCourseDetail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getUserPaymentHistory = (req, res, next) => {
  user_functions
    .getUserPaymentHistory(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.addCoursePayemnt = (req, res, next) => {
  user_functions
    .addCoursePayemnt(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.status(s.status).json(s);
    });
};

exports.getTodayPanchang = (req, res, next) => {
  user_functions
    .getTodayPanchang(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getAllHoroscope = (req, res, next) => {
  user_functions
    .getAllHoroscope(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getAccessToken = (req, res, next) => {
  user_functions
    .getAccessToken(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.myKundali = (req, res, next) => {
  user_functions
    .myKundali(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.kundaliMatch = (req, res, next) => {
  user_functions
    .kundaliMatch(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.test = (req, res, next) => {
  user_functions
    .test(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};