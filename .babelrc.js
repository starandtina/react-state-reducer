module.exports = api => {
  let dev = false
  let modules = true

  switch (api.env()) {
    case 'test':
      dev = true
      modules = false
      break
    case 'esm':
      modules = false
      break
    case 'cjs':
    default:
      break
  }

  return {
    presets: [
      [
        '@babel/env',
        {
          loose: true,
          shippedProposals: true,
          modules: modules ? 'commonjs' : false,
          targets: {
            browsers: ['last 2 versions', 'ie >= 11'],
          },
        },
      ],
      ['@babel/react', { development: dev }],
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      modules && 'babel-plugin-add-module-exports',
    ].filter(Boolean),
  }
}
