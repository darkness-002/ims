
import { PrismaClient, ProgramType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Institutions
  const institution1 = await prisma.institution.create({
    data: {
      name: 'State University',
      code: 'SU',
      address: '123 University Ave, City, State 12345',
      phone: '+1-555-1000',
      email: 'info@stateuniversity.edu',
    },
  });

  const institution2 = await prisma.institution.create({
    data: {
      name: 'City College',
      code: 'CC',
      address: '456 College Blvd, Town, State 67890',
      phone: '+1-555-2000',
      email: 'contact@citycollege.edu',
    },
  });

  // Seed Shifts
  await prisma.shift.createMany({
    data: [
      { name: 'Morning', startTime: '08:00', endTime: '12:00', institutionId: institution1.id },
      { name: 'Afternoon', startTime: '13:00', endTime: '17:00', institutionId: institution1.id },
      { name: 'Evening', startTime: '18:00', endTime: '21:00', institutionId: institution1.id },
      { name: 'Full Day', startTime: '09:00', endTime: '17:00', institutionId: institution2.id },
    ],
  });

  // Seed Programs
  await prisma.program.createMany({
    data: [
      { name: 'Bachelor of Science in Computer Science', type: ProgramType.UNDERGRADUATE, code: 'BSCS', institutionId: institution1.id },
      { name: 'Master of Science in Computer Science', type: ProgramType.GRADUATE, code: 'MSCS', institutionId: institution1.id },
      { name: 'Bachelor of Business Administration', type: ProgramType.UNDERGRADUATE, code: 'BBA', institutionId: institution2.id },
      { name: 'Master of Business Administration', type: ProgramType.GRADUATE, code: 'MBA', institutionId: institution2.id },
    ],
  });

  // Seed Departments
  const dept1 = await prisma.department.create({
    data: {
      name: 'Computer Science',
      code: 'CS',
      institutionId: institution1.id,
    },
  });

  const dept2 = await prisma.department.create({
    data: {
      name: 'Mathematics',
      code: 'MATH',
      institutionId: institution1.id,
    },
  });

  const dept3 = await prisma.department.create({
    data: {
      name: 'Physics',
      code: 'PHY',
      institutionId: institution1.id,
    },
  });

  await prisma.department.create({
    data: {
        name: 'Business Administration',
        code: 'BA',
        institutionId: institution2.id,
    },
  });

  // Seed Teachers
  await prisma.teacher.createMany({
    data: [
      { firstName: 'John', lastName: 'Smith', email: 'john.smith@university.edu', phone: '+1-555-0101', departmentId: dept1.id },
      { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@university.edu', phone: '+1-555-0102', departmentId: dept1.id },
      { firstName: 'Michael', lastName: 'Williams', email: 'michael.williams@university.edu', phone: '+1-555-0103', departmentId: dept2.id },
      { firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@university.edu', phone: '+1-555-0104', departmentId: dept3.id },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
