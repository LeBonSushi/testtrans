"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ROUTES = exports.SOCKET_EVENTS = void 0;
exports.SOCKET_EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    MESSAGE_SEND: 'message:send',
    MESSAGE_RECEIVE: 'message:receive',
    TYPING_START: 'typing:start',
    TYPING_STOP: 'typing:stop',
    ROOM_JOIN: 'room:join',
    ROOM_LEAVE: 'room:leave',
    ROOM_UPDATE: 'room:update',
    USER_ONLINE: 'user:online',
    USER_OFFLINE: 'user:offline',
    NOTIFICATION: 'notification',
};
exports.API_ROUTES = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        GOOGLE: '/auth/google',
        GITHUB: '/auth/github',
        FORTY_TWO: '/auth/42',
    },
    USERS: {
        GET: (id) => `/users/${id}`,
        UPDATE: (id) => `/users/${id}`,
        ROOMS: (id) => `/users/${id}/rooms`,
        FRIENDS: (id) => `/users/${id}/friends`,
    },
    FRIENDS: {
        REQUESTS: '/friends/requests',
        SEND: (userId) => `/friends/request/${userId}`,
        ACCEPT: (friendshipId) => `/friends/accept/${friendshipId}`,
        REJECT: (friendshipId) => `/friends/reject/${friendshipId}`,
        DELETE: (friendshipId) => `/friends/${friendshipId}`,
        BLOCK: (friendshipId) => `/friends/block/${friendshipId}`,
        UNBLOCK: (friendshipId) => `/friends/unblock/${friendshipId}`,
    },
    ROOMS: {
        CREATE: '/rooms',
        GET: (id) => `/rooms/${id}`,
        UPDATE: (id) => `/rooms/${id}`,
        DELETE: (id) => `/rooms/${id}`,
        JOIN: (id) => `/rooms/${id}/join`,
        LEAVE: (id) => `/rooms/${id}/leave`,
        MEMBERS: (id) => `/rooms/${id}/members`,
        UPDATE_ROLE: (roomId, userId) => `/rooms/${roomId}/members/${userId}/role`,
        KICK: (roomId, userId) => `/rooms/${roomId}/members/${userId}`,
    },
    AVAILABILITY: {
        LIST: (roomId) => `/rooms/${roomId}/availability`,
        CREATE: (roomId) => `/rooms/${roomId}/availability`,
        UPDATE: (roomId, id) => `/rooms/${roomId}/availability/${id}`,
        DELETE: (roomId, id) => `/rooms/${roomId}/availability/${id}`,
    },
    PROPOSALS: {
        LIST: (roomId) => `/rooms/${roomId}/proposals`,
        CREATE: (roomId) => `/rooms/${roomId}/proposals`,
        UPDATE: (roomId, id) => `/rooms/${roomId}/proposals/${id}`,
        DELETE: (roomId, id) => `/rooms/${roomId}/proposals/${id}`,
        SELECT: (roomId, id) => `/rooms/${roomId}/proposals/${id}/select`,
    },
    VOTES: {
        LIST: (roomId, proposalId) => `/rooms/${roomId}/proposals/${proposalId}/votes`,
        VOTE: (roomId, proposalId) => `/rooms/${roomId}/proposals/${proposalId}/vote`,
        UPDATE: (roomId, proposalId) => `/rooms/${roomId}/proposals/${proposalId}/vote`,
        DELETE: (roomId, proposalId) => `/rooms/${roomId}/proposals/${proposalId}/vote`,
    },
    ACTIVITIES: {
        LIST: (roomId, proposalId) => `/rooms/${roomId}/proposals/${proposalId}/activities`,
        CREATE: (roomId, proposalId) => `/rooms/${roomId}/proposals/${proposalId}/activities`,
        UPDATE: (roomId, proposalId, id) => `/rooms/${roomId}/proposals/${proposalId}/activities/${id}`,
        DELETE: (roomId, proposalId, id) => `/rooms/${roomId}/proposals/${proposalId}/activities/${id}`,
    },
    MESSAGES: {
        LIST: (roomId) => `/rooms/${roomId}/messages`,
        CREATE: (roomId) => `/rooms/${roomId}/messages`,
        DELETE: (roomId, id) => `/rooms/${roomId}/messages/${id}`,
    },
};
//# sourceMappingURL=index.js.map