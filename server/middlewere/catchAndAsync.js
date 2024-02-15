module.exports = function catchAsyncError(fun) {
  return function (req, res, next) {
    Promise.resolve(fun(req, res, next)).catch(next);
  };
};
