
<div align="center">The Joan/e Archive — Repo Rebuild Files
What you have
After your hard nuke and rebuild, here are the files you need. Everything is copy-paste ready.
File 1: index.html (your homepage)
What it does: This is your site's front door. It has:
Hero section with your 4 Laws
Contamination index / algorithmic warning
Open conflict box (1685 vs 1695 death date)
4-John Firewall table (Surgeon, Quidnessett, Newark, Stonewall)
4 Joan/e of the Region table (Beggarly, Quidnessett, Awashonks, Anashuecot)
Widget embed placeholder
Primary source index with Tier badges
How to use it:
Open 1_index.html in any text editor (Notepad, TextEdit, VS Code)
Copy the ENTIRE contents
Paste into your repo's index.html
Commit and push
To embed the widget: Find this line in index.html:
HTML
<div id="widget-mount" style="padding:20px;color:var(--text-tertiary);text-align:center;">
  [Widget loads here — paste contents of widget.html into this div, or load via iframe]
</div>
Replace everything inside that div with the contents of 2_widget.html (copy everything between the first <div class="joan-widget"> and the final </div>).
File 2: widget.html (the interactive map)
What it does: This is the interactive piece with 7 tabs:
Orbit convergence — Network graph with filter buttons (All, 1672, 1682, 1695, Contested)
Deed signers — Expandable groups for 1672, 1682, 1695 with every signer listed
John's children — 9 proven sons, 1 unresolved daughters entry
Where is Joan/e? — 11 places she should be but isn't, plus the Narragansett hypothesis
Context timeline — 15 events from 1638 to 1718, keyed to sources
The struggle — 6 traps we fell into and climbed out of (contamination index)
Primary sources — Full source index with Tier 1/2/4 badges
How to use it:
Option A (embed in index.html): Copy the widget code and paste into the #widget-mount div in index.html
Option B (standalone page): Create widget.html in your repo, paste the full code, link to it from index.html
Option C (iframe): Upload 2_widget.html to your repo, then in index.html replace the #widget-mount div with:
HTML
<iframe src="widget.html" style="width:100%;height:600px;border:none;border-radius:12px;"></iframe>
How to make changes (for non-coders)
Change text
Open the file in a text editor
Find the text you want to change (Ctrl+F or Cmd+F)
Edit between the HTML tags
Save and push
Add a new source
In 2_widget.html, find the const sources = [ array
Copy an existing entry and paste below it
Change the title, ref, type, access, and note fields
Save and push
Add a timeline event
In 2_widget.html, find the const timeline = [ array
Copy an existing entry and paste in chronological order
Change date, event, key (true/false), and source
Save and push
Change colors
The widget uses Kimi's design system tokens (dark mode). Don't change CSS variables unless you know what you're doing. The homepage (index.html) has its own CSS in a <style> block at the top.
Data sources for everything in these files
Everything comes from your Peer Review Packet v4.2 (March 2026). No La Mance. No circular genealogy. Every claim is either:
[VERIFIED] — Tier 1 primary source
[PROBABLE] — Convergence of Tier 1 + Tier 3 methodology
[UNCERTAIN] — Plausible but insufficiently supported
[PENDING] — Document not yet accessed in primary form
[INVALIDATED] — Directly contradicted by primary source
[TRADITION] — Genealogical tradition only, no primary source
Git workflow (simple)
bash
# After editing files
git add .
git commit -m "Rebuild: homepage + widget from packet v4.2"
git push origin main
Questions?
The archive is built on one principle: Joan/e Unknown until proven otherwise. If you find a primary source that changes anything, the site should change with it. That's the point.
