export class IUser {
  constructor(
    public email: string,
    public password: number,
    public name: string,
    public id?: number
  ) {}
}
