// Everything personal lives here, so editing your story never means touching component code.

export const RELATIONSHIP_START = "2025-12-04T23:50:00";

export const nicknames = [
  "My Love",
  "Momma",
  "My Constellation",
  "Beautiful Girl",
  "Pretty Girl",
  "Sunshine",
  "My Favorite Human",
  "Angel",
  "Gorgeous",
  "Sweetheart",
  "My Violent Rat",
];

export const timeline = [
  {
    id: "before-us",
    title: "Before Us",
    date: "Somewhere before December",
    text: "Somewhere in the middle of ordinary life, doing nothing special, you appeared. I did not know yet how much that would change.",
  },
  {
    id: "the-number",
    title: "The Number",
    date: "Three days of asking",
    text: "I asked Festus for your number for three days straight. He finally gave in. I am still convinced that was the best favor anyone has ever done me. I texted you not really knowing what to expect. Less than a month later, we were us.",
  },
  {
    id: "official",
    title: "Becoming Official",
    date: "December 4, 2025, 11:50 PM",
    text: "Officially, it was December 4th, 11:50 PM. We both know someone insists it was the 5th. I have stopped arguing. We celebrate both now, and honestly, I think that just means we get two anniversaries a year instead of one.",
  },
  {
    id: "kilimanjaro",
    title: "First Date, Kilimanjaro",
    date: "Our first date",
    text: "You barely looked at me the entire night. I do not think you realized how adorable that was, or how loud my heart was being about it under the table.",
  },
  {
    id: "pleasure-park",
    title: "Pleasure Park",
    date: "An ordinary walk",
    text: "We walked past a newly married couple and I said it out loud, that it was a sign. You laughed and told me it did not mean anything. I promised myself quietly that when we get married, I would remind you of that day. Consider this me, keeping a very long-term promise.",
  },
  {
    id: "cinema",
    title: "The Cinema",
    date: "The one I still think about",
    text: "When it was time to leave, you held onto me and cried. I did not expect it, and I have not forgotten it since. That is the moment I understood how much I meant to you, and it is the moment that means the most to me.",
  },
];

export const reasons = [
  "I love your smile.",
  "I love how you light up every room.",
  "I love your cheerful personality.",
  "I love your sweet voice.",
  "I love how caring you are.",
  "I love how you always support me.",
  "I love that you're willing to grow with me.",
  "I love listening to you yap.",
  "I love how playful you are.",
  "I love your dramatic moments.",
  "I love your beautiful eyes.",
  "I love your height.",
  "I love your tummy.",
  "I love how you've never made me feel unloved.",
  "I love the effort you put into us.",
  "I love how safe you make me feel.",
  "I love that you're becoming my home.",
];

export const starMessages = [
  "You make ordinary days magical.",
  "My favorite place is beside you.",
  "I hope you always smile like this.",
  "You are home.",
  "The universe did something right.",
  "I'd choose you again.",
  "There are billions of stars. You're still my favorite one.",
  "You'll always be my favorite notification.",
];

export const loveLetter = {
  paragraphs: [
    "Mitchelle, you are the brightest constellation in my sky. I know that sounds like something out of a movie, but I have tried to find a smaller way to say it and I cannot, because nothing else fits.",
    "I still remember the three days I spent bothering Festus for your number. I was not usually that person. I do not chase things I am unsure of. But something about you made the waiting feel worth it before I had even said a word to you.",
    "You changed my life. Not in some dramatic, sudden way, but slowly, in the way mornings change from dark to light. I did not notice it happening until I looked up one day and realized how different everything felt with you in it.",
    "I still remember that day at the cinema. You held onto me like you did not want the night to end, and honestly, neither did I. I think that was the moment I stopped being careful with my heart around you.",
    "When you smiled at me for the first time without being shy about it, something in me settled. Like my whole chest exhaled.",
    "You are my safest place. Not because everything with you is easy, it is not always, but because even on the hard days, you are still the person I want to come home to.",
  ],
  closing:
    "And if you ever forget how deeply you are loved, come back here. I'll be waiting.",
  signature: "Onyinyechi",
};

export const promises = [
  "Always make you happy.",
  "Never give up on you.",
  "Always make you feel loved.",
];

// Chapter Two, one combined list of photos and videos, shown in this exact
// order. Add, remove, or reorder items freely, this array is the only thing
// that controls what appears and in what order.
//
// Each item needs:
//   type    "photo" or "video"
//   name    base filename in public/images (photos) or public/videos
//           (videos), no extension. The site tries common extensions and
//           cases automatically, see the README in each folder.
//   caption whatever you want written under it
//
// Videos can also take:
//   poster  base filename of a thumbnail image in public/images, no
//           extension, totally optional. Leave it out (or set to null) and
//           the card just shows a plain dark frame with a play icon
//           instead, which looks fine too.
//
// The captions on the video entries below are placeholders in the same
// voice as the photo captions, written so the page looks and reads right
// immediately. Swap in your own labels whenever you're ready, nothing else
// needs to change.
export const galleryItems = [
  { type: "photo", name: "photo1", caption: "Kilimanjaro, the night you wouldn't look at me." },
  {
    type: "video",
    name: "video1",
    poster: null,
    caption: "Kilimanjaro again, this time with sound. Replace this with the clip you actually want here.",
  },
  { type: "photo", name: "photo2", caption: "Pleasure Park, right before I made my prediction." },
  {
    type: "video",
    name: "video2",
    poster: null,
    caption: "A few seconds of Pleasure Park, just so I can hear us laughing again whenever I want.",
  },
  { type: "photo", name: "photo3", caption: "One of my favorite ordinary days." },
  { type: "photo", name: "photo4", caption: "Youuuuuuu." },
  {
    type: "video",
    name: "video3",
    poster: null,
    caption: "The cinema, in motion this time. This one's yours to swap for whatever you'd rather I keep.",
  },
  { type: "photo", name: "photo5", caption: "Us, somewhere in between everything else." },
  {
    type: "video",
    name: "video4",
    poster: null,
    caption: "One more memory that moves. Rename this slot or add a fifth, however many you want in here.",
  },
  // { type: "photo", name: "photo6", caption: "A day I never wanted to end." },
];
