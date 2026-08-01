# Videos

Chapter Two, the Gallery section, now shows photos and video clips together
in one combined list, in whatever order you set in
`src/data/content.js` under `galleryItems`. Video cards use the exact same
tilted, white-framed card look as the photos, they just play in place
instead of opening a lightbox.

Drop your clips in this folder using these base names, matching the default
entries already set up in `galleryItems`:

- `video1.mp4`, Kilimanjaro
- `video2.mp4`, Pleasure Park
- `video3.mp4`, Cinema
- `video4.mp4`, any other memory you want included

Want more than four, or different ones entirely. Just add a file here with
whatever base name you like, then add a matching `{ type: "video", name:
"yourname", caption: "..." }` entry to `galleryItems`, in whatever position
you want it to appear.

The extension and its case do not matter, same rule as the photos. Drop in
`video3.mp4`, `video3.MP4`, `video3.mov`, `video3.MOV`, `video3.webm`, or
`video3.WEBM`, the site tries all of these in order until one loads. Just
make sure the base name before the dot matches the `name` field exactly.

A few notes on how it behaves:

- Clips play themselves, muted, as they scroll into view, and pause again
  once they scroll back out. Controls stay visible the whole time, so
  tapping the speaker icon turns sound on, and tapping pause stops it,
  same as any normal video player. Nothing ever plays with sound
  automatically.
- If you set a `poster` in `galleryItems` pointing to a base name in
  `public/images`, that image shows as the thumbnail before playing. Leave
  `poster` out (or set it to `null`) and the card just shows a plain dark
  frame with a play icon instead, which looks fine too.
- If a clip is missing entirely, its card shows a "video coming soon"
  placeholder rather than a broken player, so you can add clips gradually
  without anything looking off.

You already have a couple of clips in this folder with their original phone
export names (the long ID-style `.MP4` and `.MOV` files). Those are not
wired into `galleryItems` yet since the site does not know what to call
them. Either rename one to `video1`, `video2`, `video3`, or `video4` (base
name only, keep its extension), or add a new entry to `galleryItems` using
its exact current base name.

Keep clips short (under 30 seconds) and compressed (H.264, under ~10MB each)
so they stay fast on mobile data.
