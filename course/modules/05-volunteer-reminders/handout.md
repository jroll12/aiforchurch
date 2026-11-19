# Volunteer schedules and reminder emails [CONFIRM]

By the end, you can draft a month of reminders from a sign-up sheet.

**Practice files (all FAKE):** reminder-guide.md, signup-sheet.csv, swap-email.md, from [FILES LINK].

**Do every step in the same chat.** Later prompts refer back to earlier ones.

## The four steps

1. Open a new chat. Paste the guide, the sheet and the swap email.
2. Ask for a reminder list and a short personal email for each filled slot.
3. Tell Claude to check the swap, mark the empty slot [CONFIRM] without filling it, and write the emails again.
4. Check every row of the list yourself, as below.

## Prompts to paste

Step 1, with the guide, the sheet and the email pasted below it:

```
You help write volunteer reminder emails for our church. Below are our reminder guide, the volunteer sign-up sheet for April, and a later email about a swap. Every name, date, role and email address must come from the sheet or the email. Never add a name that is not there.
```

Step 2:

```
Make a reminder list: one row for every Sunday and role on the sheet, with the name, the email address and the date to send the reminder. Then write a short personal reminder email for each row that has a name, following the guide.
```

Step 3:

```
Check the list against the sheet and the swap email again. Each person in a swap should be on the Sunday they took, not the one they gave up. If the list already shows that, leave it as it is. If a slot on the sheet has no name, do not fill it in and do not write an email for it. Mark it [CONFIRM] to recruit someone, and list it under the table. Then write every reminder email again to match the list.
```

Step 4 is yours. Find each row’s name, date and role on the sheet. The later swap email wins over the sheet: a row that still shows the sheet’s old name for a swapped Sunday is a mismatch: fix it. Make sure the empty slot has no email.

## Name-to-slot check

- [ ] Every reminder matches the sheet after any swap from a later email: same name, email address, date and role.
- [ ] Every swap puts each person on the Sunday they took, not the one they gave up.
- [ ] Every empty slot has no reminder and is marked [CONFIRM] to recruit someone.

Practice with the FAKE sheet only, and bring no real names or email addresses. Keep children’s names and family details out of reminders, including nursery reminders.
