// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default async(context) => {
  const session = await context.$vsf.$plentymarkets.api.getSession();
  if (!session?.user?.id) {
    context.redirect('/');
  }
};
