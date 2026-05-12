export interface Photo {
  id: number;
  src: string;
  label: string;
  note: {
    title: string;
    text: string;
    date: string;
    icon: string;
  };
  initialRotation: number;
  initialX: number; // percentage
  initialY: number; // percentage
  width: number; // px
  locked?: boolean;
}

export const photos: Photo[] = [
  {
    id: 1,
    src: '/photos/img1.jpeg',
    label: 'golden hour',
    note: {
      title: 'The Pose I Fell For',
      text: `This pose has become her thing — effortless, cute, and full of attitude at the same time. The oversized cozy sweater, those relaxed jeans, and the way she casually throws that little hand sign… it’s impossible not to smile looking at it.I call her “Spiduuu” because of this exact pose, and honestly, it’s my favorite version of her. There’s something so playful and comforting about it that makes me fall for her a little more every single time. 🤍🕷️`,
      date: 'Pose hi kehdey, Buggu',
      icon: '🌸',
    },
    initialRotation: -8,
    initialX: 12,
    initialY: 10,
    width: 170,
  },
  {
    id: 2,
    src: '/photos/img2.jpeg',
    label: 'rainy café days',
    note: {
      title: '1:59 AM & Still The Cutest',
      text: 'This picture feels like comfort in its purest form. Sleepy eyes, wrapped up in a blanket, soft late-night vibes, and that calm little expression that somehow makes everything feel okayIt’s one of those photos I can stare at for hours because it feels so real and warm — like home. Even half asleep, she manages to look unbelievably adorable, and honestly, moments like these are my favorite. Quiet calls, random screenshots, sleepy faces… they become memories without even trying. 🤍🌙',
      date: 'Sleepy Owls staring Each Other',
      icon: '☕',
    },
    initialRotation: 5,
    initialX: 68,
    initialY: 8,
    width: 160,
  },
  {
    id: 3,
    src: '/photos/img3.jpeg',
    label: 'sunday mornings',
    note: {
      title: 'Braids, Glasses & My Whole Heart 🤍',
      text: 'There’s something unbelievably soft and comforting about this picture. The pink outfit, those neatly tied braids, the glasses, and that peaceful little expression — everything about it feels so pure and effortless.She doesn’t even have to try. Just sitting quietly in the backseat somehow turns into one of the prettiest moments ever. It’s the kind of photo that feels calm, warm, and impossible to forget.And those braids? Yeah… instant weakness. 🤍🎀',
      date: 'Sleepy Eyes & Faded Frames',
      icon: '🌤️',
    },
    initialRotation: -3,
    initialX: 35,
    initialY: 62,
    width: 155,
  },
  {
    id: 4,
    src: '/photos/img4.jpeg',
    label: 'our little garden',
    note: {
      title: 'My Favourite Mirror Selfie',
      text: 'This picture is the definition of adorable. The simple grey tee, those perfectly tied braids, the oversized glasses, and that shy little smile together make this photo impossible to scroll past.She looks so effortlessly cute that even a random mirror selfie turns into something special. And the little red hearts around her? Honestly, they fit perfectly — because this picture feels exactly like one.It’s one of those photos that stays in your gallery for no reason… except that you never get tired of looking at it. 🤍📸',
      date: 'Freckles & Fuzzy Sweater',
      icon: '🌹',
    },
    initialRotation: 11,
    initialX: 55,
    initialY: 55,
    width: 165,
  },
  {
    id: 5,
    src: '/photos/img5.jpeg',
    label: 'dancing under stars',
    note: {
      title: 'Certified Cutie Energy ❤️✨',
      text: 'This picture is pure chaos and cuteness mixed together 😭❤️The double braids, oversized glasses, thumbs up, and that tiny tongue-out expression make her look so playful and adorable at the same time. It’s impossible to look at this photo without smiling back instantly.What makes it special is how natural it feels — no perfect pose, no effort, just her being her… and somehow that becomes the prettiest thing ever.This is the kind of picture that can fix a bad day in seconds. 🤍',
      date: 'Double Bun Attack',
      icon: '✨',
    },
    initialRotation: -12,
    initialX: 75,
    initialY: 32,
    width: 158,
  },
  {
    id: 6,
    src: '/photos/img6.jpeg',
    label: 'her laughter',
    note: {
      title: 'Thumbs Up From My Favorite Human',
      text: 'Her favorite goofy little pose — glasses on, tongue out, thumbs up like she owns the world 😭❤️And somehow, every single time she does it, I fall for her even harder.That’s my Spiduuu.',
      date: 'Tongue Twister',
      icon: '💛',
    },
    initialRotation: 7,
    initialX: 20,
    initialY: 38,
    width: 162,
  },
  {
    id: 7,
    src: '/photos/img7.jpeg',
    label: 'our cozy world',
    note: {
      title: 'The Cutest Entrance Ever',
      text: 'She walked in like a tiny princess with the loudest little smile and the happiest heart. 👑✨No expensive thing in this world can match the joy hidden in moments like this.',
      date: 'Princess With Unlimited Energy',
      icon: '🕯️',
    },
    initialRotation: -6,
    initialX: 8,
    initialY: 60,
    width: 155,
  },
  {
    id: 8,
    src: '/photos/img8.jpeg',
    label: 'our sunset',
    note: {
      title: 'Watching the sky with you',
      text: 'She turned one silly little pose into an entire personality 😭❤️That thumbs up, the tongue-out smile, the braids, the glasses…Everything about this screams Spiduuu energy.',
      date: 'Thumbs Up Galore',
      icon: '🌅',
    },
    initialRotation: 9,
    initialX: 42,
    initialY: 18,
    width: 168,
  },
  {
    id: 9,
    src: '/photos/photo9.jpg',
    label: 'for you, always',
    note: {
      title: 'Everything reminds me of you',
      text: 'Roses, soft pinks, the delicate things — they all carry your name now. You\'ve changed how I see beauty. You\'ve made the world more gentle. More worthy of being loved. Just like you.',
      date: 'all the time',
      icon: '🌺',
    },
    initialRotation: -4,
    initialX: 62,
    initialY: 72,
    width: 160,
  },
  {
    id: 10,
    src: '/photos/img2.jpeg',
    label: 'Future memories loading…',
    note: {
      title: 'Our story isn\'t finished',
      text: 'This one is still being written. By us. Together. All the places we haven\'t been yet, the mornings we haven\'t woken up to, the laughter we haven\'t discovered yet. I can\'t wait for all of it — with you.',
      date: 'someday soon',
      icon: '🔮',
    },
    initialRotation: 0,
    initialX: 42,
    initialY: 40,
    width: 158,
    locked: true,
  },
];
