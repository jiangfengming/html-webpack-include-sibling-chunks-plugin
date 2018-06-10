// Use in .reduce, to convert array to map, with keys = item.id
const toMap = (map, item) => {
  map[item.id] = item
  return map
}

// Use in .filter, to remove duplicating items from array
const onlyUnique = (item, i, array) =>
  array.indexOf(item) === i

//
class HtmlWebpackIncludeSiblingChunksPlugin {
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

      const allChunks = compilation.getStats().toJson(chunkOnlyConfig).chunks.reduce(toMap, Object.create(null))

      compilation.hooks.htmlWebpackPluginAlterChunks.tap('HtmlWebpackIncludeSiblingChunksPlugin', chunks => {
        const ids = [].concat(...chunks.map(chunk => {
          const siblings = chunk.siblings.filter(id => !chunks.find(c => c.id === id))
          return [...siblings, chunk.id]
        })).filter(onlyUnique)
        return ids.map(id => allChunks[id])
      })
    })
  }
}

module.exports = HtmlWebpackIncludeSiblingChunksPlugin
