class HtmlWebpackIncludeSiblingChunksPlugin {
  toMap(map, item) {
    map[item.id] = item
    return map
  }

  apply(compiler) {
    compiler.hooks.emit.tap('HtmlWebpackIncludeSiblingChunksPlugin', compilation => {
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

      const allChunks = compilation.getStats().toJson(chunkOnlyConfig).chunks.reduce(this.toMap, Object.create(null))

      compilation.hooks.htmlWebpackPluginAlterChunks.tap('HtmlWebpackIncludeSiblingChunksPlugin', chunks => {
        const ids = [].concat(...chunks.map(chunk => [...chunk.siblings, chunk.id]))
        return ids.map(id => allChunks[id])
      })
    })
  }
}

module.exports = HtmlWebpackIncludeSiblingChunksPlugin
