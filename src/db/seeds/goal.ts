import { prisma } from "@/db/prisma";
import { FieldType } from "@/generated/prisma";
import { faker } from "@faker-js/faker";

export const seedGoals = async (): Promise<void> => {
  const users = await prisma.user.findMany();
  const goalTypes = await prisma.goalType.findMany({
    include: { fields: true },
  });

  for (const user of users) {
    for (const goalType of goalTypes) {
      for (let i = 1; i <= 2; i++) {
        const goal = await prisma.goal.create({
          data: {
            name: `${goalType.name} #${i}`,
            description: faker.lorem.sentence(),
            user_id: user.id,
            goal_type_id: goalType.id,
          },
        });

        const fieldValues = goalType.fields.map((field) => ({
          goal_type_field_id: field.id,
          goal_id: goal.id,
          user_id: user.id,
          value: generateFieldValueFromField(field),
        }));

        await prisma.goalFieldValue.createMany({ data: fieldValues });

        await prisma.goalBoardImage.create({
          data: {
            user_id: user.id,
            file_path: "uploads/demo-image.jpg",
            thumbnail_path: "uploads/thumbnails/demo-thumb.jpg",
          },
        });
      }
    }
  }
};

const generateFieldValueFromField = (field: {
  field_type: FieldType;
  options: any;
}): string => {
  switch (field.field_type) {
    case "string":
      return faker.word.words(2);
    case "integer":
      return faker.number.int({ min: 1, max: 100 }).toString();
    case "boolean":
      return faker.datatype.boolean().toString();
    case "dropdown":
      if (Array.isArray(field.options) && field.options.length > 0) {
        return faker.helpers.arrayElement(field.options);
      }
      return "Unknown Option";
    default:
      return "N/A";
  }
};
