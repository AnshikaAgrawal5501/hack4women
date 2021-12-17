const getComments = async() => {
    return [{
            id: '1',
            body: 'comment 1',
            userId: '1',
            username: 'A',
            parentId: null,
            createdAt: 1234,
        },
        {
            id: '2',
            body: 'comment 2',
            userId: '2',
            username: 'B',
            parentId: null,
            createdAt: 12345,
        },
        {
            id: '3',
            body: 'comment 3',
            userId: '3',
            username: 'C',
            parentId: '1',
            createdAt: 123,
        },
        {
            id: '4',
            body: 'comment 4',
            userId: '4',
            username: 'D',
            parentId: '1',
            createdAt: 12340,
        },
        {
            id: '5',
            body: 'comment 5',
            userId: '5',
            username: 'E',
            parentId: '2',
            createdAt: 12341,
        },
        {
            id: '6',
            body: 'comment 6',
            userId: '6',
            username: 'F',
            parentId: null,
            createdAt: 12342,
        },
    ];
};

export default getComments;