import { prisma } from "@/db/prisma";
import { FieldType } from "@/generated/prisma";
import { InputJsonValue } from "@prisma/client/runtime/library";

type GoalTypeSeed = {
  name: string;
  description: string;
  fields: {
    field_name: string;
    field_type: FieldType;
    required: boolean;
    options: InputJsonValue | null;
    trackable: boolean;
  }[];
};

export const seedGoalTypes = async (): Promise<void> => {
  const goalTypes: GoalTypeSeed[] = [
    {
      name: "Read more books",
      description:
        "Trade mindless scrolling on social media for the enjoyment of immersing yourself in the pages of a great book.",
      fields: [
        {
          field_name: "How many books do you aim to read this year?",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "How many books did you read already this year?",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "Are you currently reading something?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "Any specific books you'd like to read?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "Preferred book format",
          field_type: "dropdown" as FieldType,
          required: false,
          options: ["Ebook", "Paperback", "Audiobook"],
          trackable: false,
        },
        {
          field_name: "Anything else you would like to note?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
      ],
    },
    {
      name: "Journal",
      description:
        "Capture your thoughts and feelings to gain clarity and insight.",
      fields: [
        {
          field_name: "What did you reflect on today?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "What are you grateful for?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "Mood rating (1-10)",
          field_type: "integer" as FieldType,
          required: false,
          options: null,
          trackable: true,
        },
        {
          field_name: "Did journaling help today?",
          field_type: "boolean" as FieldType,
          required: false,
          options: null,
          trackable: true,
        },
        {
          field_name: "Journal method",
          field_type: "dropdown" as FieldType,
          required: false,
          options: ["Typed", "Handwritten", "Voice Notes"],
          trackable: false,
        },
      ],
    },
    {
      name: "Lose Weight",
      description:
        "Focus on healthy eating and regular exercise to achieve your weight loss goals.",
      fields: [
        {
          field_name: "How many pounds do you want to lose this year?",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "How many pounds have you already lost this year?",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "What challenges have you faced?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "What eating habits do you want to adopt?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "Anything else you'd like to share?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
      ],
    },
    {
      name: "Study",
      description:
        "Study more effectively to invest time in learning and unlock new opportunities.",
      fields: [
        {
          field_name: "What subjects are you focusing on?",
          field_type: "string" as FieldType,
          required: true,
          options: null,
          trackable: false,
        },
        {
          field_name: "How many hours do you want to study weekly?",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "Hours studied this week",
          field_type: "integer" as FieldType,
          required: false,
          options: null,
          trackable: true,
        },
        {
          field_name: "Study techniques or notes",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
      ],
    },
    {
      name: "Sleep more",
      description:
        "Get more rest to wake up refreshed and ready to have a better day!",
      fields: [
        {
          field_name: "Target hours of sleep per night",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "Average hours slept this week",
          field_type: "integer" as FieldType,
          required: false,
          options: null,
          trackable: true,
        },
        {
          field_name: "Sleep improvement ideas",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "Any obstacles to better sleep?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
      ],
    },
    {
      name: "Create Custom Goal",
      description:
        "Enter a custom resolution and set your own goals to achieve it!",
      fields: [
        {
          field_name: "Add New Resolution",
          field_type: "string" as FieldType,
          required: true,
          options: null,
          trackable: false,
        },
        {
          field_name:
            "How many times do you want to achieve this resolution this year?",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "How many times have you achieved it so far?",
          field_type: "integer" as FieldType,
          required: true,
          options: null,
          trackable: true,
        },
        {
          field_name: "What motivates you?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
        {
          field_name: "Is there anything else you'd like to note?",
          field_type: "string" as FieldType,
          required: false,
          options: null,
          trackable: false,
        },
      ],
    },
  ];

  for (const { fields, ...goalType } of goalTypes) {
    const created = await prisma.goalType.upsert({
      where: { name: goalType.name },
      update: {},
      create: goalType,
    });

    await prisma.goalTypeField.createMany({
      data: fields.map((field) => {
        const { options, ...rest } = field;
        return {
          ...rest,
          goal_type_id: created.id,
          ...(options ? { options } : {}),
        };
      }),
      skipDuplicates: true,
    });
  }
};
