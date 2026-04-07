interface IAuthRepository {
    getUserByEmail: (email: string) => Promise<any>;
    createUser: (data: any) => Promise<any>;
}

export {
    IAuthRepository
}
