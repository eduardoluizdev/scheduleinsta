"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStories() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado");
  }

  const stories = await prisma.story.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });

  return stories;
}

export async function createStory(data: {
  content: string;
  mediaUrl?: string;
  mediaType?: string;
  scheduledAt: Date;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado");
  }

  const story = await prisma.story.create({
    data: {
      ...data,
      userId: session.user.id,
      status: "pending",
    },
  });

  revalidatePath("/dashboard");

  return story;
}

export async function deleteStory(storyId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado");
  }

  // Verificar se a story pertence ao usuário
  const story = await prisma.story.findFirst({
    where: {
      id: storyId,
      userId: session.user.id,
    },
  });

  if (!story) {
    throw new Error("Story não encontrada");
  }

  await prisma.story.delete({
    where: {
      id: storyId,
    },
  });

  revalidatePath("/dashboard");

  return { success: true };
}

export async function updateStory(
  storyId: string,
  data: {
    content?: string;
    mediaUrl?: string;
    mediaType?: string;
    scheduledAt?: Date;
    status?: string;
  }
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado");
  }

  // Verificar se a story pertence ao usuário
  const story = await prisma.story.findFirst({
    where: {
      id: storyId,
      userId: session.user.id,
    },
  });

  if (!story) {
    throw new Error("Story não encontrada");
  }

  const updatedStory = await prisma.story.update({
    where: {
      id: storyId,
    },
    data,
  });

  revalidatePath("/dashboard");

  return updatedStory;
}

export async function getStats() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  const [scheduled, postedToday, totalMonth] = await Promise.all([
    prisma.story.count({
      where: {
        userId: session.user.id,
        status: "pending",
      },
    }),
    prisma.story.count({
      where: {
        userId: session.user.id,
        status: "posted",
        updatedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    }),
    prisma.story.count({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: firstDayOfMonth,
          lt: firstDayOfNextMonth,
        },
      },
    }),
  ]);

  return {
    scheduled,
    postedToday,
    totalMonth,
  };
}
