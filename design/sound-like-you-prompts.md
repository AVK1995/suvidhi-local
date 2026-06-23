# Suvidhi — "Does this sound like you?" · GPT Image 2 Prompt Pack (§D)

8 square illustrations — one per pain-point in the **"Does this sound like you?"** section
([SoundLikeYou.tsx](../src/components/sections/SoundLikeYou.tsx)). This pack is a companion to the main
[gpt-image-prompts.md](./gpt-image-prompts.md); it reuses that file's brand system and the **same woman**
from Module 2.

---

## How to use (read first)

**The single most important rule for this set: every image is the SAME woman.** She is the customer
avatar already used on the Module-2 cover (`public/Module_Visualization_Images/Module_Mockup2.1.png`) —
an early-30s Indian mother, dark hair in a loose low bun with a few wispy strands, **no makeup**, soft
**blush-pink knit sweater** (loungewear), weary and real. Not a model.

**Recommended flow (chat UI, one conversation):**
1. If you're starting fresh, paste **§0 — Master Context** from [gpt-image-prompts.md](./gpt-image-prompts.md)
   once. (If you're continuing the chat where you made the module covers, it's already primed — skip.)
2. Save the reference woman: take `Module_Mockup2.1.png` and **save it as `ref-woman.png`**.
3. Paste **§D1**, attach `ref-woman.png`, generate.
4. **Then attach your finished §D1 render to §D2–§D8** (alongside `ref-woman.png`). Two references =
   the woman stays locked across all 8. Generate them in order.

**Why two references on D2–D8:** `ref-woman.png` fixes her *identity*; your D1 render fixes the *exact
crop, lighting and square framing* of this set, so the 8 thumbnails feel like one cohesive row.

### Format for this section
- **Square, 1024×1024** (the site slots are `aspect-square`, `rounded-[22px]`, shown 2-up on mobile /
  4-up on desktop — small thumbnails).
- **NO text in the image.** The caption is already printed below each image on the site, and small
  thumbnails make any baked-in text illegible/misspelled. Each prompt says "no text."
- **Intimate, waist-up / close framing** so she reads clearly at thumbnail size.
- Same blush-pink loungewear + same hair across all 8 for a unified row (vary only what the scene needs).

### Brand quick-reminder (already in §0, restated so each prompt stands alone)
Palette: rose `#CB4A5D`, deep burgundy `#963543`/`#5d2129`, soft blush `#ec9ea9`/`#f5c8ce`, cream
`#fdfaf8`/`#f7f1ee`, faint warm-gold glow (sparingly). Style: warm editorial photoreal, soft natural
window light, gentle shadows, documentary realism — **honest and weary, never glossy, never a smiling
stock model, never cold/clinical-blue.**

---

## §D — "Does this sound like you?" (8 squares)

> **Attach to EVERY prompt below:** `ref-woman.png`  ·  **plus, on D2–D8:** your finished **D1 render**.
> Open each with: *"Keep the SAME woman and exact style as the attached image(s) — same face, same loose
> bun, same blush-pink sweater, same no-makeup weary realism."*

### D1 — *"You're 3, 6, 12 or even 24 months postpartum and still feel exhausted."*
```
CONCEPT (the one feeling): it's been months — even years — and she is still bone-tired. Not a quick
yawn; a deep, settled exhaustion she's learned to live with.

A warm, intimate SQUARE editorial portrait, waist-up. The SAME real Indian mother in her early 30s from
the attached image — loose low bun with wispy strands, no makeup, soft blush-pink knit sweater. She sits
slumped on a cream sofa in soft daytime light, shoulders heavy, eyes half-closed and ringed with faint
tiredness, one hand resting limply in her lap. On the sofa beside her, a small, quiet cue of motherhood:
a folded muslin baby blanket and a tiny baby sock — signalling she IS a mother, months in, and still
running on empty. Honest documentary realism, NOT posed. Soft cream→blush light (#fdfaf8 → #f5c8ce),
faint warm-gold glow, gentle shadows. Mood: "I should have my energy back by now — and I don't."
AVOID: a smiling or glossy model, full makeup, an energetic/refreshed look, a crying-dramatic look, a
visible baby's face, any text or letters. Square, 1024×1024.
```
*Attach: `ref-woman.png`.* → save render as `sly-1-exhausted.png`

### D2 — *"Your hair is still shedding more than it should."*
```
CONCEPT: postpartum hair loss that won't stop — she notices it every day, and it quietly worries her.

A warm, intimate SQUARE portrait, waist-up. The SAME woman (attached). She sits or stands in soft light
holding a hairbrush in one hand that is clearly tangled with shed dark hair; a few loose strands rest on
her blush sweater and fingers. She looks down at the brush with quiet, tender concern — not panic. The
shed hair is the focal point; her face shows the worry. Keep her exact look from the attached image.
Soft cream→blush tones (#fdfaf8 → #f5c8ce), faint gold glow, gentle shadows, documentary realism.
Mood: "this still isn't normal." AVOID: a glamorous haircare-ad look, a smiling model, gore/excess, a
cluttered bathroom, any text or letters. Square, 1024×1024.
```
*Attach: `ref-woman.png` + your D1 render.* → `sly-2-hair-shedding.png`

### D3 — *"Your doctor says your reports are 'normal', but you don't feel normal."*
```
CONCEPT: the paperwork clears her, her body disagrees. The gap between a clean report and how she
actually feels.

A warm, intimate SQUARE portrait, waist-up. The SAME woman (attached) sits at a table holding a single
cream medical report card — plain rows that look fine, with a small green check mark (✓) as the only mark
on it (no readable words). She isn't reading it triumphantly; she gazes past it, brow softly furrowed,
unconvinced and weary, her other hand at her temple. The contrast between the "fine" paper and her tired,
doubtful face is the whole image. Soft cream→blush light (#fdfaf8 → #f5c8ce), faint gold glow, gentle
shadows, documentary realism. Mood: "on paper I'm fine — so why do I feel like this?"
AVOID: readable text or paragraphs (only the small ✓), a relieved/happy look, a clinical-blue hospital
feel, a doctor in frame, clutter. Square, 1024×1024.
```
*Attach: `ref-woman.png` + your D1 render.* → `sly-3-reports-normal.png`

### D4 — *"You're struggling with brain fog and poor focus."*
```
CONCEPT: a soft mental fog — thoughts won't come into focus, attention slips.

A warm, intimate SQUARE portrait, waist-up. The SAME woman (attached) sits trying to focus — a phone or
an open notebook loosely in hand — but her gaze drifts, unfocused and far away, fingertips pressed lightly
to her temple/forehead. Render a subtle, dreamy SOFT HAZE / gentle blur drifting around her head and the
upper edges of the frame, while she stays the clear anchor — visualising the fog without any words or
icons. Soft cream→blush tones (#fdfaf8 → #f5c8ce), faint warm-gold glow, gentle shadows, documentary
realism. Mood: "I can't think clearly anymore." AVOID: literal cartoon clouds/question-marks, any text or
letters, a sharp alert/confident look, a glossy model. Square, 1024×1024.
```
*Attach: `ref-woman.png` + your D1 render.* → `sly-4-brain-fog.png`

### D5 — *"You hit a wall every afternoon and rely on caffeine to get through the day."*
```
CONCEPT: the 4 PM crash — she's running on coffee just to make it to evening.

A warm, intimate SQUARE portrait, waist-up. The SAME woman (attached) at a kitchen or dining table in
warm LATE-AFTERNOON light, mid energy-crash: one elbow on the table, head propped on her hand, eyes
heavy. She clutches a warm coffee mug close with both-ish hands, like a lifeline; one already-empty cup
sits nearby to show she's leaning on caffeine. Drained, a little defeated. Keep her exact look from the
attached image. Warm cream→blush tones (#fdfaf8 → #ec9ea9), low golden afternoon glow, gentle shadows,
documentary realism. Mood: "I can't get through the day without this." AVOID: a cosy/happy coffee-ad
vibe, a smiling model, a bright morning feel, any text or letters. Square, 1024×1024.
```
*Attach: `ref-woman.png` + your D1 render.* → `sly-5-afternoon-caffeine.png`
*Note: this is the closest to the Module-2 reference scene — keep it but emphasise the coffee + the
afternoon light so it reads as the caffeine-crutch idea, not the meal scene.*

### D6 — *"You've tried supplements, diets and advice online, but nothing seems to create lasting change."*
```
CONCEPT: she's tried EVERYTHING — and still feels stuck. The volume of attempts vs the lack of results.

A warm SQUARE editorial scene, waist-up. The SAME woman (attached) sits at a table softly surrounded by
her many attempts: a few different supplement bottles, a diet/recipe book, a measuring tape, and her phone
showing a vague health article (no readable text). She rests her forehead on one hand, overwhelmed and
quietly defeated, looking at it all. The gentle clutter of products is intentional here — it conveys "I've
tried it all." Soft cream→blush tones (#fdfaf8 → #f5c8ce), faint gold glow, gentle shadows, documentary
realism. Mood: "nothing actually works." AVOID: readable text/labels, a hopeful/satisfied look, a tidy
glossy flat-lay, a smiling model. Square, 1024×1024.
```
*Attach: `ref-woman.png` + your D1 render.* → `sly-6-tried-everything.png`

### D7 — *"The weight came off in some places but the stubborn post-baby pouch hasn't budged."*
> **REVISED (v2).** The v1 render bared her midriff (lifted sweater) — the only skin-baring image in the
> set, which clashed tonally with the other 7 clothed portraits and looked more like a tender pregnancy
> shot than a "stubborn pouch" frustration. This v2 keeps her **fully clothed**, pressing the soft knit
> against her lower belly so the pouch reads *through* the fabric.
```
CONCEPT: the lower-belly "mummy pouch" that won't go no matter what — a tender, private frustration. The
weight came off her face and arms, but the soft lower tummy stays.

A warm, intimate, RESPECTFUL square portrait, waist-up — KEEP THE SAME WOMAN, style and palette as the
attached image(s): same face, loose low bun, no makeup, soft blush-pink loungewear. She stands by a bed
or dresser in soft natural light, FULLY CLOTHED, looking down at her midsection. Both hands gently press
the soft knit fabric flat against her lower belly so the rounded post-baby pouch shows clearly THROUGH
the clothing (no bare skin). Her expression is quietly disheartened and a little frustrated — kind to
herself, not ashamed. This is about how she FEELS about the stubborn pouch; the gesture and her downward
gaze make the lower belly the focal point. Soft cream→blush tones (#fdfaf8 → #f5c8ce), faint warm-gold
glow, gentle shadows, documentary realism. Mood: "everywhere else changed — except here."
AVOID: bare midriff / exposed skin / lingerie, lifting the top, a clinical weight-loss before/after vibe,
a flexing fitness model, any judgement or shame, any text. Square, 1024×1024.
```
*Attach: `ref-woman.png` + your **approved `does_this_sound_1.png`** (for the exact same-woman look).*
→ `sly-7-belly-pouch.png`

### D8 — *"Your mood feels flat, disconnected or unlike the person you used to be."*
> **REVISED (v2).** The v1 prompt told GPT to "drain colour/warmth from her while the world outside stays
> warm" — that desaturated her, cooled her side and blew out a bright window, so the render came out on a
> different (cooler, washed-out) colour grade than the rest of the set. **The flatness must come from her
> EXPRESSION, never from re-grading the image.** This v2 locks the same warm cream-and-rose grade as the
> other 7.
```
CONCEPT: not sad exactly — FLAT. Muted, distant, disconnected from the person she used to be. The
emptiness shows ONLY in her expression and stillness — the photo itself stays warm and on-palette.

A warm, intimate SQUARE portrait, waist-up — KEEP THE SAME WOMAN and, just as importantly, the SAME WARM
CREAM-AND-ROSE COLOUR GRADE / white balance as the attached images: same face, loose low bun, no makeup,
soft blush-pink loungewear. She sits in a softly, evenly lit warm room (cosy interior, like the attached
shots) and gazes off to the side with a quiet, hollow, faraway expression — physically present but
emotionally absent, the spark dimmed. Her flatness reads entirely from her face and her stillness.
MATCH the warmth, white balance and saturation of the attached set exactly — warm cream→blush tones
(#fdfaf8 → #f5c8ce), faint warm-gold glow, gentle shadows, documentary realism. Mood: "I don't feel like
myself anymore."
AVOID: a cool / grey / washed-out colour grade, a bright over-exposed window behind her, desaturated skin
or sweater, crying or dramatic grief, a cheerful or serene-happy look, a glossy model, any text. Square,
1024×1024.
```
*Attach: `ref-woman.png` + your approved **`does_this_sound_6.png`** (it carries the exact warm grade AND
the same woman — the best single reference for matching tone here).* → `sly-8-flat-mood.png`
*If a window must appear, keep it small, soft and warm — never a bright blown-out source that cools the grade.*

---

## Wiring map (for later)

Drop the 8 finished squares into a new folder and replace the `<Placeholder>` in
[SoundLikeYou.tsx](../src/components/sections/SoundLikeYou.tsx) (slots are `aspect-square`,
`rounded-[22px]`). Suggested order matches the `signs[]` array exactly:

| # | Sign (caption) | Suggested file |
|---|---|---|
| 1 | still feel exhausted | `public/Sound_Like_You_Images/sly-1-exhausted.png` |
| 2 | hair shedding | `public/Sound_Like_You_Images/sly-2-hair-shedding.png` |
| 3 | reports "normal" | `public/Sound_Like_You_Images/sly-3-reports-normal.png` |
| 4 | brain fog | `public/Sound_Like_You_Images/sly-4-brain-fog.png` |
| 5 | afternoon crash / caffeine | `public/Sound_Like_You_Images/sly-5-afternoon-caffeine.png` |
| 6 | tried everything | `public/Sound_Like_You_Images/sly-6-tried-everything.png` |
| 7 | stubborn pouch | `public/Sound_Like_You_Images/sly-7-belly-pouch.png` |
| 8 | flat mood | `public/Sound_Like_You_Images/sly-8-flat-mood.png` |

When you have the renders, hand them to me and I'll wire them in with `next/image` (fill + sizes +
object-cover, `bg-cream-dark`), same as the other sections — and confirm the paths are case-correct so
they don't 404 on Vercel.

## Workflow summary
1. Prime §0 once (or continue the same chat as the module covers).
2. Save `Module_Mockup2.1.png` → `ref-woman.png`.
3. §D1 (attach `ref-woman.png`) → then §D2–§D8 (attach `ref-woman.png` + your D1 render), in order.
4. If a render drifts: *"Keep the exact same woman, style and palette, but [one change]."*
5. No re-typesetting needed (these are text-free); just send me the 8 PNGs to wire in.
