---
topic: 7
slug: 07-bulletin-slides
title: Bulletin and slide text from one source [CONFIRM]
duration: About 20 minutes
outcome: By the end, you can write the bulletin once and reuse it for slides and the website.
status: draft
trap: samples/bulletin-master.md :: Opening hymn: Hymn 138
trap: samples/bulletin-master.md :: Starting Sunday, April 19, the second service moves from 10:30 a.m. to 10:45 a.m.
trap: samples/bulletin-master.md :: in Fellowship Hall, not the Youth Room
trap: samples/old-slides.md :: Hymn 302
trap: samples/old-slides.md :: Youth Room
flaw: Hymn 302, Holy, Holy, Holy
source: title and outcome from src/copy.ts; everything else drafted for approval
---

# Bulletin and slide text from one source [CONFIRM]

Topic 7 of 7. About 20 minutes.

By the end, you can write the bulletin once and reuse it for slides and the website.

## The idea, 5 minutes

The same news often gets typed three times: bulletin, slides, website. Each copy is a chance for a detail to change. Write one master text, let Claude make the shorter versions from it, then check each version against the master.

## The exercise

1. Start with one master text: Sunday’s order of worship and announcements, checked against the calendar. In class, use the sample.
2. Paste the master into a new chat and ask for short slide text, one slide per item. If you paste an old deck to show the layout, say it is for layout only.
3. Ask for a website post from the same master. Tell Claude to mark any detail not in the master [CONFIRM].
4. Compare every slide and the post with the master, line by line: each hymn number, date, time and room.

## Watch for this

### A leftover detail.

Last week’s slides, pasted to show the layout, list Hymn 302 and youth group in the Youth Room. This week’s master says Hymn 138, “Holy, Holy, Holy”, and youth group in Fellowship Hall. It also says the second service moves to 10:45 starting April 19. A slide can keep last week’s number or room, or drop “starting April 19” to save space.

## The habit

### One-source check.

The master is the only source. Compare every slide and the website post with it, line by line. Any detail that is not in the master comes out or is marked [CONFIRM], and anything shortened must still say the same thing. Last, read each hymn number, date, time and room against the master before Sunday.

## Data safety

Public worship and announcement text only. Keep prayer requests, health details and children’s names off slides and the website.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): This Sunday’s bulletin master and last week’s slide text.

## Facilitator notes

- **Timing:** 5 minutes for the idea, 10 for the exercise, 5 for the mistake and the habit.
- **What’s in the sample files:**
  - `bulletin-master.md` is the only source. `old-slides.md` is last week’s Easter deck, pasted only to show the layout.
  - The old slides have Hymn 302 as the opening hymn. The master has Hymn 138, so a slide built on the old deck can keep the wrong number.
  - The old slides put youth group in the Youth Room. This week the master moves it to Fellowship Hall.
  - The master says the second service moves to 10:45 starting April 19, not this Sunday. A short slide can drop the start date.
  - Hymn numbers in both files are invented and match no real hymnal. The files use hymn titles only, never lyrics.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. It has last week’s hymn number, last week’s room, a time change with its start date dropped, and an invented “Lunch provided” in the website post.
- **Lyrics:** if someone asks about putting lyrics on slides, say that depends on the church’s own licensing and is outside this topic.
