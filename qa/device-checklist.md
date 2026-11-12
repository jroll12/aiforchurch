# Device checklist: a 15-minute pass on real phones

The automated checks run in Chromium only. This pass covers what they cannot: Safari on iPhone and Mac, Chrome on Android, real touch, real print dialogs and VoiceOver. No hosting is needed.

## Set up (once)

1. On your laptop, in this repo: `npm ci`.
2. Start the site on your local network:

   ```
   npm run preview:lan
   ```

   It builds the site and prints two addresses. Use the **Network** one, for example `http://192.168.1.20:4321/`.
3. Put the phone on the same Wi-Fi as the laptop and open that address. If it does not load, your laptop's firewall may be blocking port 4321.

The pay and send buttons are greyed out on purpose: the payment links and form service are not set yet. Everything up to them works.

## The pass

Use made-up test data, never a real person's details. For example: Test Church, Test Person, test@example.com.

| # | Device and browser | Do this | Look for | Result (ok, or what you saw) |
| --- | --- | --- | --- | --- |
| 1 | iPhone, Safari | Open Home. Scroll to the bottom. Open and close two FAQ items. | Text never runs off the side. No sideways scrolling. The plus and minus icons swap. | |
| 2 | iPhone, Safari | Tap the menu button. Tap Workshop. | The menu opens below the header; the link opens Workshop details. | |
| 3 | iPhone, Safari | Go to Register. Tap Continue to review with nothing filled in. | Red messages under the seat choice, organization, contact and Attendee 1; the page jumps to the first one. | |
| 4 | iPhone, Safari | Choose Three seats. Fill organization, contact and one attendee (name, email, role). Tap Continue to review. | Review order opens with your test data, Three seats and the 3-seat price. | |
| 5 | iPhone, Safari | On Review, tap Edit under Your seats. Choose One seat. Continue again. | Register kept everything; Review now shows One seat and the one-seat price. | |
| 6 | iPhone, Safari | Check the role dropdown and the text boxes. | Square corners, readable text. The page does not zoom in when you tap a field. | |
| 7 | Android, Chrome | Repeat 1, 3 and 4. | Same results as on iPhone. | |
| 8 | Mac, Safari | Open For your board. Press Print this page, then look at the print preview. | One page. No menu, no buttons, no orange. The footer line about AI is there. | |
| 9 | iPhone, VoiceOver on | On Register, tap Continue with nothing filled in, then swipe through the page. | VoiceOver reads each error with its field ("Organization name, invalid data, Add your organization name."). | |
| 10 | Any phone | Open Confirmation by adding `confirmation/?payment=paid` after the address. | "You are in." and nothing else in the heading area. | |

## After the pass

- **To log a problem:** write what you saw in the Result column, with the phone model and iOS or Android version. Then commit this file or paste the rows into a session, and each one becomes a fix.
- **What it doesn't cover:** payment and the form service, which need their real accounts first.
- **Turning VoiceOver on and off:** Settings > Accessibility > VoiceOver. A triple-click of the side button can toggle it if you set that shortcut.
