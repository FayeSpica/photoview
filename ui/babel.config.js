module.exports = function (api) {
  const isTest = api.env('test')
  const isProduction = api.env('NODE_ENV') == 'production'

  let presets = ['@babel/preset-react', '@babel/preset-typescript']
  let plugins = []

  if (isTest) {
    presets.push('@babel/preset-env')
    plugins.push('@babel/plugin-transform-runtime')
  } else {
    plugins.push(['styled-components', { pure: true }])
    plugins.push('graphql-tag')
    if (!isProduction) {
      plugins.push([
        'i18next-extract',
        {
          locales: ['en', 'da'],
          defaultValue: null,
        },
      ])
    }
  }

  return {
    presets: presets,
    plugins: plugins,
  }
}
