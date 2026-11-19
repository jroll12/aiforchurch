# Bulletin and slide text from one source [CONFIRM]

By the end, you can write the bulletin once and reuse it for slides and the website.

**Practice files (all FAKE):** bulletin-master.md, old-slides.md, from [FILES LINK].

**Do every step in the same chat.** Later prompts refer back to earlier ones.

## The four steps

1. Start with one master text: Sunday’s order of worship and announcements.
2. Paste the master and last week’s slides into a new chat. Say the old slides are for layout only, and ask for short slide text in the same layout.
3. Ask for a website post from the same master. Tell Claude to mark any detail not in the master [CONFIRM], not drop it silently.
4. Compare every slide and the post with the master, both ways. The master wins over last week’s slides.

## Prompts to paste

Step 2, with the master and last week’s slides pasted below it:

```
Below is the master text for this Sunday's bulletin, then last week's slides. The master is the only source of facts. Use last week's slides for layout only, never for hymn numbers, hymn titles, times, dates or rooms. Write short slide text from the master in last week's layout: a welcome slide with the service times, one slide each for the opening hymn, scripture, sermon and hymn of response, then one slide per announcement. Keep every hymn number, date, time and room exactly as the master gives it. Do not include song lyrics.
```

Step 3:

```
Now write a short post for our church website from the same master I pasted above: this Sunday's service times and every announcement. Use the master's details exactly. Mark any detail that is not in the master [CONFIRM] and list it at the end, rather than dropping it silently.
```

Step 4 is yours. Put the master beside the slides and the post. Tick each line that matches, then tick each master item that reached the slides.

## One-source check

- [ ] Every hymn line on the slides is this week’s: number and title as the master gives them.
- [ ] Every date, time and room matches the master, not last week’s slides.
- [ ] Shortening kept every start date, such as “starting April 19” on the time change.
- [ ] Every item in the master has a slide, unless last week’s layout gave it none, and every announcement is in the post.
- [ ] The post adds nothing the master doesn’t say, and a person answers every [CONFIRM] before Sunday.

Public worship and announcement text only. Keep prayer requests, health details and children’s names off slides and the website.
