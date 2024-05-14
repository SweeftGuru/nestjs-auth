import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Your custom methods and properties here

  onModuleInit() {
   this.$connect()
  }

  onModuleDestroy() {
   this.$disconnect()
  }
}