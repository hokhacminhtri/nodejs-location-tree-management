import { DataSource } from 'typeorm';
import { Location } from './locations/location.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'locationdb',
  entities: [Location],
  synchronize: false,
});

async function seedDatabase() {
  await dataSource.initialize();

  const locationRepository = dataSource.getRepository(Location);

  // Save Building A first
  const buildingA = locationRepository.create({
    name: 'Building A',
    number: 'A',
    area: 1000.0,
  });
  await locationRepository.save(buildingA);

  // Save child locations of Building A
  const carPark = locationRepository.create({
    name: 'Car Park',
    number: 'A-CarPark',
    area: 80.62,
    parent: buildingA,
  });

  const level1 = locationRepository.create({
    name: 'Level 1',
    number: 'A-01',
    area: 100.92,
    parent: buildingA,
  });
  await locationRepository.save([carPark, level1]);

  // Save grandchild locations of Level 1
  const lobbyLevel1 = locationRepository.create({
    name: 'Lobby Level1',
    number: 'A-01-Lobby',
    area: 80.62,
    parent: level1,
  });

  const corridorLevel1 = locationRepository.create({
    name: 'Corridor Level 1',
    number: 'A-01-Corridor',
    area: 30.2,
    parent: level1,
  });

  const masterRoom = locationRepository.create({
    name: 'Master Room',
    number: 'A-01-01',
    area: 50.11,
    parent: level1,
  });

  const toiletLevel1 = locationRepository.create({
    name: 'Toilet Level 1',
    number: 'A-01-02',
    area: 30.2,
    parent: level1,
  });
  await locationRepository.save([
    lobbyLevel1,
    corridorLevel1,
    masterRoom,
    toiletLevel1,
  ]);

  // Save great-grandchild locations of Master Room
  const meetingRoom1 = locationRepository.create({
    name: 'Meeting Room 1',
    number: 'A-01-01-M1',
    area: 20.11,
    parent: masterRoom,
  });
  await locationRepository.save(meetingRoom1);

  // Save Building B first
  const buildingB = locationRepository.create({
    name: 'Building B',
    number: 'B',
    area: 2000.0,
  });
  await locationRepository.save(buildingB);

  // Save child locations of Building B
  const level5 = locationRepository.create({
    name: 'Level 5',
    number: 'B-05',
    area: 150.0,
    parent: buildingB,
  });
  await locationRepository.save(level5);

  // Save grandchild locations of Level 5
  const utilityRoom = locationRepository.create({
    name: 'Utility Room',
    number: 'B-05-11',
    area: 10.2,
    parent: level5,
  });

  const sanitaryRoom = locationRepository.create({
    name: 'Sanitary Room',
    number: 'B-05-12',
    area: 12.2,
    parent: level5,
  });

  const maleToilet = locationRepository.create({
    name: 'Male Toilet',
    number: 'B-05-13',
    area: 30.2,
    parent: level5,
  });

  const gensetRoom = locationRepository.create({
    name: 'Genset Room',
    number: 'B-05-14',
    area: 35.2,
    parent: level5,
  });

  const pantryLevel5 = locationRepository.create({
    name: 'Pantry Level 5',
    number: 'B-05-15',
    area: 50.2,
    parent: level5,
  });

  const corridorLevel5 = locationRepository.create({
    name: 'Corridor Level 5',
    number: 'B-05-Corridor',
    area: 30.0,
    parent: level5,
  });
  await locationRepository.save([
    utilityRoom,
    sanitaryRoom,
    maleToilet,
    gensetRoom,
    pantryLevel5,
    corridorLevel5,
  ]);

  console.log('Sample data has been seeded.');
  await dataSource.destroy();
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
});
