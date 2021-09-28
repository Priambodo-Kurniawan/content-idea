function errHandler(err, req, res, next) {
  let errName = err.name;
  let code = 500;
  let msg = ["internal server error"];

  switch (errName) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
    case "BadRequest":
      if (err.msg) msg = [err.msg];
      else msg = err.errors.map((e) => e.message);
      code = 400;
      break;

    case "NotFound":
      msg = ["data not found"];
      code = 404;
      break;

    case "NotAuthorize":
      msg = ["please login first"];
      code = 401;
      break;

    case "Forbiden":
      msg = ["ups forbiden to do this action"];
      code = 403;
      break;

    default:
      break;
  }
  res.status(code).json({
    msg,
  });
}

module.exports = errHandler;
