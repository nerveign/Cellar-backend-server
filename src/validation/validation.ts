import { ZodType } from 'zod';

export class Validatopn {
  static validate<T>(schema: ZodType, data: T) {
    return schema.parse(data);
  }
}
