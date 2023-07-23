import { auth } from "@clerk/nextjs";
import prismaDb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constant";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    // if the user is already using the api limit, increase the count
    await prismaDb.userApiLimit.update({
      where: {
        userId: userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    // if the user doesn't have an api limit create one
    await prismaDb.userApiLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();


  if(!userId) {
    return 0;
  };

  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0; 
  }

  return userApiLimit.count

};
