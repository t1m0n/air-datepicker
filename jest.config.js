module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['./src/**/*.js'],
    coverageThreshold: {
        global: {
            lines: 75
        }
    },
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
    ],
};
