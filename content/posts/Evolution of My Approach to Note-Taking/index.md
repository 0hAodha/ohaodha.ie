+++
title = 'Evolution of My Approach to Note-Taking'
date = 2024-06-24T20:02:57+01:00
draft = false
tags = ['academia', 'LaTeX', 'article', 'Vim']
+++

## First Year of University
In my first year of university, I took pen & paper notes, using a designated refill pad and binder per class.
Pages were stapled together by topic or chapter, and then inserted into a plastic pocket in the binder.
These notes were comprehensive, meaning that any information that was in the lecture slides or said by the lecturer was included in my notes.

This technique presented many difficulties: if the lecturer moved on to the next slide before I was finished writing, I would have to look at the copy of the lecture slides posted on 
Blackboard to complete my notes, meaning that I would either have to finish taking the notes on my own time after the lecture or have my 
laptop or phone with a copy of the lecture slides open in front of me in the lecture.
I typically opted for the latter, and had the lecture slides open on my laptop during the lecture and took notes from them at my own pace,
listening to the lecturer speak in the background.
In retrospect, this meant that I often wasn't paying as much attention to the lecture as I could've been, and I probably would have been 
as well off had I not attended the lecture and just reviewed the slides from home.

One of the key advantages of this approach however, was that it was quite good for getting the
information into my brain: the act of physically writing out each piece of information made 
recalling that information later much easier, and I generally didn't have to do very much revision — usually just at the end of the semester before exams.
This technique was so effective, in fact, that this remains my pre-exam study technique to this day;
I simply write out all the information on a topic repeatedly.

It goes without saying here that I did not have any sort of version control or backup system as all my notes were on paper, which horrifies me in retrospect.
Furthermore, for reasons I now cannot recall, I would delete all the files related to an assignment once I had submitted it (perhaps to free up
SSD space?) which is quite regrettable, as it means that the Git archive of all my university materials that I maintain will now be forever incomplete.

At this time I still used Microsoft Word documents for any assignment that required writing, but 
I did use $\LaTeX$ once for a mathematics group project (which was really my introduction to 
$\LaTeX$), using the online $\LaTeX$ editor [Overleaf](https://www.overleaf.com/).
For any sort of coding, I would use either the Microsoft IDE
[Visual Studio](https://visualstudio.microsoft.com/) (for C programming) or the Microsoft text 
editor [Visual Studio Code](https://code.visualstudio.com/) for everything else, such as web development in HTML & JavaScript.

I thankfully did have the good sense to digitally archive the lecture slides for each of my classes, but because I was still using
Windows as my laptop OS at the time and was unaware of CLI tools such as [`pdfgrep`](https://pdfgrep.org/) to quickly & recursively search through
PDF documents, I merged all the lecture slides for each class into one mega-document per class to facilitate easy browsing and searching.
This has the benefit of keeping everything neat and easily findable, but it was prone to me missing a set of slides and messing up the entire 
document or a lecturer updating the lecture slides and me having to re-merge the entire document again.

One of the most damning indictments of this system of note taking is that I simply never looked back over my handwritten notes, except perhaps 
for my mathematics classes.
They generally didn't add any value that wasn't in the lecture slides (as they were, for the most part, just copies of the slides) and had 
the additional disadvantage of not being searchable or indexable, and being cumbersome to carry around.

The notes I have from this academic year are far too voluminous for me to digitise, and so are just sitting in a box somewhere.
I never looked back on them at the time I was taking these classes, and probably never will.

Towards the end of first year, I did begin to experiment with some alternative, digital note-taking methods.
I used the flashcard application [Anki](https://apps.ankiweb.net/) to revise for a class quiz on Computing Systems, to great success, having
previously used Anki to study for my Leaving Certificate exams in secondary school.
I also began experimenting with various applications for note-taking, including Markdown-based applications such as 
[Obsidian](https://obsidian.md/), [Joplin](https://joplinapp.org/),
and even plaintext in [Vim](https://www.vim.org/) & [Helix](https://helix-editor.com/) as I started to become interested
in using CLI & TUI programs on my [Ubuntu GNU/Linux](https://ubuntu.com/) desktop, mostly just because 
I thought they looked cool, discovering their great utility & convenience only as a side-effect.

## Second Year of University 
### Semester 1
Before starting the first semester of my second year of university, I had decided that I'd had 
enough of using Windows on my laptop and decided to try something new with
[Manjaro GNU/Linux](https://manjaro.org/) as my primary operating system, having previously been 
using [Ubuntu GNU/Linux](https://ubuntu.com/) as my desktop operating system for some years.
With this change I also decided to try something new for my note-taking approach, and started 
using the Markdown-based notes application [Logseq](https://logseq.com/).
I ultimately decided on using Logseq because it was free & open source, had an easy to use &
pleasant UI, was capable of using $\LaTeX$ typesetting for equations, and had a handy flashcard feature wherein a section of a note could be turned into a flashcard with spaced repetition for
revision, not dissimilar to Anki.
It also allowed me to embed PDF documents in the Markdown file of a note and view it in a split
pane next to the note itself, which was handy for archiving & linking the lecture slides, and
the split view was very helpful since I was using the
[Gnome Desktop Environment](https://www.gnome.org/) and hadn't yet moved to a tiling window manager.

At the start of the semester, I very briefly experimented with taking my notes by writing
flashcards directly during the lectures using Anki but I found this too impractical and 
abandoned it quickly, so the flashcard feature of Logseq was very attractive.

I took notes for all my subjects in Logseq using Markdown, including my mathematics subjects, 
which was surprisingly unproblematic for studying Graph Theory as the inline equation typesetting
worked just fine, and I could just screenshot any graphs that I wanted to include in my notes from the lecture slides.
I even did some mathematics homework entirely within Logseq, and took notes from tutorials in it as well.
However, this became too difficult to use for Combinatorics, as I found it too slow for writing out the workings &
solutions to equations, so I reverted to using pen & paper for that subject alone.

<figure>
    <a href="images/Graph Theory Notes in Logseq.png">
        <img src="images/Graph Theory Notes in Logseq.png" alt="Graph Theory Notes in Logseq">
    </a>
  <figcaption>Graph Theory Notes in Logseq</figcaption>
</figure>

Despite being faster & more searchable than pen & paper note-taking, Logseq note-taking suffered 
from many of the same problems as pen & paper notes:
with the exception of revising with the flashcard feature, I never really looked back on my 
Logseq notes, as they were at their most accurate just a copy of the content of the lecture slides, and at worst could be missing information.
I was also still not really paying attention during the lectures, instead just focusing on taking notes from my copy of the lecture slides, and often had to take time after lectures to finish my notes.
The link-based & tagging nature of Logseq made it easy to write notes, but mean that there was 
not logical or easily navigable directory or file structure, and so the notes could only really be made sense of when viewed with the Logseq application itself.
Furthermore, I was still unfamiliar with command-line utilities like `grep` which could've made searching through 
the Markdown files much easier using something like `grep -ri`, despite their unstructured arrangement.

I also struggled greatly and ultimately failed to stay on top of my Logseq flashcards — there were
just too many of them for me to manage, and they didn't distinguish critical information from non-
critical, so a large amount of time was spent revising information that I was never going to need 
to recall.
This is largely why I no longer use flashcards for revision, except sometimes for very focused & 
narrow topics.
I find flashcards more appropriate for a short-term, pre-exam revision tool rater than a long-term
continuous use.

I still had no version control system at this time, but I began to keep my assignment files even 
after I had submitted the assignment, a step in the right direction at least.
I continued to use merged PDFs to archive lecture slides, and these merged PDFs were invariably
what I looked back on for study or for assignments.

Having abandoned Windows at the start of the semester, I began to use $\LaTeX$ in Overleaf
to write assignments, before switching to using it locally in Vim
as I was missing out on some rather useful features of $\LaTeX$ by only
using an online editor, such as the ability to include code blocks in a document by providing the
path to the source code file.
Around this time, I also experimented with pre-rolled [Neovim](https://neovim.io/) configurations such as 
[LunarVim](https://www.lunarvim.org/) and also briefly with [Doom Emacs](https://github.com/doomemacs/doomemacs), a pre-rolled Emacs configuration with Vi-like keybindings.
I also briefly experimented with [Org Mode](https://orgmode.org/) in Emacs, a markup language not 
dissimilar to Markdown but far more powerful, but I gave up on this primarily because Emacs just 
took far to long to start (even when I kept it running in the background constantly as a daemon) 
and because configuration in Emacs via Elisp was too cumbersome for my liking, made much more 
difficult by the fact that I did not know any Lisp at the time.

My programming was done either in Neovim or [Intellij IDEA](https://www.jetbrains.com/idea/) for Java
development, and the Intellij family of IDEs remains my favourite full-blown IDE to this day for 
any kind of development when I'm not using Vim, although it is sadly not FOSS so I generally don't
use them on my personal machines if it can be avoided.

### Semester 2
Before the start of my second semester of second year, I decided to switch from Manjaro GNU/Linux
to [Void GNU/Linux](https://voidlinux.org/), largely due to its increased stability from Arch-based
distributions like Manjaro while still maintaining a rolling-release model, its minimalism, and
its admittedly cool name.
With this, I also made the switch to using a tiling window manager, namely
[spectrwm](https://github.com/conformal/spectrwm), a dynamic tiling window manager for
[X11](https://www.x.org/wiki/) with a built-in panel.

My second year of university was when I began to start taking lecture notes in Vim with
$\LaTeX$.
Like before, these notes were intended to be comprehensive and to be a superset of the content in
the lecture slides.
My goal was to create a single PDF document per subject that was like a custom comprehensive 
textbook on the subject.
This technique was largely successful, as my lecture notes were convenient, transportable, 
indexable, & searchable.
However, as in previous years, I generally didn't really look back over my lecture notes.
The only class for which I routinely looked back over my notes was a class on Networks & 
Data Communications, and that was only because the lecture slides for this class did not have
searchable text in them, only an image of text, so it was easier to search through my notes.
I generally preferred the lecture slides as the "canonical source" of information, as there 
was always the possibility that a mistake had slipped into my notes or that they were incomplete.

<figure>
    <a href="images/Network & Data Communications Notes in LaTeX.png">
        <img src="images/Network & Data Communications Notes in LaTeX.png" alt="Network & Data Communications Notes in LaTeX">
    </a>
  <figcaption>Network & Data Communications Notes in $\LaTeX$</figcaption>
</figure>

I only discovered the Vim plugin [VimTex](https://github.com/lervag/vimtex) late in the semester,
and so I did without automatic $\LaTeX$ compilation, instead using `CTRL+z` to suspend Vim
and give me access to a shell, and then running a command like
`pdflatex Notes.tex && fg` to compile the document and return Neovim to the foreground.
I used the `&&` operator to prevent Neovim from returning to the foreground if the compilation failed, 
allowing me to read the error messages before manually returning Neovim to the foreground to fix them.
I used the PDF viewer [Zathura](https://pwmt.org/projects/zathura/), which automatically refreshes when the 
PDF document is recompiled.

Despite still not using any sort of version control system for my university materials beyond group 
projects, I did begin to properly archive all my assignments, lecture materials, and notes, meaning
that this semester is the first semester of university that I have a complete archive of.

## Third Year of University
To my undying shame, it was not until the tail end of the first semester of third year that I began to use Git
to archive my university materials, but at least I eventually did begin to use version control.

For the most part, my approach to note-taking in third year was not very different to the approach I was 
employing at the end of second year.
I continued to take comprehensive notes, with one large, textbook-like document per class, with just some
minor typesetting improvements, and I settled on two $\LaTeX$ document formats: one for short assignments,
and one for notes & long report-based assignments.

<figure>
    <a href="images/Shorter & Longer Assignment LaTeX Templates.png">
        <img src="images/Shorter & Longer Assignment LaTeX Templates.png" alt="Shorter & Longer Assignment LaTeX Templates">
    </a>
  <figcaption>Shorter (left) & Longer (right) Assignment $\LaTeX$ Templates</figcaption>
</figure>

I began to use [bspwm](https://github.com/baskerville/bspwm) instead of spectrwm as my window manager, as I 
favoured the flexibility of a manual tiling window manager over a dynamic one (meaning that windows are
positioned according to the user's selection rather than in an automatic pre-defined layout), and I started to
use [polybar](https://polybar.github.io/) as my desktop panel.
I began to make extensive use of CLI tools such as `pdfgrep` & [`rga`](https://github.com/phiresky/ripgrep-all)
to quickly search through lecture slides & notes, and ended my practice of merging the lecture slides into one 
mega-document, instead just keeping them together in the one directory per subject. 
I also began to use [LuaLaTeX](https://www.luatex.org/) as my $\LaTeX$ compiler rather than
`pdflatex` as it has better font support and I like the idea of doing Lua scripting within my $\LaTeX$ 
documents, although I've never encountered a good reason to do so.

Most importantly perhaps, I made the heavy-hearted decision to switch from my beloved Void GNU/Linux to
[Arch GNU/Linux](https://archlinux.org/), which is not massively dissimilar to Void and is the distribution 
upon which Manjaro is based.
I made this switch as I needed to use [Unity3D](https://unity.com/) for a games development class that I was
forced to take, and it was not available in the Void repositories.
They did offer both `.deb` & `.rpm` Linux binaries which I perhaps could've converted to
[`xbps`](https://docs.voidlinux.org/xbps/index.html), but this option seemed unreliable.
I knew I was likely to need more non-free software for university in the future, and so the
[Arch User Repository](https://aur.archlinux.org/) was appealing, as it had a large number of packages, for
just about any program you could imagine.
I don't particularly like Arch as operating system, as I find the install process needlessly cumbersome in 
the name of "minimalism", despite more minimal operating systems like Void having an easier install process via 
a TUI, and I resent how often packages break on Arch due to an update as it is a "bleeding edge" rolling-release 
distribution.
However, the AUR is just so unbelievably useful & convenient that I'm willing to put up with these inconveniences,
at least for the remainder of my university days.

Towards the end of the semester, I began to give up on my $\LaTeX$ notes for some subjects.
I realised that for my Database Systems class that I was better off just listening to the lecturer and following their
examples than trying to transcribe the entirety of the lecture slides to my notes.
For the last few weeks of term, I just sat in the lecture hall and didn't take any notes, just focusing on the lecture content.

## The Future
This coming September I will begin my fourth & final year of university, and so I want to make the optimal note-taking system 
based off what I've learnt from the various systems that I've employed throughout the years.

### A Return to Pen & Paper?
I think that one of the greatest issues with my note-taking methods up to this point is that they've invariably prevented 
me from actually paying attention during the lecture: I'm so busy taking notes (essentially just transcribing the lecture 
slides) that I don't take the time to properly listen to and understand what the lecturer is saying. 
To prevent this, one idea I have is to stop transcribing information that's already in the slides into my notes while I'm sitting
in the lecture hall; instead, I would take note only of things that are not in the slides, such as extra information that 
the lecturer provides, or examples.

However, one of the greatest strengths of my note-taking methods up to this point is that they've forced me to actually go
through each part of the lecture materials and transcribe them, which makes recalling them much easier later.
I generally need to do very little revision, thanks largely to the fact that I carefully comb through the entire lecture 
material at least once.

My best idea for a note-taking scheme at the moment that addresses the issue of me being distracted in lectures without 
nullifying the benefits that I receive from carefully transcribing the entirety of the lecture slides is to focus on the
lecture during the lecture, noting down only what is not in the slides and then at some later time after the lecture 
transcribe the entirety of the lecture slides, plus my handwritten notes, into a $\LaTeX$ document.
Because I won't be pressured to keep up with the pace of the lecture while writing my $\LaTeX$ document, I'll be able to take
the time to format & typeset things nicely, and create or source high-quality diagrams. 

I've recently started to take interest in fountain pens, so I think I may use one for note-taking as I find them 
smoother & more fluid to write with than the conventional ballpoint pen.
Because my lecture notes would be so sparse in this system, likely rarely exceeding a page per lecture and often being entirely empty, 
I could use just one single notebook that will contain notes for all my classes.
I would also continue my paradigm of one comprehensive, textbook-like $\LaTeX$ document per subject, as this has worked well for me 
in the past.

My primary concern with this proposed system is that it would require a large amount of time dedicated to note-taking outside 
of lectures, introducing both the risk that I exhaust much of my free time to accomplish this and the risk that I fall behind 
on note-taking because of the time commitment involved.
Furthermore, my experience for many of my classes has been that the lecture slides generally include every piece of relevant
information, and there is generally little added, if anything, in lectures that that's not in the slides.
I know of at least one person who did not attend any lectures at all in third year, instead just opting to look at the lecture 
slides, to apparently reasonable success.

### Continuing My Existing Method
I have at this point largely perfected my $\LaTeX$ note-taking method to my taste, so I am reluctant to give it up when it
is tried & true, and only has one significant flaw (being distracted during lectures).
I think that it would likely be a mistake to forgo this technique that has been so successful for me, especially considering 
that for the majority of my classes I am unlikely to miss out on something that is said in the lecture but not included in the 
lecture slides, and so I think I will most likely continue with this approach into fourth year.

If however, I encounter another class like my Database Systems class, where there is significantly more to be gained from what
the lecturer is saying than from the lecture slides, I will take minimal pen & paper notes as detailed in the above section, and 
pay as much attention as possible.
These minimal notes, along with the content of the lecture slides, will then be transferred into a $\LaTeX$ document as for my
other classes at some later time, either in the evening or on the weekends, which will have the added benefit of forcing me to
revise the lecture content a little while after the lecture itself.
