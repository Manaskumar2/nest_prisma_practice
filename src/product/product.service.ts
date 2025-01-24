import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getProducts(): Promise<any> {
    return this.databaseService.user.findMany();
    // Use Prisma to query the database and return the products
  }
  async getProductById(id: string): Promise<any> {
    return this.databaseService.user.findUnique({ where: { id: id } });
    // Use Prisma to query the database and return the product with the given ID
  }
}
