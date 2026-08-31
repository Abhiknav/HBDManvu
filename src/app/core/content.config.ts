/**
 * Everything personal lives here. Edit this file to update names, the
 * landing page, the life-story chapters, memories, letter text, and the
 * finale message — nothing else in the app needs to change.
 */

export const SITE = {
  name: 'Manvi',
  // used sparingly in playful/casual spots
  petNames: ['Betu', 'Betuly', 'Betulu', 'Chhotua', 'Chand Badyal', 'Betujee', 'Dum Dum'],
  birthYear: 1999,
};

// Page one — a single huge hero with one way forward: a button into the
// experience. Kept deliberately quiet and minimal.
export const LANDING = {
  eyebrow: 'A little world, just for you',
  greeting: 'Happy Birthday',
  /** the name shown on the landing hero — her pet name, not her full name */
  heroName: 'My Betu',
  subline: 'Every year with you deserves its own celebration — this one is yours.',
  cta: 'Begin the Experience',
};

// Page two's opening moment — a wall of photos sliding by behind a single
// sweet/cheeky line. Replace `photos` with real pictures whenever ready;
// placeholders fall back to a soft tinted tile automatically.
export const PINTEREST_WALL = {
  headline: 'My Chand Badyal',
  subline: 'Every picture I have of you is proof I got lucky. And I have 1000s',
  scrollCue: 'scroll down',
  // photos are read straight from src/assets/wall — drop more in and they
  // appear, no count to keep in sync
};

// Her life told as a fairytale, one chapter at a time. Each chapter shows
// every photo in its folder as a slide that flips over to reveal the next.
//
// Photos come from src/assets/story/chapter1 .. chapter5 and are picked up
// automatically by scripts/generate-story-manifest.js — drop images into a
// chapter folder under any filename and they appear here, in order. A
// chapter with no photos yet simply shows a decorated empty frame.
export type StoryChapter = {
  label: string;
  title: string;
  /** which folder under assets/story this chapter's slides come from */
  folder: string;
  text: string;
};

export const STORY_SECTION = {
  eyebrow: 'Once upon a time',
  title: 'The Story of Manvi Badyal',
  subtitle: 'aapki kahani meri jubaani',
};

export const STORY: StoryChapter[] = [
  {
    label: 'Chapter One',
    title: 'The Little Girl And The Moon',
    folder: 'chapter1',
    text:
      'On the thirty-first of August, in the kingdom of Pathankot, a daughter was born to King Bhubneshwar and Queen Sudesh. She was the softest, sweetest little thing — and right from the start, completely in love with the moon. Every night she would point up at it and ask for it, absolutely certain that someone would find a way to bring it down for her.',
  },
  {
    label: 'Chapter Two',
    title: 'The Girl Everyone Loved',
    folder: 'chapter2',
    text:
      'Then came school, where she was quietly good at whatever she turned her hand to. But that is not the part anyone remembers. They remember her — warm, funny, always laughing, always up for something. She had a circle of friends who adored her, and she was the jaan of that group: the one who made an ordinary day feel like fun.',
  },
  {
    label: 'Chapter Three',
    title: 'The Years That Tested Her',
    folder: 'chapter3',
    text:
      'College brought the law — long books, longer nights, and friends who quietly became family. It also brought a harder stretch, the kind nobody deserves and nobody is ever ready for. She carried it with more grace than it deserved, and she kept going. She came out the other side with her degree in hand and her softness completely intact.',
  },
  {
    label: 'Chapter Four',
    title: 'And Then, A Prince',
    folder: 'chapter4',
    text:
      'She was deep in her LLM when a prince turned up — no horse, no kingdom, and hopelessly taken with her from the very first day. One evening she told him her oldest secret: that as a little girl, she had always wanted the moon. He listened. And he decided, quietly and completely, to love her to the moon and back — every single day, until she never felt she was missing it at all.',
  },
  {
    label: 'Chapter Five',
    title: 'Neither Of Them Remembers',
    folder: 'chapter5',
    text:
      'Here is the funny part: neither of them remembers how it actually began. Not the day, not the words, not who said what first. Somewhere along the way he asked, and somewhere along the way she said yes, and that was that. No grand scene worth retelling — just two people who quietly chose each other, and have been choosing each other ever since.',
  },
];

export const BALLOONS = {
  eyebrow: 'Why I Love You So Much?',
  title: 'A Sky Full of Little Reasons',
  subtitle: 'Every balloon is hiding a little polaroid. Tap one, slowly, and see what falls out.',
  /**
   * Reasons, kept separate from the photos on purpose. Photos are picked up
   * automatically from src/assets/balloons (any filename, any extension),
   * so the two lists no longer have to be the same length — add either
   * without touching the other. Each popped balloon draws one of each.
   */
 messages: [
  'The way you make all my mornings so beautiful by sending me your pictures.',
  'Every time you get ready, seeing you my heart skips a beat.',
  'Your kind, loving and caring nature.',
  'The food you cook for me, makes me fall in love with you all over again.',
  'The childish things you keep doing without being conscious of what or who is around you.',
  'You are effortlessly funny.',
  'The way you get excited about the smallest things.',
  'The way you chup karao me when u lose a conversation or have nothing to say.',
  'Your terrible, wonderful, unstoppable energy.',
  'Simply put: your chehakna is my most favourite thing about you.',
  'The way you daanto me, but only when I know it\'s my fault and I\'m being scolded for that.',
  'Your devotion towards god is one of the purest things about you.',
  'The sincerity with which you do your duties.',
  'I love your voice, when you say hiiiii betu over call my world completely stops.',
  'The way you wait for my "how was your day" to start telling your stories from the day.',
  'The way you rant about your day sometimes and tell all the funny stories.',
  'The way you come and complain to me when sir scolds you, "sir ne daantaaaaaa" with that music, it melts my heart.',
  'You like sleeping alone but still you let me touch and hold you cause I like doing that.',
  'I just love your voice.',
  'Your dressing sense, mashaallah.',
  'The way aap gaal phula lete ho aur honth nikal lete ho, whenever u need pampering and love.',
  'The way u try to change your behaviour so easily without questioning if something bothers me.',
  'The way you try to calm me down and patiently accept all my accusations whenever I overthink and overreact.',
],
};

export const WISH_STARS = {
  /* Long for an eyebrow, so the section restyles it as a sentence rather
     than the tracked-out uppercase label used everywhere else. */
  eyebrow: '“Make a wish” is overrated — and since I get more excited about your birthday than you do, I get to make the wishes.',
  title: 'A Sky Full of Wishes',
  subtitle: 'Somewhere up there, a few stars are brighter than the rest. Each one is holding a wish I made for you — find them all.',
  hintLabel: 'Show me where',
  missLabel: 'not that one — keep looking',
  tallyLabel: 'wishes found',
  allSentLabel: 'You found every one. That’s all of them — and I’ll keep making more.',
  /*
   * One wish per star, and the stars are found in whatever order she
   * clicks them — so each wish has to stand on its own rather than refer
   * back to the one before it.
   */
  wishes: [
    'May you get all the success that you deserve — and by success I mean lots of health, wealth, happiness and prosperity.',
    'May you make me do aiyaashi with your money — buy me really, really expensive things, take me on amazing holidays, and udaao all your hard-earned money on me.',
    'May you get to do the same for your parents — the expensive things, the holidays, all of it 😛',
    'May you get to do the same for my parents too 😜',
    'May you get the most loving, caring and understanding boyfriend, husband, saas-sasur and sasural.',
    'May you find everything you are seeking, spiritually.',
    'May you get married soon — to me.',
    'And may we live happily ever after.',
  ],
};

export const MEMORIES_SECTION = {
  eyebrow: 'Moments',
  title: 'A Small Museum of Us',
  subtitle: 'Scroll to turn the wheel.',
};

export type Memory = {
  photo: string;
  caption: string;
  date?: string;
  broken?: boolean;
};

/**
 * Captions for the memory wheel. Photos themselves come from
 * src/assets/memories — any filename works — and these captions pair with
 * them IN ORDER: the first caption belongs to the first photo
 * alphabetically, and so on.
 *
 * Add or remove captions freely. Extra photos simply appear without one,
 * and extra captions are ignored, so the two lists never have to match.
 *
 * A \n inside a caption starts a new line, which is how the couplets and
 * verses below keep their shape instead of reflowing into a paragraph.
 */
export const MEMORY_CAPTIONS: Array<{ caption: string; date?: string }> = [
  {
    caption:
      'अच्छा ख़ासा बैठे बैठे गुम हो जाता हूँ\nअब मैं अक्सर मैं नहीं रहता, तुम हो जाता हूँ',
  },
  {
    caption:
      'तू सूरज की धूप है\nमैं सर्दी की हूँ सुबह\nमेरे हर इक मर्ज़ की तू है दवा\nमैं जब भी देख लूँ\nतुझे करीब से\nलगे के मिल गया है मेरा खुदा',
  },
  {
    caption:
      'Have you ever felt so much in love — so much that, forget about words, you can’t even find one good song to express what you feel?\nYes. I’m there. Right there.',
  },
  {
    caption:
      'Baje hain mere mann ke taar, sun le\nSaje hain mere dil ke dwaar, sun le\nKi ho gaya hai tumse pyaar, sun le\nPyaar bhi beshumaar, sun le',
  },
  {
    caption: 'I love you more than I love eating.\nAnd you know how much I love eating.',
  },
  {
    caption:
      'अज़ीज़ इतना ही रक्खो कि जी सँभल जाए\nअब इस क़दर भी न चाहो कि दम निकल जाए\n— but I feel I’m almost there 🫠',
  },
  {
    caption: 'You. Always you. Period.',
  },
  {
    caption: 'और क्या देखने को बाक़ी है\nआप से दिल लगा के देख लिया',
  },
  {
    caption:
      'When I’m in Bangalore…\nAb to mere ghar k tamam darwaze bhi\nTumse krte hain pyar, aa jao',
  },
  {
    caption: 'Home isn’t a place anymore.\nIt’s a person. It’s you 🫠',
  },
  {
    caption: 'I had a whole speech ready.\nThen you looked up, and I forgot every word of it.',
  },
  {
    caption: 'तुम्हें सोचना कोई काम नहीं लगता\nऔर मैं दिन भर यही काम करता हूँ',
  },
  {
    caption:
      'Sab kehte hain waqt sab kuch badal deta hai —\ntum ho ki har baar pehli baar lagti ho',
  },
  {
    caption: 'A person gets a handful of things right in one lifetime.\nYou are all of mine.',
  },
  {
    caption: 'कोई पूछे ज़िंदगी से क्या चाहिए\nतो बस इतना — तुम, और थोड़ा और वक़्त',
  },
];

export const LOVE_LETTER = {
  salutation: 'My dearest Betu,',
  paragraphs: [
    'Replace this paragraph with the first thing you want her to read — how this year with her felt, or what you’re most grateful for.',
    'Add a second paragraph here — an inside joke, a memory, or something only the two of you would understand.',
    'And a last one to close it out — a wish for the year ahead, or simply why she means so much to you.',
  ],
  signOff: 'Yours, always',
  signature: 'Me',
};

export const SCRATCH = {
  eyebrow: 'Oh one last thing, I nearly forgot',
  title: 'Scratch This Off',
  subtitle: 'Use your finger or cursor — there’s something underneath.',
  revealPhoto: 'assets/scratch/reveal.jpg',
  revealMessage: 'Replace this with the one thing you most want her to know — the real, unguarded one. This is the payoff moment, so make it count.',
};

// Shown just before the scratch card — the site is opened at the close of her birthday
// itself, so this is a celebration of the day that already happened, not
// a countdown to one still coming.
export const FINALE = {
  eyebrow: 'And so, we reach tonight',
  message: [
    'Happy Birthday, Manvi.',
    'Every year adds another reason I’m glad you exist.',
    'Here’s to all of it — the version of you today, and whoever you become next.',
  ],
  signature: '— With all my love, always',
};
