var fs = require('fs');

var assert = require('assert');

var randomFilename = function () {
  var filename = 'tmp/' + Math.floor(Math.random() * Math.pow(2, 53));
  return filename + '.txt';
};

var fd;

afterEach(function () {
  fs.closeSync(fd);
});

for (var i = 0; i < 500; ++i) {
  it('futimes and lstatSync', function (done) {
    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    fd = fs.openSync(filename, 'w+');

    fs.futimes(fd, now, now, function (err) {
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

  it('futimesSync and lstatSync', function () {
    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    fd = fs.openSync(filename, 'w+');

    fs.futimesSync(fd, now, now);

    var mtime = fs.lstatSync(filename).mtime.getTime();

    assert(mtime === time, 'time not equal:' + time + '-' + mtime);
  });

  it('utimes and lstatSync', function (done) {
    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    fd = fs.openSync(filename, 'w+');

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

  it('utimesSync and lstatSync', function () {
    var now = new Date();
    var time = now.getTime();
    var filename = randomFilename();
    fd = fs.openSync(filename, 'w+');

    fs.utimesSync(filename, now, now);

    var mtime = fs.lstatSync(filename).mtime.getTime();

    assert(mtime === time, 'time not equal:' + time + '-' + mtime);
  });
}
