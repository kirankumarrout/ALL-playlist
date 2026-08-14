export type Category = 'all' | 'journeys' | 'shops' | 'school' | 'regional' | 'bhakti' | 'festivals' | 'weddings' | 'night' | 'everyday'

export type Playlist = {
  title: string
  description: string
  creator: string
  domain: string
  category: Exclude<Category, 'all'>
  scene: string
  accent: string
}

export const categories: { id: Category; hi: string; en: string }[] = [
  { id: 'all', hi: 'सभी', en: 'All' },
  { id: 'journeys', hi: 'सफ़र', en: 'Journeys' },
  { id: 'shops', hi: 'दुकान-अड्डा', en: 'Shops & Addas' },
  { id: 'school', hi: 'बचपन-स्कूल', en: 'School Days' },
  { id: 'regional', hi: 'क्षेत्रीय', en: 'Regional' },
  { id: 'bhakti', hi: 'भक्ति-देश', en: 'Bhakti & Desh' },
  { id: 'festivals', hi: 'त्योहार', en: 'Festivals' },
  { id: 'weddings', hi: 'शादी-बारात', en: 'Weddings' },
  { id: 'night', hi: 'रात-महफ़िल', en: 'Late Night' },
  { id: 'everyday', hi: 'रोज़मर्रा', en: 'Everyday' },
]

export const playlists: Playlist[] = [
  { title: 'Seven Sisters FM', description: 'Northeast India music', creator: '@audaciousSneha', domain: 'seven-sisters-fm.pages.dev', category: 'regional', scene: 'mountains', accent: '#356d64' },
  { title: 'Sindu Ahamu', description: 'Sri Lankan 2000s bangers', creator: '@rasalajaya', domain: 'sinduahamu.vercel.app', category: 'regional', scene: 'station', accent: '#7b4b35' },
  { title: 'Odia Old Album', description: '140+ cassette-era Odia album bangers', creator: '@swopnajit2', domain: 'sidd.app/odia-old-album', category: 'regional', scene: 'cassette', accent: '#9b382b' },
  { title: 'இளையராஜா', description: 'Ilaiyaraaja late-night', creator: '@meetlynnjoseph', domain: 'ilaiya-raja.vercel.app', category: 'night', scene: 'portrait', accent: '#675b4e' },
  { title: 'भोजपुरी रात', description: 'Bhojpuri night songs', creator: '@screen_state', domain: 'bhojpuri-raat.vercel.app', category: 'night', scene: 'village', accent: '#77452a' },
  { title: 'జ్ఞాపకాలు', description: 'Telugu nostalgia, cutting shop retro', creator: '@phanindra_ai', domain: 'telugu-nostalgia-jnapaka', category: 'shops', scene: 'retro', accent: '#786239' },
  { title: 'Padayappa', description: 'Family cassette, AR Rahman era', creator: '@iamrkvin', domain: 'padayappa.vercel.app', category: 'school', scene: 'minimal', accent: '#241b17' },
  { title: 'मी मराठी', description: 'Marathi playlists', creator: '@IndulkarC35767', domain: 'mi-marathi.vercel.app', category: 'regional', scene: 'coast', accent: '#8b6347' },
  { title: 'Bhojpuri Cult', description: 'Lollypop Lagelu, Pawan Singh era', creator: '@prnst50', domain: 'bhojpuri.cfd', category: 'shops', scene: 'market', accent: '#a83f2d' },
  { title: 'Mero Nepal', description: 'The deluxe saloon, Nepali edition', creator: '@QxBLurr', domain: 'timro.fun', category: 'regional', scene: 'temple', accent: '#507a8b' },
  { title: 'Marwadi Heritage', description: 'Rajasthani folk and songs', creator: '@RanjeetLuhar', domain: 'rajasthani-heritage.vercel.app', category: 'regional', scene: 'heritage', accent: '#76512e' },
  { title: 'हिमाचल रोडवेज', description: 'Himachal pahadi roadways', creator: '@AkshitVrma', domain: 'roadways.wtf', category: 'journeys', scene: 'busmountain', accent: '#547c91' },
  { title: 'सफर-ए-यूपी', description: 'UP Roadways bus and 90s songs', creator: '@Shashwat_web3', domain: 'safar-e-up.vercel.app', category: 'journeys', scene: 'signal', accent: '#2f3031' },
  { title: 'हॉर्न ओके प्लीज', description: 'Highway bangers from Indian trucks', creator: '@thehirenthakkar', domain: 'horn-ok-please-gray.vercel.app', category: 'journeys', scene: 'truck', accent: '#7a493b' },
  { title: 'Safar FM', description: 'Songs for the road', creator: '@shivamdotdev', domain: 'safarm.vercel.app', category: 'journeys', scene: 'highway', accent: '#8d5a3b' },
  { title: 'हरियाणा रोडवेज', description: 'Haryana Roadways bus, route 47', creator: '@desi_vibes', domain: 'haryanaroadways.wtf', category: 'journeys', scene: 'road', accent: '#a47d45' },
  { title: 'Kalesh FM', description: 'Construction, brawls, horns, the real Indian road', creator: '@kaleshfm', domain: 'kalesh-fm.pages.dev', category: 'everyday', scene: 'citynight', accent: '#4d455f' },
  { title: 'Bearview', description: 'Bollywood travel, school-college days', creator: '@rearview', domain: 'rearview-jade.vercel.app', category: 'school', scene: 'silhouette', accent: '#3b3b3b' },
  { title: 'Truck Playlist', description: 'Highway truck playlist', creator: '@truckplay', domain: 'truck-play.netlify.app', category: 'journeys', scene: 'truckart', accent: '#a88b48' },
  { title: 'Dhun', description: 'Bollywood bangers, now with a DHH playlist', creator: '@Avichal_08', domain: 'dhun.dploy.avichal.me', category: 'everyday', scene: 'film', accent: '#9a7045' },
  { title: 'FiBeats', description: 'Older beats and playlists', creator: '@Ramslam007', domain: 'ramslam007.github.io/f...', category: 'night', scene: 'signal', accent: '#292a2c' },
  { title: 'Nostalgiclist', description: 'Turns these sites into real YT Music playlists', creator: '@sai1ff98', domain: 'nostalgiclist.vercel.app', category: 'school', scene: 'paper', accent: '#b59a63' },
  { title: 'Scenote', description: 'Bring your own playlist, swap the scene', creator: '@sansynx', domain: 'scenote.pages.dev', category: 'everyday', scene: 'palace', accent: '#657a72' },
  { title: 'बर्तन वाली प्लेलिस्ट', description: 'Kitchen sounds and songs for everyday chores', creator: '@gharwali', domain: 'bartan-wali-playlist', category: 'everyday', scene: 'kitchen', accent: '#8c7557' },
  { title: 'दंत चिकित्सालय', description: 'Calm music for the waiting room', creator: '@calm-dental', domain: 'calm-dental-waiting', category: 'everyday', scene: 'clinic', accent: '#67847e' },
  { title: 'नानी का घर', description: 'Songs that feel like summer at Nani’s house', creator: '@nostalgia', domain: 'nani-ka-ghar.vercel.app', category: 'school', scene: 'home', accent: '#826b51' },
]
