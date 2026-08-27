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
    title: 'The Girl Who Asked For The Moon',
    folder: 'chapter1',
    text:
      'On the thirty-first of August, in the kingdom of Pathankot, a daughter was born to King Bhubneshwar and Queen Sudesh — and the kingdom quietly agreed it had never seen anything so beautiful. She grew into a small princess with one very serious demand: she wanted the moon. Not a story about the moon, not a picture of it. The moon itself, fetched down and placed in her hands. She would point at the sky and do jidd until somebody promised to try. Nobody ever managed it. She has never entirely forgiven them.',
  },
  {
    label: 'Chapter Two',
    title: 'The Brightest Girl In Every Room',
    folder: 'chapter2',
    text:
      'Then came school, where the princess discovered she was inconveniently good at everything. Top of the class, first across the field, front of every stage — she collected trophies the way other children collected stickers. But that is not what anyone remembers. What they remember is the noise around her: a whole circle of friends orbiting her like she had her own gravity. She was the jaan of that group, the one who could turn an ordinary Tuesday into an occasion worth retelling for years.',
  },
  {
    label: 'Chapter Three',
    title: 'The Chapter Where She Wins Anyway',
    folder: 'chapter3',
    text:
      'College came, and with it the law — long books, longer nights, and friends who quietly became family. But every good story has a harder middle, and this one is hers. Life tested her in ways it had no business testing anyone, more than once and from more than one direction. She could have gone quiet. Instead she got stubborn — the very same jidd she once aimed at the moon, turned on everything standing in her way. She graduated. Of course she did.',
  },
  {
    label: 'Chapter Four',
    title: 'Enter, Rather Nervously, A Prince',
    folder: 'chapter4',
    text:
      'She was deep in her LLM when a prince turned up — no horse, no kingdom, and not especially charming to begin with, but hopelessly and permanently taken with her. One evening she told him her oldest secret: that as a little girl she had wanted the moon, and nobody had ever brought it. He listened. And he decided, quietly and completely, that he would love her to the moon and back so often that the moon would start to feel like the smaller gift.',
  },
  {
    label: 'Chapter Five',
    title: 'Happily, And Rather Loudly, Ever After',
    folder: 'chapter5',
    text:
      'Eventually the prince gathered himself and asked the question. She said yes. That is the whole ending — no dragon, no curse, no clever twist. Just a yes, and every ordinary day since made better for it. The princess still does not have the moon. But she does have someone who would genuinely try to get it for her, and honestly, that was always the better deal.',
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
