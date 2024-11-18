import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'style/semi': ['error', 'always'],
    'object-curly-newline': ['error', { multiline: true }],
    'antfu/top-level-function': 'off',
  },
});
