import { RequestUserDto } from 'src/common/presentation/dtos/request-user.dto';
import { UpdatePersonDto } from '../dtos/update-person.dto';

export class UpdatePersonCommand {
  constructor(
    public readonly id: string,
    public readonly updatePersonDto: UpdatePersonDto,
    public readonly updatedBy: RequestUserDto,
  ) {}
}
// ไม่มีการใช้ companyId ใน command นี้แล้ว ถ้าใน DTO ไม่มี
