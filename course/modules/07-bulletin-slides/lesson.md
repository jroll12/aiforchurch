---
topic: 7
slug: 07-bulletin-slides
title: Bulletin and slide text from one source [CONFIRM]
duration: About 20 minutes
outcome: By the end, you can write the bulletin once and reuse it for slides and the website.
status: draft
trap: samples/bulletin-master.md :: Opening hymn: Hymn 138
trap: samples/bulletin-master.md :: Starting Sunday, April 19, the second service moves from 10:30 a.m. to 10:45 a.m.
trap: samples/bulletin-master.md :: at 6:00 p.m. in Fellowship Hall
trap: samples/old-slides.md :: Hymn 302, Christ the Lord Is Risen Today
trap: samples/old-slides.md :: Youth Room
flaw: Hymn 302, Christ the Lord Is Risen Today
source: title and outcome from src/copy.ts; everything else drafted for approval
---

# Bulletin and slide text from one source [CONFIRM]

Topic 7 of 7. About 20 minutes.

By the end, you can write the bulletin once and reuse it for slides and the website.

## The idea, 5 minutes

The same news often gets typed three times: bulletin, slides, website. Each copy is a chance for a detail to change. Write one master text, let Claude make the shorter versions from it, then check each version against the master.

## The exercise

1. Start with one master text: Sunday’s order of worship and announcements. In class, use the sample.
2. Paste the master and last week’s slides into a new chat. Say the old slides are for layout only, and ask for short slide text in the same layout.
3. In the same chat, ask for a website post from the same master. Tell Claude to mark any detail not in the master [CONFIRM], not drop it silently.
4. Compare every slide and the post with the master, both ways: each hymn, date, time and room, and every item in the master. The master wins over last week’s slides.

## Watch for this

### A leftover detail.

Last week’s slides, pasted to show the layout, list “Hymn 302, Christ the Lord Is Risen Today” and youth group in the Youth Room. This week’s master says Hymn 138, “Holy, Holy, Holy”, and youth group in Fellowship Hall. It also says the second service moves to 10:45 a.m. starting April 19. A slide can keep last week’s hymn line or room, or drop “starting April 19” to save space. A whole announcement can also go missing.

## The habit

### One-source check.

The master is the only source, and it wins over last week’s slides. Check both ways. First, every detail on the slides and in the website post must be in the master: any detail that is not comes out or is marked [CONFIRM], and anything shortened must still say the same thing. Then, every item in the master must reach the slides, unless last week’s layout gives it no slide, and every announcement must reach the post. Anything missing goes back in, from the master. Last, read each hymn number, date, time and room against the master before Sunday.

## Data safety

Public worship and announcement text only. Keep prayer requests, health details and children’s names off slides and the website.

## Downloads

- [Handout (PDF)](handout.md): One page to print or keep.
- [Sample files, all labeled FAKE](samples/): This Sunday’s bulletin master and last week’s slide text.

## Facilitator notes

- **Timing:** 5 minutes for the idea, 10 for the exercise, 5 for the mistake and the habit. On phones this is tight. Following last week’s layout keeps the deck to nine slides. If the room is slow, check the slides in step 4 and check the post together on the screen.
- **What’s in the sample files:**
  - `bulletin-master.md` is the only source. `old-slides.md` is last week’s Easter deck. It is part of the practice: everyone pastes it in step 2, because a layout pasted from last week is where the leftover details come from.
  - Last week’s layout sets the slide list: a welcome slide with the service times, the opening hymn, scripture, sermon and hymn of response, then one slide per announcement. The prelude, call to worship, prayer of confession, offering, benediction and postlude get no slide, on purpose.
  - The old slides have “Hymn 302, Christ the Lord Is Risen Today” as the opening hymn. The master has Hymn 138, “Holy, Holy, Holy”, so a slide built on the old deck can keep last week’s whole line.
  - The old slides put youth group in the Youth Room. This week the master moves it to Fellowship Hall.
  - The master says the second service moves to 10:45 a.m. starting April 19, not this Sunday. A short slide can drop the start date.
  - Hymn numbers in both files are invented and match no real hymnal. The files use hymn titles only, never lyrics.
- **Expect to use the prepared draft.** The prompts steer Claude away from these mistakes, which is the point of teaching them, so Claude usually gets this right live. That is why `examples/flawed-draft.md` exists. Don’t weaken the prompts to make Claude fail.
- **If Claude gets it right live:** open `examples/flawed-draft.md` and ask the room to find what’s wrong. The answers are in `examples/answer-key.md`; keep that file off the screen. In short: last week’s hymn line, last week’s room, a time change with its start date dropped, no slide for office hours, and an invented “Lunch provided” in the website post.
- **Lyrics:** if someone asks about putting lyrics on slides, say that lyrics need your church’s song license, and that licensing is outside this topic.
