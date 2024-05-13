const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.course.delete({
        where:{
            id: "f24383c6-c104-4ebb-b78f-7f650b1382e5"
        }
    });
    //f24383c6-c104-4ebb-b78f-7f650b1382e5
    console.log("Success");
  } catch (error) {
    console.error(error);
  } finally {
    await database.$disconnect();
  }
}

main();
