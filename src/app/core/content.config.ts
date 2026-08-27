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
  subline: 'Every year with you deserves its own celebration — this one is yours.',
  cta: 'Begin the Experience',
};

// Page two's opening moment — a wall of photos sliding by behind a single
// sweet/cheeky line. Replace `photos` with real pictures whenever ready;
// placeholders fall back to a soft tinted tile automatically.
export const PINTEREST_WALL = {
  headline: 'My Chand Badyal',
  subline: 'Every picture I have is proof I got lucky.',
  scrollCue: 'scroll down',
  photos: Array.from({ length: 14 }, (_, i) => `assets/wall/${i + 1}.jpg`),
};

// The narrative arc of her life so far, told as chapters along a DNA
// strand — replace the placeholder photo/text per chapter. The last one
// or two should bridge into tonight, since the site is shown at the end
// of the birthday itself, not before it.
export type StoryChapter = {
  label: string;
  title: string;
  photo: string; // e.g. 'assets/story/1.jpg'
  text: string;
  broken?: boolean;
};

export const STORY_SECTION = {
  eyebrow: 'Before tonight',
  title: 'The Story of Manvi, So Far',
  subtitle: 'Every chapter that led to who she is today — scroll to turn the strand.',
};

export const STORY: StoryChapter[] = [
  {
    label: 'Chapter One',
    title: 'Where It All Began',
    photo: 'assets/story/1.jpg',
    text: 'Replace this with a few lines about her earliest years — where she grew up, what she was like as a kid, whatever makes this feel like the opening page of her story.',
  },
  {
    label: 'Chapter Two',
    title: 'Growing Into Herself',
    photo: 'assets/story/2.jpg',
    text: 'Add a note about her school or college years — the version of her that was figuring things out, becoming who she is now.',
  },
  {
    label: 'Chapter Three',
    title: 'Finding Her People',
    photo: 'assets/story/3.jpg',
    text: 'A paragraph about her friendships, her family, the people who shaped her — whatever feels true.',
  },
  {
    label: 'Chapter Four',
    title: 'The Chapter With Me',
    photo: 'assets/story/4.jpg',
    text: 'This is where you two enter the story — how you met, or what changed once you did. Keep it personal.',
  },
  {
    label: 'Chapter Five',
    title: 'Who She Is Today',
    photo: 'assets/story/5.jpg',
    text: 'Describe her now — her strength, her humor, whatever you admire most about the person she has become.',
  },
  {
    label: 'Tonight',
    title: 'A New Chapter Begins',
    photo: 'assets/story/6.jpg',
    text: 'And then, tonight — another year added to her story. Everything from here on is just the beginning of it.',
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
