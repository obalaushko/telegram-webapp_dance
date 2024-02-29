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
