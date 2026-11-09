# design/

Six Direction C artboards exported from the Design canvas as source files: Home, Register and Topic page, each at desktop (1440) and mobile (390). boards.json lists their widths. Heights are estimates.

## How to read them
- Each file is a "Design Component" page. The markup inside `<x-dc>` is plain HTML. The CSS is inside `<helmet><style>`. Class names, spacing, type sizes and copy are exact.
- Ignore `<script src="./support.js">` and the `<script type="text/x-dc">` block. They belong to the canvas runtime.
- `data-component` attributes name the components in HANDOFF-SPEC.md.
- The files should open in a browser as static pages, but that has not been checked. Controls whose value comes from the canvas runtime (for example a select showing "Communications") will show their first option instead. Use HANDOFF-SPEC.md for intended values.
- Do not ship these files. Rebuild them as the real site.

## What is not here
Screens 02, 03, 04, 06, 07, 08 have no artboards. HANDOFF-SPEC.md section 7 specifies them.
If design/screenshots/ exists, those images are the visual reference for comparison.
