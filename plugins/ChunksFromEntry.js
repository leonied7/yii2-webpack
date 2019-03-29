class ChunksFromEntryPlugin {
  apply (compiler) {
    compiler.hooks.compilation.tap('ChunksFromEntryPlugin', compilation => {

      compilation.hooks.htmlWebpackPluginAlterChunks.tap(
        'ChunksFromEntryPlugin',
        (_, { plugin }) => {
          // takes entry name passed via HTMLWebpackPlugin's options
          const entry = plugin.options.entry;
          const entrypoint = compilation.entrypoints.get(entry);

          return entrypoint.chunks.map(chunk =>
            ({
              names: chunk.name ? [chunk.name] : [],
              files: chunk.files.slice(),
              size: chunk.modulesSize(),
              hash: chunk.hash
            })
          );
        }
      );
    });
  }
}

module.exports = ChunksFromEntryPlugin