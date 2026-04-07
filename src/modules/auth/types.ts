interface IAuthRepository {
    getUserByEmail: (email: string) => Promise<any>;
    createUser: (data: any) => Promise<any>;
    deleteUser: (id: string) => Promise<any>;
    updateUser: (id: string, data: any) => Promise<any>;
}

export {
    IAuthRepository
}
