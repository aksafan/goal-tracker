import { prisma } from "@/db/prisma";
import { faker } from "@faker-js/faker";
import { Frequency } from "@/generated/prisma";

const predefinedQuests: Record<
  string,
  { title: string; icon: string; frequency: Frequency[] }[]
> = {
  "Read more books": [
    { title: "Read 1 page a day", icon: "📖", frequency: [Frequency.Daily] },
    {
      title: "Write a List of Books You Want to Read",
      icon: "\uD83D\uDCD6",
      frequency: [Frequency.Tuesdays],
    },
    {
      title: "Share a Book Recommendation to a friend",
      icon: "🤝",
      frequency: [Frequency.Wednesdays],
    },
    {
      title: "Set a Reading Time of 5 min",
      icon: "⏱",
      frequency: [Frequency.Fridays],
    },
  ],
  "Lose Weight": [
    {
      title: "Drink a glass of water",
      icon: "\uD83D\uDCA7",
      frequency: [Frequency.Daily],
    },
    {
      title: "Eat a piece of fruit",
      icon: "🍎",
      frequency: [Frequency.Tuesdays],
    },
    {
      title: "Eat a serving of vegetables",
      icon: "🥦",
      frequency: [Frequency.Wednesdays],
    },
    {
      title: "Write down one healthy choice you made",
      icon: "📒",
      frequency: [Frequency.Thursdays],
    },
    {
      title: 'Write a health affirmation. Ex: "I am healthy."',
      icon: "🧘",
      frequency: [Frequency.Saturdays],
    },
    {
      title: "Take a stretch break",
      icon: "🧘‍♂️",
      frequency: [Frequency.Sundays],
    },
  ],
};

export const seedDailyQuests = async (): Promise<void> => {
  const users = await prisma.user.findMany();

  await prisma.dailyQuestSuggestion.createMany({
    data: [
      { title: "Go to gym", icon: "️️🏋" },
      { title: "Stretch break", icon: "🧘" },
      { title: "Drink more water", icon: "\uD83D\uDCA7" },
    ],
    skipDuplicates: true,
  });

  const suggestionRecords = await prisma.dailyQuestSuggestion.findMany();

  for (const user of users) {
    const userGoals = await prisma.goal.findMany({
      where: { user_id: user.id },
      include: { goal_type: true },
    });

    for (const goal of userGoals) {
      const questList = predefinedQuests[goal.goal_type.name];
      if (questList) {
        for (const predefined of questList) {
          await prisma.dailyQuest.create({
            data: {
              user_id: user.id,
              goal_id: goal.id,
              title: `${goal.goal_type.name} - ${predefined.title} [${goal.id.slice(0, 5)}]`,
              icon: predefined.icon,
              frequency: predefined.frequency,
            },
          });
        }
      }
    }

    for (let i = 0; i < 2; i++) {
      const suggestion = faker.helpers.arrayElement(suggestionRecords);
      const frequency: Frequency[] =
        i == 0
          ? [faker.helpers.arrayElement([Frequency.Daily])]
          : [
              faker.helpers.arrayElement([
                Frequency.Mondays,
                Frequency.Fridays,
                Frequency.Wednesdays,
              ]),
            ];
      await prisma.dailyQuest.create({
        data: {
          user_id: user.id,
          suggestion_id: suggestion.id,
          title: `${suggestion.title} (${faker.word.noun()})`,
          icon: suggestion.icon,
          frequency: frequency,
        },
      });
    }
  }

  const quests = await prisma.dailyQuest.findMany();
  for (const quest of quests) {
    const usedDates = new Set<number>();
    const completions = [];

    for (let i = 0; i < 2; i++) {
      let day: number;
      do {
        day = getRandomInt(1, 7);
      } while (usedDates.has(day));

      usedDates.add(day);

      completions.push({
        daily_quest_id: quest.id,
        user_id: quest.user_id,
        date: daysAgo(day),
        completed_at: daysAgo(day),
      });
    }

    await prisma.dailyQuestCompletion.createMany({ data: completions });
  }
};

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const daysAgo = (days: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - days);

  return d;
};
