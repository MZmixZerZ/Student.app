export class SignInUserCommand {
  constructor(
    public readonly username: string, // เปลี่ยนชื่อให้สื่อความหมาย
    public readonly password: string,
  ) {}
}
