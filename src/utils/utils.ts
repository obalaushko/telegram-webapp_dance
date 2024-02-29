export const sendLogs = async (log: string) => {
    try {
        fetch(`${URL}/logs`, {
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
