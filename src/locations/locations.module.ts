import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [], // Add LocationsController later
  providers: [], // Add LocationsService later
  exports: [], // Export if needed
})
export class LocationsModule {}
