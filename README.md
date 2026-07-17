[README.md](https://github.com/user-attachments/files/30106445/README.md)
<div align="center">

# 🌿 The Joane Greene Archive
### *Digitize • Preserve • Reconstruct • Collaborate*

**One woman. One record. May 1682. Pawtuxet, RI.**

Joane Greene appears only once in the surviving English documentary record — a consent in a 1682 deed witnessed by **William Carpenter (non-Quaker speculator), John Wickes, and Samuel Gorton**. That single appearance is **PROVEN**, not probable.

This archive asks: *What world made that consent necessary? And how can digitization make her visible?*

🔗 **Live Site:** https://lemuwah.github.io/joan-lineage-theory/

</div>

---

## 🌿 Why Joane Greene — Not John Greene

Most Greene research centers the men who got land grants. This archive flips the lens:

- Joane's consent was legally required in 1682. Why?
- Colonial archives default to male grantees. Joane breaks that pattern.
- Centering Joane forces us to use Narragansett kinship logic, not English patrilineal trees.

> **Method:** The Envelope Method — We cannot invent more Joane records. We digitize everything *around* her moment to make her context undeniable.

## 📖 How To Read This Site (Restored — No JS Required)

### Evidence Key
- 🟢 **PROVEN** — Direct primary source located and transcribed
- 🔵 **PROBABLE** — Strong chain, one inferential link
- 🟡 **UNVERIFIED** — Claim exists, source not yet pulled
- 🔴 **NULL** — Searched and not found OR proven compilation layer. NULL is data.

### The Four Laws
1. **Law 1: Contradictions Are Held, Not Hidden** — If sources conflict, both displayed side-by-side.
2. **Law 2: Documentary Evidence Over Narrative** — One 1672 deed > 100 family trees.
3. **Law 3: No Premature Disqualification** — We don't dismiss Anashuecot as 'male' because a scribe wrote 'his marke' for 7 signers.
4. **Contamination Law: Compilation Layers Are Toxic** — alfredgibbs.com, WikiTree, Findagrave, Ancestry user trees = quarantined in `/contamination/`.

### Four-Agent System
- 🔭 **Explorer** — Finds every primary, even if it breaks theory
- ⚔️ **Hostile Reviewer** — Tries to destroy theory using colonial law & scribal practice
- 🧬 **Synthesizer** — Rebuilds kinship map after attack, holding contradictions
- 🏛️ **Archivist** — No citation = does not exist. Box.Folder.Page required.

---

## 🗂️ Repository Structure (Cleaned Up)

```
/index.html                 <- Joane-centric homepage (the app)
/sources/                   <- All primary sources, 600 DPI, IIIF
  /source_intake_queue.md
  /1672-anashuecot-deed/
  /1674-awawsunks-deed/
  /1682-joane-greene-consent/  <- HERO FOLDER
/theory/                    <- Analytical frameworks
/digitization/              <- Lab: how we digitize
/contamination/             <- Quarantined compilation layers
/notes/                     <- Name variants, scribe analysis
```

## 🧪 Digitization Lab — 8 Ways This Helps Joane

1. **High-Res Intake (600 DPI) + IIIF** — Every deed photographed, manifest auto-generated
2. **OCR Cleanup Pipeline** — Arnold transcriptions are OCR hell → TEI
3. **Georeference Quidnessett** — Pin 1672 bounds to modern GIS
4. **Scribe ID** — Is 'his marke' one scribe's tic? Build scribe DB 1672-1682
5. **Joane Center** — Every filter defaults to "How does this help Joane?"
6. **Kinship Graph, Not Tree** — Network, not patrilineal tree
7. **Contamination Detector** — Auto-flag WikiTree/Findagrave without primary anchor
8. **Negative Evidence Log** — NULL searches logged so others don't re-search

## 📌 Restored Critical Details (Your Audit Fixed)

- 1679 affidavit verbatim: "forty years and more..."
- Kettelle Papers: Box 2; RIHS Mss 1210, folders 12-13; NULL layer
- Pawtuxet 1682: PROVEN (was PROBABLE) + 3 witnesses restored
- 48 grantees + Bartlett partial search + pages 56-58 text-diff task
- Robert Greene tenant: 3 independent Fones Record deeds near Cocumscussoc
- 1694 probate rationale: map exact progeny, rule out cross-generational contamination
- 1685 deed: primary not yet pulled — high-priority
- 1908 Reunion: newspaper cutting source + 'Born Clarke' floating legend warning
- Named vectors: alfredgibbs.com, WikiTree, Findagrave
- Coginiquant: determine if 1, 2, or 3 individuals — do not default

## 🤝 How to Contribute

See `/digitization/CONTRIBUTING.md` — Best format: Box.Folder.Page + direct quote + 600 DPI scan + assessment of Joane impact.

---

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

**© 2026 The Joane Greene Archive** — Built with GitHub Pages
*This repo retains name joan-lineage-theory for link continuity. Scope is now The Joane Greene Archive.*

</div>
