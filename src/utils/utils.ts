import { User } from '../components/ListUsers.tsx';

export const sendLogs = async (url: string, log: string) => {
    try {
        await fetch(`${url}/logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ log }),
        });
    } catch (error) {
        console.error(error);
    }
};

/**
 * Parses the input string and returns a User object.
 * @param inputString The string to be parsed.
 * @returns The parsed User object.
 */
export const parseUserData = (inputString: string): User => {
    const regex = /([^,:]+):([^,]+)/g;
    const matches = inputString.matchAll(regex);

    const userData: Partial<User> = {};

    for (const match of matches) {
        const key = match[1].trim();
        const value = match[2].trim();

        switch (key) {
            case 'userId':
                userData.userId = parseInt(value, 10);
                break;
            case 'fullName':
                userData.fullName = value;
                break;
            case 'username':
                userData.username = value;
                break;
            default:
                // Handle unknown keys or ignore them
                break;
        }
    }

    return userData as User;
};
