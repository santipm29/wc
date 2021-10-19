import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './config/database.service';
import { UsersModule } from './users/users.module';
import { CoinsModule } from './coins/coins.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development', isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: DatabaseService }),
    UsersModule,
    CoinsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
