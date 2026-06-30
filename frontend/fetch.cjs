// const https = require('https');
// const fs = require('fs');

// const crops = {
//   'padi.jpg': 'rice field agriculture',
//   'jagung.jpg': 'corn field agriculture',
//   'cabai.jpg': 'red chili plant field',
//   'kedelai.jpg': 'soybean field agriculture',
//   'singkong.jpg': 'cassava plant agriculture',
//   'sorgum.jpg': 'sorghum field agriculture',
//   'bawang.jpg': 'shallot onion agriculture',
//   'tomat.jpg': 'tomato plant field'
// };

// async function fetchImage(filename, query) {
//   return new Promise((resolve) => {
//     https.get('https://unsplash.com/napi/search/photos?query=' + encodeURIComponent(query) + '&per_page=1', (res) => {
//       let data = '';
//       res.on('data', chunk => data += chunk);
//       res.on('end', () => {
//         try {
//           const json = JSON.parse(data);
//           if (json.results && json.results.length > 0) {
//             const url = json.results[0].urls.regular;
//             https.get(url, (imgRes) => {
//               const file = fs.createWriteStream('public/' + filename);
//               imgRes.pipe(file);
//               file.on('finish', () => resolve(true));
//             });
//           } else resolve(false);
//         } catch (e) { resolve(false); }
//       });
//     });
//   });
// }

// async function run() {
//   for (const [file, q] of Object.entries(crops)) {
//     console.log('Fetching', file);
//     await fetchImage(file, q);
//   }
// }
// run();
