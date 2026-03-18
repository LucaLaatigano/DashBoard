const ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {

    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const usersWithAvatars = data.map(user => ({
        ...user,
        avatar: `https://i.pravatar.cc/150?u=${user.id}`
    }));

    return usersWithAvatars;
};