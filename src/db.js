const dbDefault = [
    {
        id: 1,
        name: "1",
        artist: "1",
    },
    {
        id: 2,
        name: "2",
        artist: "2",
    },
    {
        id: 3,
        name: "3",
        artist: "3",
    },
    {
        id: 4,
        name: "4",
        artist: "4",
    },
    {
        id: 5,
        name: "5",
        artist: "5",
    },
    {
        id: 6,
        name: "6",
        artist: "6",
    },
    {
        id: 7,
        name: "7",
        artist: "7",
    },
    {
        id: 8,
        name: "8",
        artist: "8",
    },
];

export const db = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : dbDefault

// export default db;