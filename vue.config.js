module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5050',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
