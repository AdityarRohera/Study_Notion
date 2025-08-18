// import ngrok from 'ngrok';

// const port = process.env.PORT || 4000;

// export const connectNgrok = async () => {
//   try {
//     // Optional: run only once if auth not set
//     // await ngrok.authtoken('YOUR_AUTHTOKEN_HERE');

//     const url = await ngrok.connect({
//       addr: port,
//       proto: 'http', // default is http
//     });

//     console.log(`✅ Ngrok tunnel started at: ${url}`);
//   } catch (error) {
//     console.error('❌ Error connecting ngrok:', error);
//   }
// };

