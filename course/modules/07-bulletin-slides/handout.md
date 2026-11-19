# Bulletin and slide text from one source [CONFIRM]

By the end, you can write the bulletin once and reuse it for slides and the website.

**Practice files (all FAKE):** bulletin-master.md, old-slides.md.

## The four steps

1. Start with one master text: Sunday’s order of worship and announcements, checked against the calendar.
2. Paste the master into a new chat and ask for short slide text. If you paste an old deck, say it is for layout only.
3. Ask for a website post from the same master. Tell Claude to mark any detail not in the master [CONFIRM].
4. Compare every slide and the post with the master, line by line.

## Prompts to paste

Step 2, with the master and last week’s slides pasted below it:

```
Below is the master text for this Sunday's bulletin, then last week's slides. The master is the only source of facts. Use last week's slides for layout only, never for hymn numbers, times, dates or rooms. Write short slide text from the master: one slide per item in the order of worship, then one slide per announcement. Keep every hymn number, date, time and room exactly as the master gives it. Do not include song lyrics.
```

Step 3:

```
Now write a short post for our church website from the same master: this Sunday's service times and the announcements. Do not add any detail that is not in the master. If something seems to be missing, write [CONFIRM] in its place and list it at the end.
```

Step 4 is yours. Put the master beside the slides and the post, and tick each line that matches.

## One-source check

- [ ] Every slide matches a line in the master.
- [ ] Every hymn number, date, time and room is this week’s, not last week’s.
- [ ] Shortening kept what matters: start dates, times and rooms.
- [ ] The website post adds nothing that is not in the master.
- [ ] Anything not in the master is deleted or marked [CONFIRM].
- [ ] Every [CONFIRM] is answered by a person before Sunday.

Public worship and announcement text only. Keep prayer requests, health details and children’s names off slides and the website.
