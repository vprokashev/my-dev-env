function moduleIsAvailable (path) {
  try {
    require.resolve(path);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  moduleIsAvailable
};
