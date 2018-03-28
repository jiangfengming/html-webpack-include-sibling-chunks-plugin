class HtmlWebpackIncludeSiblingChunksPlugin {
  apply(compiler) {
    let allChunks

    compiler.hooks.compilation.tap('HtmlWebpackIncludeSiblingChunksPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginAlterChunks.tap('HtmlWebpackIncludeSiblingChunksPlugin', chunks => {
        if (!allChunks) {
          const chunkOnlyConfig = {
            assets: false,
            cached: false,
            children: false,
            chunks: true,
            chunkModules: false,
            chunkOrigins: false,
            errorDetails: false,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            timings: false,
            version: false
          }

          allChunks = compilation.getStats().toJson(chunkOnlyConfig).chunks
        }

        const ids = [].concat(...chunks.map(chunk => [chunk.id, ...chunk.siblings]))
        return allChunks.filter(chunk => ids.includes(chunk.id))
      })
    })
  }
}

module.exports = HtmlWebpackIncludeSiblingChunksPlugin
