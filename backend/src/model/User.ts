class User {
    
    private userId: string;
    private userName: string;
    private password: string;
    private email: string;
    private fullName: string;
    private phoneNumber: string;
    private roleId: string;
    private address: string;
    private avatar: string;

    constructor() {
        this.userId = null;
        this.userName = null;
        this.password = null;
        this.email = null;
        this.fullName = null;
        this.phoneNumber = null;
        this.roleId = null;
        this.address = null;
        this.avatar = null;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getUserName(): string {
        return this.userName;
    }

    public setUserName(userName: string): void {
        this.userName = userName;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getFullName(): string {
        return this.fullName;
    }

    public setFullName(fullName: string): void {
        this.fullName = fullName;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getRoleId(): string {
        return this.roleId;
    }

    public setRoleId(roleId: string): void {
        this.roleId = roleId;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getAvatar(): string {
        return this.avatar;
    }

    public setAvatar(avatar: string): void {
        this.avatar = avatar;
    }
}

export default User;