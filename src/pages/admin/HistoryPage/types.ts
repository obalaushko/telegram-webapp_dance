interface User {
    userId: string;
    fullName: string;
}

interface HistoryItem {
    action: string;
    oldValue: string;
    newValue: string;
    timestamp: string;
}

interface UserInfo {
    user: User;
    historyItems: HistoryItem[];
}

interface HistoryData {
    date: string;
    usersInfo: UserInfo[];
}

export interface HistoryResponse {
    page: number;
    pageSize: number;
    totalPage: number;
    list: HistoryData[];
}
