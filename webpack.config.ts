import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  entry: './frontend/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist', 'frontend'),
    filename: 'ui.js'
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
          plugins: [
            'babel-plugin-styled-components'
          ]
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    client: {
      webSocketURL: {
        port: process.env.PORT
      }
    },
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    },
    static: {
      directory: path.resolve(__dirname, 'dist', 'frontend')
    },
    historyApiFallback: { index: 'index.html' }
  }
}

module.exports = config