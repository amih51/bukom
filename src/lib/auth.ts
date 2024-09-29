import getSession from "./get-session";

export const currentUser = async () => {
  const session = await getSession();

  return session?.user;
};
