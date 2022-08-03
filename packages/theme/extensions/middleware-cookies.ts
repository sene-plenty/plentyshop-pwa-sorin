module.exports = {
  name: 'middleware-cookies',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-unused-vars
  hooks: (req, res) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      afterCall: ({ configuration, callName, args, response }) => {
        // console.log('after call cookies res: ', req);
        console.log('after call cookies res: ', callName);
        return response;
      }
    };
  }
};
