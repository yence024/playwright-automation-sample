
export interface User {
    username: string;
    password: string;
}

export const USERS: User[] = [
    {
        username: process.env.STANDARD_USER!,
        password: process.env.STANDARD_PASSWORD!
    },
    {
        username: process.env.LOCKED_OUT_USER!,
        password: process.env.LOCKED_OUT_PASSWORD!
    },
    {
        username: process.env.PROBLEM_USER!,
        password: process.env.PROBLEM_PASSWORD!
    },
    {
        username: process.env.PERFORMANCE_GLITCH_USER!,
        password: process.env.PERFORMANCE_GLITCH_PASSWORD!
    },
    {
        username: process.env.ERROR_USER!,
        password: process.env.ERROR_PASSWORD!
    },
    {
        username: process.env.VISUAL_USER!,
        password: process.env.VISUAL_PASSWORD!
    }
]
