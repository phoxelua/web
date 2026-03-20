Compress all images in a directory for web use.

Target directory: $ARGUMENTS (default: img/portfolio/)

Steps:
1. List all PNG and JPG/JPEG files in the target directory (recursively)
2. For each image, check dimensions with `sips -g pixelWidth -g pixelHeight`
3. For PNGs, convert to JPEG at 80% quality using sips. For existing JPEGs, recompress at 80% quality if over 200KB
4. Resize: if width > height (landscape), cap at 1200px wide. If height > width (portrait), cap at 400px wide. Skip resizing if already under the limit.
5. Remove original PNGs after successful JPEG conversion
6. Report a before/after summary showing total size saved

Use `sips` (macOS built-in) for all operations:
- Convert: `sips -s format jpeg -s formatOptions 80 input.png --out output.jpg`
- Resize: `sips --resampleWidth <width> file.jpg`

Do NOT convert PNGs that need transparency (check with `sips -g hasAlpha`). Skip SVGs, GIFs, and MP4s.
