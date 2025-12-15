export declare const SOCKET_EVENTS: {
    readonly CONNECTION: "connection";
    readonly DISCONNECT: "disconnect";
    readonly MESSAGE_SEND: "message:send";
    readonly MESSAGE_RECEIVE: "message:receive";
    readonly TYPING_START: "typing:start";
    readonly TYPING_STOP: "typing:stop";
    readonly ROOM_JOIN: "room:join";
    readonly ROOM_LEAVE: "room:leave";
    readonly ROOM_UPDATE: "room:update";
    readonly USER_ONLINE: "user:online";
    readonly USER_OFFLINE: "user:offline";
    readonly NOTIFICATION: "notification";
};
export declare const API_ROUTES: {
    readonly AUTH: {
        readonly REGISTER: "/auth/register";
        readonly LOGIN: "/auth/login";
        readonly LOGOUT: "/auth/logout";
        readonly ME: "/auth/me";
        readonly GOOGLE: "/auth/google";
        readonly GITHUB: "/auth/github";
        readonly FORTY_TWO: "/auth/42";
    };
    readonly USERS: {
        readonly GET: (id: string) => string;
        readonly UPDATE: (id: string) => string;
        readonly ROOMS: (id: string) => string;
        readonly FRIENDS: (id: string) => string;
    };
    readonly FRIENDS: {
        readonly REQUESTS: "/friends/requests";
        readonly SEND: (userId: string) => string;
        readonly ACCEPT: (friendshipId: string) => string;
        readonly REJECT: (friendshipId: string) => string;
        readonly DELETE: (friendshipId: string) => string;
        readonly BLOCK: (friendshipId: string) => string;
        readonly UNBLOCK: (friendshipId: string) => string;
    };
    readonly ROOMS: {
        readonly CREATE: "/rooms";
        readonly GET: (id: string) => string;
        readonly UPDATE: (id: string) => string;
        readonly DELETE: (id: string) => string;
        readonly JOIN: (id: string) => string;
        readonly LEAVE: (id: string) => string;
        readonly MEMBERS: (id: string) => string;
        readonly UPDATE_ROLE: (roomId: string, userId: string) => string;
        readonly KICK: (roomId: string, userId: string) => string;
    };
    readonly AVAILABILITY: {
        readonly LIST: (roomId: string) => string;
        readonly CREATE: (roomId: string) => string;
        readonly UPDATE: (roomId: string, id: string) => string;
        readonly DELETE: (roomId: string, id: string) => string;
    };
    readonly PROPOSALS: {
        readonly LIST: (roomId: string) => string;
        readonly CREATE: (roomId: string) => string;
        readonly UPDATE: (roomId: string, id: string) => string;
        readonly DELETE: (roomId: string, id: string) => string;
        readonly SELECT: (roomId: string, id: string) => string;
    };
    readonly VOTES: {
        readonly LIST: (roomId: string, proposalId: string) => string;
        readonly VOTE: (roomId: string, proposalId: string) => string;
        readonly UPDATE: (roomId: string, proposalId: string) => string;
        readonly DELETE: (roomId: string, proposalId: string) => string;
    };
    readonly ACTIVITIES: {
        readonly LIST: (roomId: string, proposalId: string) => string;
        readonly CREATE: (roomId: string, proposalId: string) => string;
        readonly UPDATE: (roomId: string, proposalId: string, id: string) => string;
        readonly DELETE: (roomId: string, proposalId: string, id: string) => string;
    };
    readonly MESSAGES: {
        readonly LIST: (roomId: string) => string;
        readonly CREATE: (roomId: string) => string;
        readonly DELETE: (roomId: string, id: string) => string;
    };
};
