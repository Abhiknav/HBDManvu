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

  /**
   * How many photos live in src/assets/wall, named 1.jpg, 2.jpg, 3.jpg...
   * Just bump this number when you add more. Setting it higher than the
   * number of files you actually have is harmless — any tile whose image
   * is missing removes itself from the wall instead of leaving a gap.
   */
  photoCount: 35,
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
  eyebrow: 'Pop them open',
  title: 'A Sky Full of Little Reasons',
  subtitle: 'Every balloon is hiding a little polaroid. Tap one, slowly, and see what falls out.',
  notes: [
    { message: 'The way you laugh at your own jokes before you finish telling them.', photo: 'assets/balloons/1.jpg' },
    { message: 'How you turn any ordinary day into something worth remembering.', photo: 'assets/balloons/2.jpg' },
    { message: 'Your voice is the first thing that makes a bad day feel survivable.', photo: 'assets/balloons/3.jpg' },
    { message: 'The way you care for people, even when no one’s watching.', photo: 'assets/balloons/4.jpg' },
    { message: 'Every ridiculous nickname you’ve ever answered to without complaint.', photo: 'assets/balloons/5.jpg' },
    { message: 'How stubborn you are — and how much I love that about you.', photo: 'assets/balloons/6.jpg' },
    { message: 'The way you get excited about the smallest things.', photo: 'assets/balloons/7.jpg' },
    { message: 'That you’re somehow more you every single year.', photo: 'assets/balloons/8.jpg' },
    { message: 'Your terrible, wonderful, unstoppable energy.', photo: 'assets/balloons/9.jpg' },
    { message: 'Simply put: you.', photo: 'assets/balloons/10.jpg' },
  ],
};

export const WISH_STARS = {
  eyebrow: 'What I wish for you',
  title: 'A Sky Full of Wishes',
  subtitle: 'Somewhere up there, a few stars are brighter than the rest. Each one is holding a wish I made for you — find them all.',
  hintLabel: 'Show me where',
  missLabel: 'not that one — keep looking',
  tallyLabel: 'wishes found',
  allSentLabel: 'You found every one. That’s all of them — and I’ll keep making more.',
  wishes: [
    'A year where you finally rest as much as you give.',
    'Every small, stupid, wonderful plan you make actually works out.',
    'People who deserve your energy, and enough sense to drop the ones who don’t.',
    'More reasons to laugh the way you do when you forget anyone’s watching.',
    'A little more softness for yourself, the kind you give everyone else freely.',
    'Every dream you’re too shy to say out loud, out loud, and coming true.',
    'A year that surprises you in the good way, for once.',
    'To always know how loved you are, even on the days it’s hard to feel.',
  ],
};

export const MEMORIES_SECTION = {
  eyebrow: 'Moments',
  title: 'A Small Museum of Us',
  subtitle: 'Scroll to turn the wheel — replace these placeholders with real photos in assets/memories/ whenever you’re ready.',
};

export type Memory = {
  photo: string; // e.g. 'assets/memories/1.jpg' — replace placeholders when ready
  caption: string;
  date?: string;
  broken?: boolean;
};

export const MEMORIES: Memory[] = [
  { photo: 'assets/memories/1.jpg', caption: 'Replace me with a photo that makes you smile.', date: 'someday' },
  { photo: 'assets/memories/2.jpg', caption: 'A moment worth keeping forever.', date: 'someday' },
  { photo: 'assets/memories/3.jpg', caption: 'The one where we couldn’t stop laughing.', date: 'someday' },
  { photo: 'assets/memories/4.jpg', caption: 'A quiet moment that meant everything.', date: 'someday' },
  { photo: 'assets/memories/5.jpg', caption: 'One more, just because.', date: 'someday' },
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
  eyebrow: 'One more thing',
  title: 'Scratch This Off',
  subtitle: 'Use your finger or cursor — there’s something underneath.',
  revealPhoto: 'assets/scratch/reveal.jpg',
  revealMessage: 'Replace this with the one thing you most want her to know — the real, unguarded one. This is the payoff moment, so make it count.',
};

// Shown at the very end — the site is opened at the close of her birthday
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
