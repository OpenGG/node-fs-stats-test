var fs = require('fs');

var assert = require('assert');

var randomFilename = function () {
  var filename = 'tmp/' + Math.floor(Math.random() * Math.pow(2, 53));
  return filename + '.txt';
};

var TEST_FN = process.env.TEST_FN;

for (var i = 0; i < 1000; ++i) {
  it('fs.futimes and lstatSync', function (done) {
    if (TEST_FN && TEST_FN !== 'futimes') {
      this.skip();
      return;
    }

    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    var fd = fs.openSync(filename, 'w+');

    fs.futimes(fd, now, now, function (err) {
      try {
        fs.closeSync(fd);
      } catch (e) {
        done(e);
        return;
      }

      if (err) {
        done(err);
        return;
      }

      var mtime = fs.lstatSync(filename).mtime.getTime();

      try {
        assert(mtime === time, 'time not equal:' + time + '-' + mtime);
      } catch (e) {
        done(e);
        return;
      }
      done();
    });
  });

  it('fs.futimesSync and lstatSync', function () {
    if (TEST_FN && TEST_FN !== 'futimes') {
      this.skip();
      return;
    }

    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    var fd = fs.openSync(filename, 'w+');

    fs.futimesSync(fd, now, now);
    fs.closeSync(fd);

    var mtime = fs.lstatSync(filename).mtime.getTime();

    assert(mtime === time, 'time not equal:' + time + '-' + mtime);
  });

  it('fs.utimes and lstatSync', function (done) {
    if (TEST_FN && TEST_FN !== 'utimes') {
      this.skip();
      return;
    }

    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    var fd = fs.openSync(filename, 'w+');
    fs.closeSync(fd);

    fs.utimes(filename, now, now, function (err) {
      if (err) {
        done(err);
        return;
      }

      var mtime = fs.lstatSync(filename).mtime.getTime();

      try {
        assert(mtime === time, 'time not equal:' + time + '-' + mtime);
      } catch (e) {
        done(e);
        return;
      }
      done();
    });
  });

  it('fs.utimesSync and lstatSync', function () {
    if (TEST_FN && TEST_FN !== 'utimes') {
      this.skip();
      return;
    }

    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    var fd = fs.openSync(filename, 'w+');
    fs.closeSync(fd);

    fs.utimesSync(filename, now, now);

    var mtime = fs.lstatSync(filename).mtime.getTime();

    assert(mtime === time, 'time not equal:' + time + '-' + mtime);
  });
}
