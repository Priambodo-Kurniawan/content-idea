function transformConfig(config, feature, query) {
  let settings = config[feature].config;
  if (settings.hasOwnProperty("headers")) {
    for (let setting of settings.headers) {
      config[feature].headers[setting.key] = process.env[setting.value];
    }
  }
  if (settings.hasOwnProperty("data")) {
    if (settings.data.hasOwnProperty("update")) {
      for (let data of settings.data.update) {
        if (Object.keys(query).length)
          config[feature].data[data[0]][data[1]] = query;
      }
    }
  }

  return config;
}

module.exports = transformConfig;
