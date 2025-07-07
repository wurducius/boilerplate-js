const path = require("path")
const BundleAnalyzerPluginImport = require("webpack-bundle-analyzer")
const Dotenv = require("dotenv-webpack")

const BundleAnalyzerPlugin = BundleAnalyzerPluginImport.BundleAnalyzerPlugin

const CWD = process.cwd()

const buildOptionsDefault = {
  mode: "development",
  analyze: false,
  sourceMap: true,
  projectPath: "./src",
  entryFilename: "index.ts",
  outputBundleFilename: "main.js",
  distDirname: "dist",
}

module.exports.default = (args) => {
  const buildOptions = { ...buildOptionsDefault, ...(args ?? {}) }

  return {
    mode: buildOptions.mode,
    entry: `${buildOptions.projectPath}/${buildOptions.entryFilename}`,
    output: {
      filename: "assets/js/[name].js",
      path: path.join(CWD, buildOptions.distDirname),
      publicPath: undefined,
    },
    plugins: [buildOptions.analyze && new BundleAnalyzerPlugin(), new Dotenv()].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.([cm]?ts|tsx)$/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devtool: buildOptions.sourceMap ? "source-map" : false,
    infrastructureLogging: {
      appendOnly: true,
      level: "error",
    },
    stats: "none",
  }
}
