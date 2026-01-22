import {FlatCompat} from '@eslint/eslintrc'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals'),
    {
        // Global rules for all files
        rules: {
            'react/no-unescaped-entities': 0,
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'function-declaration',
                    unnamedComponents: 'function-expression',
                },
            ],
        },
    },
    {
        // Specific overrides for UI components
        files: ['components/ui/**/*', 'components/magicui/**/*'],
        rules: {
            // Disable only this rule for these files
            'react/function-component-definition': 0,
        },
    },
]

export default eslintConfig