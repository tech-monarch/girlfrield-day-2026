# Images

Drop your real photos in this folder using these base names. The site
already looks for them, so nothing else needs to change once they're here.

- `hero-couple`, a favorite picture of the two of you, shown tilted just below the "Begin our journey" button.
- `photo1`, Kilimanjaro, your first date.
- `photo2`, Pleasure Park.
- `photo3`, any favorite ordinary day.
- `photo4`, her mid laugh, or any candid you love.
- `photo5`, any photo of the two of you.
- `photo6`, a day you never wanted to end.

Photos and videos now appear together in Chapter Two, the Gallery, as one
combined list defined by `galleryItems` in `src/data/content.js`. Add,
remove, or reorder entries there to change what shows and in what order, see
`public/videos/README.md` for how the video side of that same list works.

## Optional video posters

Any photo in this folder can also double as a poster (thumbnail) for a video
card. Just point a video entry's `poster` field in `galleryItems` at a base
name here, same extension and case tolerance applies. No poster set, or the
file is missing, the video card just falls back to a plain dark frame with a
play icon, never a broken image.

The extension and its case do not matter. `hero-couple.jpg`, `hero-couple.JPG`,
and `hero-couple.jpeg` all work, since the site tries the common variants
automatically until one loads. Just make sure the base name before the dot
matches exactly (no extra spaces, no "(1)" from a duplicate download).

Tips:

- Landscape photos (close to 4:3 or 16:10) look best, each one now fills a
  large, single frame, one at a time, like a gallery exhibition wall.
- Keep each file under ~500KB if you can (export at "web quality" from your
  phone's photo editor) so the site stays fast on mobile data.
- If a file is missing, that photo slot just quietly disappears instead of
  showing a broken image icon, so you can add them gradually.

## Optional album artwork

Drop cover art in this same folder for the music player using:
`album-perfect`, `album-photograph`, `album-lost-stars`, `album-shivers`.
Same rule applies, extension and case do not matter. Missing one just falls
back to a plain icon.
