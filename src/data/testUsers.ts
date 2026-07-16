export interface User {
    username: string;
    password: string;
}

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export const USERS: User[] = [
    {
        username: requireEnv('STANDARD_USER'),
        password: requireEnv('STANDARD_PASSWORD')
    },
    {
        username: requireEnv('LOCKED_OUT_USER'),
        password: requireEnv('LOCKED_OUT_PASSWORD')
    },
    {
        username: requireEnv('PROBLEM_USER'),
        password: requireEnv('PROBLEM_PASSWORD')
    },
    {
        username: requireEnv('PERFORMANCE_GLITCH_USER'),
        password: requireEnv('PERFORMANCE_GLITCH_PASSWORD')
    },
    {
        username: requireEnv('ERROR_USER'),
        password: requireEnv('ERROR_PASSWORD')
    },
    {
        username: requireEnv('VISUAL_USER'),
        password: requireEnv('VISUAL_PASSWORD')
    }
];
