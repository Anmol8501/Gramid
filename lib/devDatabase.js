// Development database fallback when MongoDB is not available
let devUsers = [];

export const devDbInsert = async (collection, data) => {
    if (collection === 'users') {
        const user = { ...data, _id: Date.now().toString() };
        devUsers.push(user);
        console.log('User stored in development database:', user.email);
        return { result: { insertedId: user._id }, ok: 1 };
    }
    return { error: 'Collection not supported', ok: 0 };
};

export const devDbFind = async (collection, query) => {
    if (collection === 'users') {
        const user = devUsers.find(u => u.email === query.email);
        console.log('Development database query:', query, 'Result:', user ? 'Found' : 'Not found');
        if (!user) {
            return { message: 'No user', ok: 0 };
        }
        return { result: user, ok: 1 };
    }
    return { error: 'Collection not supported', ok: 0 };
};

export const getDevUsers = () => devUsers;
