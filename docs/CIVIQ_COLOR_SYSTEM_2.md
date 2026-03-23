# CIVIQ — Color System
> Locked and final. Session 4 — updated with Linear-inspired minimal philosophy.
> Accent changed from Cyan #00C8E0 → Periwinkle Indigo #5E6AD2
> Full light mode + dark mode defined for every component.

---

## The Core Philosophy

```
90%  Gray scale       — backgrounds, borders, text, dividers
 7%  Accent (#5E6AD2) — primary buttons, active states, links, key numbers
 3%  Status colors    — ONLY when communicating a specific meaning

Color is not decoration. It is information.
If removing a color doesn't lose meaning — remove it.
```

This is why Linear, Railway and Vercel feel calm and minimal.
Not because they use boring colors — because they use color with discipline.

---

## The Three Rules

```
Rule 1 — One accent per screen maximum
         #5E6AD2 appears on the most important interactive element only.
         If everything is accented, nothing is.

Rule 2 — Status colors only for status
         Green = approved/done. Red = error/clash. Amber = pending/warning.
         Never use these for decoration, branding, or emphasis.

Rule 3 — No color for structure
         Borders, cards, sidebar, navbar — all gray only.
         Structure is felt through spacing and weight, not color.
```

---

## 1. Accent Colors
> The only "CIVIQ" color in the UI. Used sparingly — one dominant use per screen.

### Light Mode
```
Accent          #5E6AD2    Primary buttons · active nav · links · key numbers
Accent Hover    #4A56C1    Hover state on accent buttons and links
Accent Tint     #ECEEFE    Badge bg · selected row bg · focus ring tint
Accent Text     #3D4DB8    Text sitting on accent-tint background
```

### Dark Mode
```
Accent          #5E6AD2    Same — accent is identical in both modes (Linear rule)
Accent Hover    #6E7ADE    Slightly lighter in dark for visibility
Accent Tint     #1E2260    Badge bg · selected row bg in dark
Accent Text     #9BA3F0    Text sitting on dark accent-tint background
```

---

## 2. Gray Scale — Light Mode
> The foundation. 90% of every screen is built from these values only.

```
bg-base         #FAFAFA    Page background — not pure white
bg-subtle       #F4F4F5    Sidebar · alternate section bg
bg-surface      #FFFFFF    Cards · modals · dropdowns — pop above page
bg-elevated     #F0F0F1    Hover state on list rows · subtle inset

border-default  #E4E4E7    Card borders · input borders · dividers
border-strong   #D4D4D8    Hover borders · stronger separators

text-primary    #09090B    Headings · labels · near black — not pure #000
text-body       #3F3F46    Body text · paragraph content
text-muted      #71717A    Secondary text · captions · hints
text-placeholder #A1A1AA   Input placeholder text
text-disabled   #D4D4D8    Disabled text and icons
```

## 2. Gray Scale — Dark Mode
```
bg-base         #141414    Page background — not pure black
bg-subtle       #1C1C1F    Sidebar · alternate section bg
bg-surface      #232326    Cards · modals · dropdowns
bg-elevated     #2A2A2D    Hover state on list rows

border-default  #27272A    Card borders · input borders · dividers
border-strong   #3F3F46    Hover borders · stronger separators

text-primary    #FAFAFA    Headings · labels · near white — not pure #FFF
text-body       #A1A1AA    Body text
text-muted      #71717A    Secondary text · captions (same as light)
text-placeholder #52525B   Input placeholder
text-disabled   #3F3F46    Disabled text and icons
```

---

## 3. Status Colors
> Used ONLY when communicating meaning. Never for decoration.
> Core status colors are identical in light and dark. Only tint backgrounds change.

### Core (same in both modes)
```
Success         #16A34A    Approved · completed · resolved
Danger          #DC2626    Clash · error · rejected · critical
Warning         #D97706    Pending · caution · awaiting action
Info            #2563EB    Notifications · informational
```

### Tints — Light Mode
```
Success Tint    #DCFCE7    Badge bg · success alert bg
Danger Tint     #FEE2E2    Badge bg · danger alert bg
Warning Tint    #FEF3C7    Badge bg · warning alert bg
Info Tint       #DBEAFE    Badge bg · info alert bg
```

### Tints — Dark Mode
```
Success Tint    #052E16    Badge bg · success alert bg
Danger Tint     #2D0A0A    Badge bg · danger alert bg
Warning Tint    #2D1A00    Badge bg · warning alert bg
Info Tint       #0A1628    Badge bg · info alert bg
```

---

## 4. Brand Colors
> Used only on logo and citizen website footer. Never inside dashboard UI.

```
Brand Navy      #0D2145    Logo · citizen footer bg · citizen CTA button
Brand Navy Dark #091830    Hover on navy elements
```

---

## 5. Project Type Colors
> Used ONLY on map polygons. Never in UI components, badges, buttons, or cards.

```
Road            #EA580C    PWD — road repair, resurfacing, reconstruction
Water           #2563EB    Jal Nigam — pipeline, water supply
Electricity     #CA8A04    PVVNL — electrical lines, substations
Sewage          #7C3AED    Sewage department — drainage, sewer lines
Parks           #16A34A    Parks department — plantation, beautification
Other           #71717A    Any other department or project type
Clash Zone      #DC2626    Clash overlay — pulsing animation on map
```

---

## 6. CSS Variables — Ready to Paste

### index.css

```css
:root {
  /* Accent */
  --accent:             #5E6AD2;
  --accent-hover:       #4A56C1;
  --accent-tint:        #ECEEFE;
  --accent-text:        #3D4DB8;

  /* Backgrounds */
  --bg-base:            #FAFAFA;
  --bg-subtle:          #F4F4F5;
  --bg-surface:         #FFFFFF;
  --bg-elevated:        #F0F0F1;

  /* Borders */
  --border-default:     #E4E4E7;
  --border-strong:      #D4D4D8;

  /* Text */
  --text-primary:       #09090B;
  --text-body:          #3F3F46;
  --text-muted:         #71717A;
  --text-placeholder:   #A1A1AA;
  --text-disabled:      #D4D4D8;

  /* Status */
  --success:            #16A34A;
  --success-tint:       #DCFCE7;
  --danger:             #DC2626;
  --danger-tint:        #FEE2E2;
  --warning:            #D97706;
  --warning-tint:       #FEF3C7;
  --info:               #2563EB;
  --info-tint:          #DBEAFE;

  /* Brand */
  --brand-navy:         #0D2145;
  --brand-navy-dark:    #091830;

  /* Shadows */
  --shadow-sm:          0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:          0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg:          0 8px 24px rgba(0,0,0,0.10);
}

.dark {
  /* Accent */
  --accent:             #5E6AD2;
  --accent-hover:       #6E7ADE;
  --accent-tint:        #1E2260;
  --accent-text:        #9BA3F0;

  /* Backgrounds */
  --bg-base:            #141414;
  --bg-subtle:          #1C1C1F;
  --bg-surface:         #232326;
  --bg-elevated:        #2A2A2D;

  /* Borders */
  --border-default:     #27272A;
  --border-strong:      #3F3F46;

  /* Text */
  --text-primary:       #FAFAFA;
  --text-body:          #A1A1AA;
  --text-muted:         #71717A;
  --text-placeholder:   #52525B;
  --text-disabled:      #3F3F46;

  /* Status tints only change in dark */
  --success-tint:       #052E16;
  --danger-tint:        #2D0A0A;
  --warning-tint:       #2D1A00;
  --info-tint:          #0A1628;

  /* Shadows */
  --shadow-sm:          0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.20);
  --shadow-md:          0 4px 12px rgba(0,0,0,0.30);
  --shadow-lg:          0 8px 24px rgba(0,0,0,0.40);
}
```

### tailwind.config.js — extend colors

```js
theme: {
  extend: {
    colors: {
      accent: {
        DEFAULT:  'var(--accent)',
        hover:    'var(--accent-hover)',
        tint:     'var(--accent-tint)',
        text:     'var(--accent-text)',
      },
      bg: {
        base:     'var(--bg-base)',
        subtle:   'var(--bg-subtle)',
        surface:  'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
      },
      border: {
        default:  'var(--border-default)',
        strong:   'var(--border-strong)',
      },
      text: {
        primary:      'var(--text-primary)',
        body:         'var(--text-body)',
        muted:        'var(--text-muted)',
        placeholder:  'var(--text-placeholder)',
        disabled:     'var(--text-disabled)',
      },
      success: {
        DEFAULT: 'var(--success)',
        tint:    'var(--success-tint)',
      },
      danger: {
        DEFAULT: 'var(--danger)',
        tint:    'var(--danger-tint)',
      },
      warning: {
        DEFAULT: 'var(--warning)',
        tint:    'var(--warning-tint)',
      },
      info: {
        DEFAULT: 'var(--info)',
        tint:    'var(--info-tint)',
      },
      brand: {
        navy:      'var(--brand-navy)',
        'navy-dark': 'var(--brand-navy-dark)',
      },
    },
  },
}
```

---

## 7. Component Color Rules

### Buttons
```
PRIMARY BUTTON
  Light:  bg #5E6AD2 · text #FFFFFF · hover bg #4A56C1
  Dark:   bg #5E6AD2 · text #FFFFFF · hover bg #6E7ADE
  Use:    One per screen — most important action only

SECONDARY BUTTON
  Light:  bg #FFFFFF · text #09090B · border #E4E4E7 · hover bg #F4F4F5
  Dark:   bg #232326 · text #FAFAFA · border #27272A · hover bg #2A2A2D
  Use:    Supporting actions — cancel, back, view

GHOST BUTTON
  Light:  bg transparent · text #3F3F46 · hover bg #F4F4F5
  Dark:   bg transparent · text #A1A1AA · hover bg #1C1C1F
  Use:    Tertiary actions — least important

DESTRUCTIVE BUTTON
  Light:  bg #DC2626 · text #FFFFFF · hover bg #B91C1C
  Dark:   bg #DC2626 · text #FFFFFF · hover bg #B91C1C
  Use:    Delete · reject · irreversible actions only

TINTED BUTTON (soft accent)
  Light:  bg #ECEEFE · text #5E6AD2 · hover bg #DDE0FC
  Dark:   bg #1E2260 · text #9BA3F0 · hover bg #252870
  Use:    Soft accent action — view on map, assign etc

DISABLED STATE (all types)
  Light:  bg #F4F4F5 · text #A1A1AA · border #E4E4E7 · cursor not-allowed
  Dark:   bg #1C1C1F · text #52525B · border #27272A · cursor not-allowed
```

### Badges / Status Pills
```
APPROVED / SUCCESS
  Light:  bg #DCFCE7 · text #15803D
  Dark:   bg #052E16 · text #4ADE80

PENDING / WARNING
  Light:  bg #FEF3C7 · text #B45309
  Dark:   bg #2D1A00 · text #FCD34D

REJECTED / CLASH / DANGER
  Light:  bg #FEE2E2 · text #B91C1C
  Dark:   bg #2D0A0A · text #FCA5A5

ONGOING / INFO
  Light:  bg #DBEAFE · text #1D4ED8
  Dark:   bg #0A1628 · text #93C5FD

COMPLETED / NEUTRAL
  Light:  bg #F4F4F5 · text #71717A
  Dark:   bg #1C1C1F · text #71717A

ACTIVE (accent)
  Light:  bg #ECEEFE · text #5E6AD2
  Dark:   bg #1E2260 · text #9BA3F0
```

### Project Type Badges (list cards only — NOT map)
```
Road
  Light:  bg #FFF0E8 · text #C2410C
  Dark:   bg #2D1000 · text #FB923C

Water
  Light:  bg #DBEAFE · text #1D4ED8
  Dark:   bg #0A1628 · text #93C5FD

Electricity
  Light:  bg #FEFCE8 · text #A16207
  Dark:   bg #1C1400 · text #FDE047

Sewage
  Light:  bg #F5F3FF · text #6D28D9
  Dark:   bg #1A0D3D · text #C4B5FD

Parks
  Light:  bg #DCFCE7 · text #15803D
  Dark:   bg #052E16 · text #4ADE80

Other
  Light:  bg #F4F4F5 · text #71717A
  Dark:   bg #1C1C1F · text #71717A
```

### Input Fields
```
DEFAULT
  Light:  bg #FFFFFF · border #E4E4E7 · text #09090B · placeholder #A1A1AA
  Dark:   bg #232326 · border #27272A · text #FAFAFA · placeholder #52525B

HOVER
  Light:  border #D4D4D8
  Dark:   border #3F3F46

FOCUS
  Light:  border #5E6AD2 · ring rgba(94,106,210,0.15) 3px
  Dark:   border #5E6AD2 · ring rgba(94,106,210,0.25) 3px

ERROR
  Light:  border #DC2626 · ring rgba(220,38,38,0.15) 3px
  Dark:   border #DC2626 · ring rgba(220,38,38,0.25) 3px

DISABLED
  Light:  bg #F4F4F5 · border #E4E4E7 · text #A1A1AA · cursor not-allowed
  Dark:   bg #1C1C1F · border #27272A · text #52525B · cursor not-allowed
```

### Cards
```
DEFAULT CARD
  Light:  bg #FFFFFF · border #E4E4E7 · radius 8px
  Dark:   bg #232326 · border #27272A · radius 8px
  Rule:   No shadow. Border only.

HOVER STATE (clickable cards)
  Light:  border #D4D4D8 · bg #FAFAFA
  Dark:   border #3F3F46 · bg #2A2A2D

SELECTED / ACTIVE CARD
  Light:  border #5E6AD2 · bg #FAFAFA
  Dark:   border #5E6AD2 · bg #1C1C1F

DANGER CARD (clash alerts)
  Light:  border #DC2626 · bg #FFF5F5
  Dark:   border #DC2626 · bg #1A0A0A
```

### Sidebar Navigation
```
SIDEBAR BACKGROUND
  Light:  #F4F4F5
  Dark:   #1C1C1F

NAV ITEM — DEFAULT
  Light:  bg transparent · text #71717A
  Dark:   bg transparent · text #71717A

NAV ITEM — HOVER
  Light:  bg #E4E4E7 · text #09090B
  Dark:   bg #27272A · text #FAFAFA

NAV ITEM — ACTIVE
  Light:  bg #ECEEFE · text #5E6AD2 · left border 2px #5E6AD2
  Dark:   bg #1E2260 · text #9BA3F0 · left border 2px #5E6AD2

SECTION LABEL
  Light:  #A1A1AA · 11px · uppercase · +0.08em tracking
  Dark:   #52525B · 11px · uppercase · +0.08em tracking

DIVIDER
  Light:  #E4E4E7
  Dark:   #27272A
```

### Navbar / Top Bar
```
BACKGROUND
  Light:  #FFFFFF · border-bottom #E4E4E7
  Dark:   #141414 · border-bottom #27272A

PAGE TITLE
  Light:  #09090B · 16px · weight 600
  Dark:   #FAFAFA · 16px · weight 600

ICON BUTTONS
  Light:  icon #71717A · hover bg #F4F4F5 · hover icon #09090B
  Dark:   icon #71717A · hover bg #1C1C1F · hover icon #FAFAFA

NOTIFICATION BADGE
  Both:   bg #DC2626 · text #FFFFFF
```

### Stat Cards
```
CARD BACKGROUND
  Light:  bg #F4F4F5 · radius 8px · no border
  Dark:   bg #1C1C1F · radius 8px · no border

LABEL
  Both:   #71717A · 12px · 400

VALUE — NEUTRAL
  Light:  #09090B · 24px · 600
  Dark:   #FAFAFA · 24px · 600

VALUE — ACCENTED (key metric)
  Both:   #5E6AD2 · 24px · 600

VALUE — DANGER (clashes)
  Both:   #DC2626 · 24px · 600

TREND UP / DOWN
  Up:     #16A34A
  Down:   #DC2626
```

### Progress Bar
```
TRACK
  Light:  #E4E4E7
  Dark:   #27272A

FILL — IN PROGRESS
  Both:   #5E6AD2

FILL — COMPLETE (100%)
  Both:   #16A34A

FILL — OVERDUE
  Both:   #DC2626
```

### MCDM Score Bar
```
TRACK
  Light:  #E4E4E7
  Dark:   #27272A

HIGH (70–100)    #16A34A
MEDIUM (40–69)   #D97706
LOW (0–39)       #DC2626
```

### Toast Notifications
```
SUCCESS
  Light:  bg #DCFCE7 · left border 3px #16A34A · text #09090B
  Dark:   bg #052E16 · left border 3px #16A34A · text #FAFAFA

ERROR
  Light:  bg #FEE2E2 · left border 3px #DC2626 · text #09090B
  Dark:   bg #2D0A0A · left border 3px #DC2626 · text #FAFAFA

WARNING
  Light:  bg #FEF3C7 · left border 3px #D97706 · text #09090B
  Dark:   bg #2D1A00 · left border 3px #D97706 · text #FAFAFA

INFO
  Light:  bg #DBEAFE · left border 3px #2563EB · text #09090B
  Dark:   bg #0A1628 · left border 3px #2563EB · text #FAFAFA
```

### Modal / Drawer
```
OVERLAY
  Light:  rgba(0,0,0,0.40)
  Dark:   rgba(0,0,0,0.60)

BACKGROUND
  Light:  #FFFFFF · border #E4E4E7
  Dark:   #232326 · border #27272A

HEADER BORDER
  Light:  #E4E4E7
  Dark:   #27272A
```

### Dropdown / Popover
```
BACKGROUND
  Light:  #FFFFFF · border #E4E4E7
  Dark:   #232326 · border #27272A

ITEM — DEFAULT
  Light:  text #3F3F46 · bg transparent
  Dark:   text #A1A1AA · bg transparent

ITEM — HOVER
  Light:  text #09090B · bg #F4F4F5
  Dark:   text #FAFAFA · bg #2A2A2D

ITEM — SELECTED
  Light:  text #5E6AD2 · bg #ECEEFE
  Dark:   text #9BA3F0 · bg #1E2260

ITEM — DANGER
  Light:  text #DC2626 · hover bg #FEE2E2
  Dark:   text #FCA5A5 · hover bg #2D0A0A

DIVIDER
  Light:  #E4E4E7
  Dark:   #27272A
```

### Avatar
```
INITIALS FALLBACK
  Light:  bg #ECEEFE · text #5E6AD2
  Dark:   bg #1E2260 · text #9BA3F0

ONLINE DOT
  Both:   #16A34A

STACKED BORDER
  Light:  #FFFFFF
  Dark:   #232326
```

### Toggle / Switch
```
OFF
  Light:  bg #E4E4E7 · thumb #FFFFFF
  Dark:   bg #27272A · thumb #A1A1AA

ON
  Both:   bg #5E6AD2 · thumb #FFFFFF

DISABLED
  Light:  bg #F4F4F5 · thumb #D4D4D8
  Dark:   bg #1C1C1F · thumb #3F3F46
```

### Table
```
HEADER ROW
  Light:  bg #F4F4F5 · text #71717A · border-bottom #E4E4E7
  Dark:   bg #1C1C1F · text #71717A · border-bottom #27272A

BODY ROW — DEFAULT
  Light:  bg #FFFFFF · text #3F3F46 · border-bottom #E4E4E7
  Dark:   bg #141414 · text #A1A1AA · border-bottom #27272A

BODY ROW — HOVER
  Light:  bg #FAFAFA
  Dark:   bg #1C1C1F

BODY ROW — SELECTED
  Light:  bg #ECEEFE · border-left 2px #5E6AD2
  Dark:   bg #1E2260 · border-left 2px #5E6AD2
```

### Tabs
```
DEFAULT
  Light:  text #71717A · border-bottom 2px transparent
  Dark:   text #71717A · border-bottom 2px transparent

HOVER
  Light:  text #09090B
  Dark:   text #FAFAFA

ACTIVE
  Light:  text #5E6AD2 · border-bottom 2px #5E6AD2
  Dark:   text #9BA3F0 · border-bottom 2px #5E6AD2

TAB BAR BORDER
  Light:  #E4E4E7
  Dark:   #27272A
```

---

## 8. Screen Context Rules

### Dashboard Shell (Admin / Officer / Supervisor)
```
Page bg:          var(--bg-base)
Sidebar bg:       var(--bg-subtle)
Navbar bg:        var(--bg-surface)  +  border-bottom var(--border-default)
Content area:     var(--bg-base)
Card bg:          var(--bg-surface)
Card border:      var(--border-default)
```

### Citizen Website (Light Mode ONLY — never dark)
```
Page bg:          #FFFFFF
Section alt bg:   #F4F4F5
Card bg:          #FFFFFF · border #E4E4E7
Header:           #FFFFFF · border-bottom #E4E4E7
Footer:           #0D2145 · text #FFFFFF
CTA button:       bg #5E6AD2 · text #FFFFFF
Secondary button: bg #F4F4F5 · text #09090B
Link:             #5E6AD2
Input border:     #E4E4E7 · focus #5E6AD2
```

---

## 9. Map Colors
```
Base tiles:             CartoDB Positron (light gray)
Project polygon fill:   Type color at 25% opacity
Project polygon stroke: Type color at 100% · 1.5px
Clash zone fill:        #DC2626 at 15% opacity
Clash zone stroke:      #DC2626 · 2px · pulsing animation
Selected polygon:       stroke #5E6AD2 · 2px
Hovered polygon:        fill opacity → 45%
Location pin (citizen): #5E6AD2
Complaint pin:          #DC2626
Facility marker:        #D97706
```

---

## 10. Typography Colors
```
H1 Page title:        var(--text-primary)     24px · 600
H2 Section heading:   var(--text-primary)     20px · 600
H3 Card title:        var(--text-primary)     16px · 500
H4 Sub-section:       var(--text-body)        14px · 500
Body large:           var(--text-body)        15px · 400
Body default:         var(--text-body)        14px · 400
Label (uppercase):    var(--text-muted)       12px · 500 · +0.06em
Caption:              var(--text-muted)       12px · 400
Placeholder:          var(--text-placeholder) 13px · 400
Link:                 var(--accent)           underline on hover
Disabled:             var(--text-disabled)    400
```

---

## 11. What Is Not Allowed

```
✗ No gradients anywhere in the UI
✗ No drop shadows on cards — use border only
✗ No colored backgrounds for decoration
✗ No using accent on more than one primary action per screen
✗ No using project type colors outside the map
✗ No using status colors for non-status purposes
✗ No custom colors outside this palette
✗ No pure #000000 or #FFFFFF for text or backgrounds
✗ No opacity tricks to invent new colors
   (only exception: map polygon fills at defined opacity)
✗ Citizen website is light mode only — never dark
```

---

## 12. Quick Reference

```
ACCENT:
  Default   #5E6AD2     Hover (L)  #4A56C1     Hover (D)  #6E7ADE
  Tint (L)  #ECEEFE     Tint (D)   #1E2260

GRAYS — LIGHT:
  Page      #FAFAFA     Sidebar    #F4F4F5     Card       #FFFFFF
  Border    #E4E4E7     Body       #3F3F46     Muted      #71717A
  Primary   #09090B

GRAYS — DARK:
  Page      #141414     Sidebar    #1C1C1F     Card       #232326
  Border    #27272A     Body       #A1A1AA     Muted      #71717A
  Primary   #FAFAFA

STATUS (same in both modes):
  Success   #16A34A     Danger     #DC2626
  Warning   #D97706     Info       #2563EB

BRAND:
  Navy      #0D2145     (logo + citizen footer only)

MAP TYPES:
  Road      #EA580C     Water      #2563EB
  Elec      #CA8A04     Sewage     #7C3AED
  Parks     #16A34A     Other      #71717A
  Clash     #DC2626
```

---

*Color system locked. Session 4.*
*Accent: #5E6AD2 — Linear periwinkle indigo.*
*Philosophy: 90% gray · 7% accent · 3% status.*
*When in doubt — make it gray.*
