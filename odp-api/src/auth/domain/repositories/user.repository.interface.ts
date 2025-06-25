import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryInterface {
  save(user: UserEntity): Promise<UserEntity>;
  findByUsername(username: string): Promise<UserEntity | null>;
  // เพิ่มเมธอดค้นหาด้วยอีเมล (ถ้าต้องการ)
  findByEmail?(email: string): Promise<UserEntity | null>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  findById(id: string): Promise<UserEntity | null>;
  findAllCountPaginated(
    page: number,
    limit: number,
    sortBy: string,
    sortType: string,
    keyword: string,
    isActive: boolean,
    roles: string,
    company: string,
  ): Promise<[UserEntity[], number]>;
}