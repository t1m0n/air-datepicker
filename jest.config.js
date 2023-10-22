module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    moduleDirectories: [
        'src',
        'node_modules'
    ],
    moduleNameMapper: {
        '\\.(scss)$': '<rootDir>/__mocks__/scssMock.js'
    },
    setupFilesAfterEnv: [
        '<rootDir>/tests/setupTests.js'
    ]
};
