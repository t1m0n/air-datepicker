let tabSize = 4;

module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'parser': 'babel-eslint',
    'extends': [
        'eslint:recommended',
    ],
    'ignorePatterns': ['docs', '*.ts'],
    'globals': {
        'module': 'readonly',
    },
    'parserOptions': {
        'ecmaFeatures': {
            'legacyDecorators': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        indent: ['error', tabSize,  {ignoredNodes: ['TemplateLiteral'], SwitchCase: 1}], // игнорируем string template из-за ошибки в пакетах
        quotes: ['error', 'single'],
        semi: ['warn', 'always'],
        curly: ['error', 'multi-line'],
        'arrow-parens': ['error', 'as-needed', {requireForBlockBody: true}],
        'no-unused-vars': [
            'warn',
            {
                ignoreRestSiblings: true,
                argsIgnorePattern: '^e$',
                varsIgnorePattern: '^_$',
            },
        ],
        'max-len': ['error', {code: 120, ignoreStrings: true, ignoreComments: true}],
        'object-curly-spacing': ['error', 'never'],
        'array-bracket-spacing': ['error', 'never'],
        'comma-style': ['error', 'last'],
        'comma-spacing': ['error', {'before': false, 'after': true}],
        'space-infix-ops': 'error',
        'space-in-parens': ['error', 'never'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'keyword-spacing': 'error',
        'arrow-spacing': 'error',
        'space-before-blocks': 'error',
        'no-magic-numbers': ['warn', {
            ignore: [0, 1, -1],
            ignoreArrayIndexes: true,
            ignoreDefaultValues: true,
        }],
    },
};
