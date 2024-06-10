+++
title = 'Evolution of My Approach to Note-Taking'
date = 2024-05-27T00:19:44+01:00
draft = true
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
recalling that information later much easier, and I generally didn't have to do very much revision, usually just at the end of the semester before exams.
This technique was so effective in fact that this remains my pre-exam study technique to this day:
I simply write out all the information on a topic repeatedly.

It goes without saying here that I did not have any sort of version control or backup system as all my notes were on paper, which horrifies me in retrospect.
Furthermore, for reasons I now cannot recall, I would delete all the files related to an assignment once I had submitted it (perhaps to free up
SSD space?) which is quite regrettable.

At this time I still used Microsoft Word documents for any assignment that required writing, but 
I did use \\(\LaTeX\\) once for a mathematics group project (which was really my introduction to 
\\(\LaTeX\\)), using the online \\(\LaTeX\\) editor [Overleaf](https://www.overleaf.com/).
For any sort of coding, I would use either the Microsoft IDE
[Visual Studio](https://visualstudio.microsoft.com/) (for C programming) or the Microsoft text 
editor [Visual Studio Code](https://code.visualstudio.com/) for anything else.

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

## Second Year of University 
### Semester 1
Before starting the first semester of my second year of university, I had decided that I'd had 
enough of using Windows on my laptop and decided to try something new with
[Manjaro GNU/Linux](https://manjaro.org/) as my primary operating system, having previously been 
using [Ubuntu GNU/Linux](https://ubuntu.com/) as my desktop operating system.
With this change I also decided to try something new for my note-taking approach, and started 
using the Markdown-based notes application [Logseq](https://logseq.com/).
I had begun experimenting with different note-taking software for revision before my summer exams the year previous, such as [Obsidian](https://obsidian.md/), [Joplin](https://joplinapp.org/),
and even plaintext in [Vim](https://www.vim.org/) & [Helix](https://helix-editor.com/).
I ultimately decided on using Logseq because it was free & open source, had an easy to use &
pleasant UI, was capable of using \\(\LaTeX\\) typesetting for equations, and had a handy flashcard feature wherein a section of a note could be turned into a flashcard with spaced repetition for
revision.
It also allowed me to embed PDF documents in Markdown file and view it in a split pane next to the
note itself, which was handy for archiving & linking the lecture slides, and the split view was 
very helpful since I was using the [Gnome Desktop Environment](https://www.gnome.org/) and hadn't
yet moved to a tiling window manager.

At the start of the semester, I very briefly experimented with taking my notes by writing
flashcards directly during the lectures using [Anki](https://apps.ankiweb.net/) (which I had 
used for some pre-exam revision at the end of first year) but I found this too impractical and 
abandoned it quickly, so the flashcard feature of Logseq was very attractive.

I took notes for all my subjects in Logseq using Markdown, including my mathematics subjects, 
which was surprisingly unproblematic for studying Graph Theory as the inline equation typesetting
worked just fine, but became too difficult to use for Combinatorics, so I reverted to using pen & paper for that subject alone.
I even did some mathematics homework entirely within Logseq, and took notes from tutorials in it as well.

<figure>
  <img src="image/Graph Theory Notes in Logseq.png" alt="Graph Theory Notes in Logseq">
  <figcaption>Figure 2: Graph Theory Notes in Logseq</figcaption>
</figure>

Despite being faster & more searchable than pen & paper note-taking, Logseq note-taking suffered 
from many of the same problems as pen & paper notes:
with the exception of revising with the flashcard feature, I never really looked back on my 
Logseq notes, as they were at their most accurate just a copy of the content of the lecture slides, and at worst could be missing information.
I was also still not really paying attention during the lectures, instead just focusing on taking notes from my copy of the lecture slides, and sometimes had to take time after lectures to finish my notes.
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

I still had no version control system at this time, but I began to save my assignment files even 
once I had submitted the assignment.
I continued to use merged PDFs to archive lecture slides, and these merged PDFs were invariably
what I looked back on for study or for assignments.

Having abandoned Windows at the start of the semester, I began to use \\(\LaTeX\\) in Overleaf
to write assignments, before switching to using it locally in Vim
as I was missing out on some rather useful features of \\(\LaTeX\\) by only
using an online editor, such as the ability to include code blocks in a document by providing the
path to the source code file.
I experimented around this time with the pre-rolled Neovim configuration
[LunarVim](https://www.lunarvim.org/) and also briefly with [Doom Emacs](https://github.com/doomemacs/doomemacs), a pre-rolled Emacs configuration with Vi-like keybindings.
I also briefly experimented with [Org Mode](https://orgmode.org/) in Emacs, a markup language not 
dissimilar to Markdown but far more powerful, but I gave up on this primarily because Emacs just 
took far to long to start (even when I kept it running in the background constantly as a daemon) 
and because configuration in Emacs via Elisp was too cumbersome for my liking.

My programming was done either in Vim or [Intellij IDEA](https://www.jetbrains.com/idea/) for Java
development, and the Intellij family of IDEs remains my favourite full-blown IDE to this day for 
any kind of development when I'm not using Vim, although it is sadly not FOSS so I generally don't
use them on my personal machines if it can be avoided.

### Semester 2
My second year of university was when I began to start taking lecture notes in Vim with
\\(\LaTeX\\).
Like before, these notes were intended to be comprehensive and to be a superset of the content in
the lecture slides.
My goal was to create a single PDF document per subject that was like a custom comprehensive 
textbook on the subject.

I only discovered the Vim plugin [VimTex](https://github.com/lervag/vimtex) late in the semester,
and so I did without automatic \\(\LaTeX\\) compilation, instead using `CTRL+z` to suspend Vim
and give me access to a shell, and then arrowing up to a command I'd ran often before like 
`pdflatex Notes.tex && fg` to compile the document and return Vim to the foreground.
My PDF viewer [Zathura](https://pwmt.org/projects/zathura/) would automatically refresh when the 
document was recompiled.


## Third Year of University
- LaTeX
- Just paying attention

## The Future
This coming September I will begin my fourth & final year of university, and so I want to make the optimal note-taking system 
based off what I've learnt from the various systems that I've employed throughout the years.
I think that one of the greatest issues with my note-taking methods up to this point is that they've invariably prevented 
me from actually paying attention during the lecture: I'm so busy taking notes (essentially just transcribing the lecture 
slides) that I don't take the time to properly listen to and understand what the lecturer is saying. 
To prevent this, my plan is to stop transcribing information that's already in the slides into my notes while I'm sitting
in the lecture hall; instead, I will take note only of things that are not in the slides, such as extra information that 
the lecturer provides, or examples.

I've recently started to take interest in fountain pens, so I think I may use one for note-taking as I find them 
smoother & more fluid to write with than the conventional ballpoint pen.
Because my lecture notes will be so sparse now, likely rarely exceeding a page per lecture and often being entirely empty, 
I will use one single notebook that will contain notes for all my classes.

- Return to pen and paper???
- LaTeX
