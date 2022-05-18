const PROXY_CONFIG = [
  {
        context: [
      "/userapi",
      "/settingsapi",
      "/productapi",
    ],
        target: "http://localhost:5000",
        secure: false
  }
]

module.exports = PROXY_CONFIG;
