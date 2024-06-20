module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'no-var': 'error', // var 사용 금지
        'no-multiple-empty-lines': 'error', // 여러줄 공백 금지
        // 'no-console': ['error', {allow: ['warn', 'error', 'info']}], // console.log 금지, 배포 때 해당 규칙 활성화
        eqeqeq: 'error', // 엄격한 동등 연산자 사용 (===, !==)
        'react/jsx-pascal-case': 'error', // 컴포넌트 이름 pascal-Case 사용
        'react/jsx-key': 'error', // 반복문 내에서 key 사용
        'dot-notation': 'error', // 객체 접근 시 대괄호 표기법 금지, 점 표기법 사용
        'linebreak-style': 0, // 줄바꿈 스타일에 대한 규칙 비활성화 (운영체제간 줄바꿈 방식이 다름에 따른 문제 방지)
        'no-unused-vars': 'off', // 사용되지 않는 변수 사용 금지
        'no-useless-catch': 'off', // try, catch 비활성화
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto' // Prettier의 규칙을 ESlint에 통합, 줄바꿈 방식에 대해 자동으로 설정
            }
        ]
    }
};
