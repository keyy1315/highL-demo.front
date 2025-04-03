export interface Member {
    id: string;
    gameName: string;
    tagLine: string;
    tier: string;
    iconUrl: string;
    isActive: boolean;
    role: string;
}

export interface LoginRequest {
    userId: string;
    password: string;
}
