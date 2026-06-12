global.fetch = function () {
  return Promise.resolve({
    ok: true,
    json: function () {
      return Promise.resolve([]);
    },
  });
};
