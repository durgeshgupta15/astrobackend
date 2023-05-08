const course_functions = require('../functions/course_function/courseFunctions');

exports.login = (req, res, next) => {
  course_functions
    .login(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getAllUsers = (req, res, next) => {
  course_functions
    .getAllUsers(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.addNewCourse = (req, res, next) => {
  course_functions
    .addNewCourse(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getAllCourses = (req, res, next) => {
  course_functions
    .getAllCourses(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getCoursesDetail = (req, res, next) => {
  course_functions
    .getCoursesDetail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.editCourse = (req, res, next) => {
  course_functions
    .editCourse(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.deleteCourse = (req, res, next) => {
  course_functions
    .deleteCourse(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getAllPaymentHistory = (req, res, next) => {
  course_functions
    .getAllPaymentHistory(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getAllPurchasedCourse = (req, res, next) => {
  course_functions
    .getAllPurchasedCourse(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};


exports.getAllCategory = (req, res, next) => {
  course_functions
    .getAllCategory(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.addCategory = (req, res, next) => {
  course_functions
    .addCategory(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.deleteCategory = (req, res, next) => {
  course_functions
    .deleteCategory(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.blockUnblockUser = (req, res, next) => {
  course_functions
    .blockUnblockUser(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getSliders = (req, res, next) => {
  course_functions
    .getSliders(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getSliderDetail = (req, res, next) => {
  course_functions
    .getSliderDetail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.deleteSliders = (req, res, next) => {
  course_functions
    .deleteSliders(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.addSliders = (req, res, next) => {
  course_functions
    .addSliders(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.checkCoursePurchasedOrNot = (req, res, next) => {
  course_functions
    .checkCoursePurchasedOrNot(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.insertPayment = (req, res, next) => {
  course_functions
    .insertPayment(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};


exports.getAllPanchang = (req, res, next) => {
  course_functions
    .getAllPanchang(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.deletePanchang = (req, res, next) => {
  course_functions
    .deletePanchang(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.addNewPanchang = (req, res, next) => {
  course_functions
    .addNewPanchang(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.editPanchang = (req, res, next) => {
  course_functions
    .editPanchang(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};



exports.getAllRashi = (req, res, next) => {
  course_functions
    .getAllRashi(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getAllReviews = (req, res, next) => {
  course_functions
    .getAllReviews(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.deleteReview = (req, res, next) => {
  course_functions
    .deleteReview(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.addReviews = (req, res, next) => {
  course_functions
    .addReviews(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getAllBirthDetail = (req, res, next) => {
  course_functions
    .getAllBirthDetail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getAllMacthDetail = (req, res, next) => {
  course_functions
    .getAllMacthDetail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getAllBirthMobileDetail = (req, res, next) => {
  course_functions
    .getAllBirthMobileDetail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getAllMacthMobileDetail = (req, res, next) => {
  course_functions
    .getAllMacthMobileDetail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};

exports.getBlog = (req, res, next) => {
  course_functions
    .getBlog(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.addBlog = (req, res, next) => {
  course_functions
    .addBlog(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.editBlog = (req, res, next) => {
  course_functions
    .editBlog(req, '')
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.deleteBlog = (req, res, next) => {
  course_functions
    .deleteBlog(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getSubscribe = (req, res, next) => {
  course_functions
    .getSubscribe(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.addSubscribe = (req, res, next) => {
  course_functions
    .addSubscribe(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.getBlogBySlug = (req, res, next) => {
  course_functions
    .getBlogBySlug(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};
exports.sendMail = (req, res, next) => {
  course_functions
    .sendMail(req)
    .then((s) => {
      res.json(s);
    })
    .catch((s) => {
      res.json(s);
    });
};