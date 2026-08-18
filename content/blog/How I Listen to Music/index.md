+++
title = 'How I Listen to Music'
date = 2026-08-15
tags = [ 'music', 'linux', 'programming', 'shell', 'hacking' ]
+++

## Introduction

Several years ago now, I decided to stop using Spotify as my primary means of listening to music, for reasons which I may or may not expand on in a future blog post, but which primarily boil down to three key points:
1. **Privacy concerns:** while the annual [Spotify Wrapped](https://support.spotify.com/td-en/article/spotify-wrapped/) analysis is a lot of fun, it troubles me that Spotify has this kind of data on the general population as a whole. Listening habits can be used to infer emotional states, religious beliefs, & political affiliations[^1], and Spotify can further identify names and geographical locations of their users from their account information.
  Although I don't find it particularly concerning that Spotify may have this data on _me_, I find it objectionable that a large corporation would have this kind of data on broader society ---[^2] and I don't think it's implausible that this sort of data _could_ be used to manipulate or predict significant societal events like elections.

2. **Audio quality:** Spotify infamously ~~has~~ _had_ limited audio quality, with the highest audio quality setting (up until recently) being 320 kbps[^4], which is quite good, but not audiophile quality.
  However, Spotify have recently released lossless support which largely negates this point, although the [ever-dissatisfied audiophile community seem to disagree](https://www.pocket-lint.com/review-spotify-lossless-audio-option/).
  I'm not going to claim, however, that I have either the audio equipment or the hearing sensitivity to detect these subtle differences:
  I've _very rarely_ upon occasion noticed a slight difference between my own lossless-audio files and Spotify's default-quality audio, but the truth of the matter is that I simply do not have audio hardware of sufficient quality to detect these differences.
  I build my music library with lossless audio not because I can definitely tell the difference, but in the interest of future-proofing, as I expect (or hope) that I will one day own the hardware necessary to detect these differences.

3. **Access to music not on Spotify[^5]:** not all of the music I want to listen to is on Spotify.
  My then-favourite singer [Mars Argo](https://www.youtube.com/channel/UCS42Pk262iOKUXUW9XW_SOg) wasn't on Spotify at the time, and although she since has returned from her extended disappearance, the majority of her discography still isn't on Spotify.
  There are a number of other songs and artists to which I would like to listen but are still not on Spotify, and with an increasing number of artists now electing to [boycott Spotify](https://www.thestreet.com/entertainment/spotify-faces-global-boycott-over-ceos-military-investments), I imagine this issue is more relevant than ever.
  Furthermore, I went through a brief phase of editing songs I listened to with the goal of removing parts which I didn't like or extending parts I did like, and this requires you to have that audio file locally[^6] (although I rarely do anything like that these days).

For these reasons, as well as a general migration in my life away from proprietary software to FOSS solutions, I decided to build a locally-stored music library consisting of lossless audio files.
I recently lost my library of music files while running reckless `rm` commands while sleep-deprived circa 04:00 one morning, which is one of the primary drawbacks of having everything locally, but anyone who's not an absolute fool would be smart enough to have a back-up ~~(except me)~~.
So, while I'm rebuilding my music collection from scratch, I was inspired to write about my system in detail, as it's grown quite sophisticated over the years.

## How I Organise My Music Library
The majority of music players organise music by the tags within the file metadata, deriving song titles, album titles, and band names in this manner;
however, this is something that I strongly dislike, as it's it's less explicit than a directory-based organisation, requires specialist programs to edit and update properly, and can be very inconsistent, as not all music files one obtains will be tagged properly --- arguably the majority won't be tagged properly.
Therefore, while I make an effort to properly tag my music library for maximum portability, I primarily use a **directory-based organisation** for my music:
each file is stored under the directory structure of Band Name ☞ Album Name ☞ Track Name.

```
~/media/music
├── 'Addison Rae'
│   └── '(2025) Addison'
│       ├── '01. New York.flac'
│       ├── '01. New York.lrc'
│       ├── '02. Diet Pepsi.flac'
│       ├── '02. Diet Pepsi.lrc'
│       ├── '03. Money Is Everything.flac'
│       ├── '03. Money Is Everything.lrc'
│       ├── '04. Aquamarine.flac'
│       ├── '04. Aquamarine.lrc'
│       <etc> ...
├── 'Alice in Chains'
│   ├── '(1995) Alice in Chains'
│   │   ├── '01. Grind.flac'
│   │   ├── '01. Grind.lrc'
│   │   ├── '02. Brush Away.flac'
│   │   ├── '02. Brush Away.lrc'
│   │   ├── '03. Sludge Factory.flac'
│   │   ├── '03. Sludge Factory.lrc'
│   │   ├── '04. Heaven Beside You.flac'
│   │   ├── '04. Heaven Beside You.lrc'
│   │   <etc> ...

```

There are three primary pet peeves which annoy me about other directory structures I've seen for music libraries:
1.  **Not numbering tracks:** I want the file path to contain all the information about the track, including the artist name, the album name, the track's number within the album, and the track title.
    This makes it easy to manage the music library using standard file tools such as `ls`, `mv`, `rm`, etc. and ensures that when a program is run upon the files in a directory, e.g., `mpv 'The Velvet Underground'`, the program handles each track in the appropriate order.
    Putting the album release year before the album title achieves a similar effect.

2.  **No leading zeros in track numbering:** if there are more than 9 tracks in a directory, the track numbering **must** start with a leading zero for tracks 0--9.
    This ensures that the tracks are naturally self-ordering when using programs like `ls` or `sort`, which order items alphabetically:
    failure to include a leading zero will result in item 12 appearing before item 2.
    Each track number should have the same number of digits as every other track number to ensure proper sorting.

3.  **Not making use of the available character set:**
    you'll often see filenames in which every non-alphanumeric character has been replaced with an underscore `_` for no apparent reason.
    While I understand removing characters which are especially difficult to handle in filenames, such as single-quotes `'`, double-quotes `"`, and forward-slashes `/` (although single and double-quotes can be used in filenames without issue if escaped properly), and I myself remove these characters from filenames in my library, it seems to me to be a terrible waste to remove characters that are easy to handle in filenames such as parentheses `()`.
    Furthermore, removed characters are invariably replaced with underscores `_` to create horrific, unreadable, and ugly filenames.

    There's a near-superstitious hysteria around non-alphanumeric characters in filenames when the majority of non-alphanumeric ASCII characters are perfectly fine for most modern filesystems.
    There are, of course, some characters which you do have to remove for certain filesystems, but these characters are usually few in number and vary from filesystem to filesystem.
    The popular choices for desktop UNIX-like operating systems (such as ext4 and btrfs) are very permissive with the characters which they allow, and the only outright forbidden character is `/`.
    Of course, if you require portability to more arcane filesystems like FAT (for Android) or exFAT (for Windows), you're quite hamstrung with the characters you can use, as they forbid `\`, `/`, `:`, `*`, `?`, `"`, `<`, `>`, and `|`[^10].
    However, these still leave a large characterspace to play with, especially when you consider that any modern filesystem will support Unicode, even if it didn't originally.

    The only characters I recommend removing from filenames for most Linux-based desktop operating systems are the aforementioned single-quotes `'`, double-quotes `"`, and forward-slashes `/`;
    however, I do not recommend just deleting them or replacing them with underscores `_`, but replacing them with the following more appropriate characters which are far less offensive to the eye:
      - Replace **`'`** (`U+0027 APOSTROPHE`) with **`’`** (`U+2019 RIGHT SINGLE QUOTATION MARK`).
      - Replace **`"`** (`U+0022 QUOTATION MARK`) with **`“`** (`U+201C LEFT DOUBLE QUOTATION MARK`) and **`”`** (`U+201D RIGHT DOUBLE QUOTATION MARK`).
      - Replace **`/`** (`U+002F SOLIDUS`) with **`⧸`** (`U+29F8 BIG SOLIDUS`).

    If, however, you want to ensure the portability of your music library to different operating systems & filesystems, you'll have to consider the restrictions of those filesystems as well; if you want completely generalisable, filesystem-agnostic filename normalisation, then I can concede that perhaps *in that particular situation for compatibility with **all** filesystems* that a general replace of special characters with underscores is justifiable.
    For my uses, I also want my music library to be synchronised to my Android smartphone:
    since Android uses the FAT32 filesystem, which is rather archaic in the characterset it supports, I am forced to be more aggressive in my substitution of characters that I would otherwise like to be.

Regardless of my directory-based approach instead of a tags-based approach, I try to ensure that my music is properly tagged in an effort to ensure portability across devices and for future-proofing.
I do this using [**beets**](https://docs.beets.io/en/latest/index.html), a music organiser which you can use to import a collection of music files, which it will tag using sources including the [MusicBrainz](https://musicbrainz.org/) database, rename as appropriate in keeping with your naming conventions, and run plug-ins or user-specified hooks on the imported files.
My beets configuration is pretty standard, with it naming and organising files in accordance with the approach I've outlined above, embedding the album cover art, updating the tags, and so on;
the only non-standard part of my configuration is the following:
```yaml{linenostart=72}
hook:
  hooks:
    - event: album_imported
      command: 'karaoke.pl "{album.path}"'
```

This hook runs once an album has been imported and executes a script I wrote called [**`karaoke.pl`**](https://github.com/0x4A0D4A/utility_scripts/blob/main/src/karaoke.pl) to 
fetch lyrics for music files from the [LRCLIB API](https://lrclib.net/docs) and save them to `*.lrc` files.
Surprisingly, I couldn't find a good solution for downloading the synchronised lyrics for a song programmatically, so I had to write my own script to do so.

Beyond what I've mentioned already, I find the following two command-line utilities indispensable for making files in a directory match a naming convention: 
  - [**`vidir`**](https://man.archlinux.org/man/vidir.1.en): allows you to edit a directory like a normal body of text in a Vi-buffer, the most useful feature of which I find to be using visual block mode to edit, add, or delete a column of characters in a list of filenames.
  - [**`perl-rename`**](): allows you to rename a number of files using regular expressions, without doing any overcomplicated nonsense like `echo`ing filenames into `sed` and interpolating the output into a `mv` command.

## Music Player
I use [**`mpv`**](https://mpv.io/) for playing both video and audio;
it has nice features like the ability to play all the files in a directory in alphabetical order (which is why it's good to number your tracks properly) with a command like `mpv "King Crimson/(1969) In The Court Of The Crimson King"`, and it automatically detects `*.lrc` files and displays the synchronised lyrics at the appropriate time on-screen.
I use the [**`umpv`**](https://github.com/mpv-player/mpv/blob/master/TOOLS/umpv) script to achieve an enqueueing effect with mpv:
by default, running `mpv file1.mp3; mpv file2.mp3` will spawn two separate mpv windows, one playing each file;
running `umpv file1.mp3; umpv file2.mp3` will append `file2.mp3` to the original umpv window's queue.

![Screenshot of mpv displaying lyrics](./images/mpv_lyrics.png "`mpv` displaying lyrics")

I use the [**`lf`**](https://github.com/gokcehan/lf) terminal file manager to manage and browse all my files, including music files.
Previews for each file are generated using a script I wrote called [**`file_previewer.sh`**](https://github.com/0x4A0D4A/utility_scripts/blob/main/src/file_previewer.sh):
if the album cover is available, it's displayed in the terminal using [`chafa`](https://hpjansson.org/chafa/)[^9] --- otherwise, a waveform image is generated using [`ffmpeg`](https://ffmpeg.org/) and also displayed with `chafa`.

```shell{linenostart=51}
  audio/*)
      # attempt to preview the audio file's embedded image
      # if no embedded image, attempt to preview a file named 'cover.*' in the same directory
      # else, generate a waveform image and display it
      exiftool -Picture -b "$file" | chafa --size "$(($width-4))"x"$height" || chafa cover.* --size "$(($width-4))"x"$height" || ffmpeg -i "$file" -filter_complex "showwavespic=s=1280x720:colors=pink" -frames:v 1 -f image2pipe -vcodec png - | chafa --size "$(($width-4))"x"$height"
      exiftool "$file" | bat --theme='base16' --terminal-width "$(($width-4))" --force-colorization;;
```

![Screenshot of lf displaying the cover image for an album](./images/lf_album_art.png "`lf` with album art preview")

![Screenshot of lf displaying the audio waveform in the absence of a cover image](./images/lf_waveform.png "`lf` with audio waveform preview in the absence of cover image")

I've also written a number of scripts to play music in different ways over the years, although I only really use the last script listed here now:
- **[`music_dmenu.sh`](https://github.com/0x4A0D4A/utility_scripts/blob/main/src/music_dmenu.sh):** creates a hierarchical [`dmenu`](https://tools.suckless.org/dmenu/) prompt based on the files in your music directory which allows you to play a specific artist, album, or track.
  Cumbersome to use, as playing a particular track requires you to select `Track` in the first prompt, then the artist, then the album, and then the track itself --- probably only really useful for playing a particular artist as you would just select `Artist` and then the artist's name.
- **[`play_music.sh`](https://github.com/0x4A0D4A/utility_scripts/blob/main/src/play_music.sh):** plays an album based off a given artist name and album name.
  Usage: `play_music.sh "Fontaines D.C." "(2022) Skinty Fia"`.
  This worked well before I started including release years in the filepath, as while it's not especially unreasonable to require the user to know the precise artist name and album name, it's a bit much to expect them to know the album's release year as well, and so I don't really use it anymore.
- **[`fzfplay.sh`](https://github.com/0x4A0D4A/utility_scripts/blob/main/src/fzfplay.sh):** uses [`fd`](https://github.com/sharkdp/fd) (a faster[^7] alternative to the POSIX [`find`](https://www.man7.org/linux/man-pages/man1/find.1.html)) to list all the tracks in the music directory[^8], and allows the user to search them with [`fzf`](https://github.com/junegunn/fzf) (a command-line fuzzy finder).
  For me, this is not only far superior to the other two scripts mentioned here, it's superior to any other method of enqueueing music I've encountered in any other application --- its speed and convenience are unparalleled.
  ```shell
  #!/bin/sh
  # Script that allows a music file or directory to be selected via `fzf` to be enqueued with `umpv`

  media_directory="$HOME/media/music"

  fd  --base-directory "$media_directory" \
      --exclude "*.jpg" --exclude "*.png" --exclude "*.lrc" \
      --absolute-path |
      fzf |
      xargs -I{} sh -c 'umpv "{}" &'
  ```
  I bound this script to a hotkey using [`sxhkd`](https://github.com/baskerville/sxhkd) (my preferred hotkey manager for X), and use this to play my music 90% of the time --- the remaining 10% being via `lf`.
  ```{linenostart=219}
  super + control + shift + m
      alacritty --class "fzfplay.sh" --command sh -c "nohup fzfplay.sh > /dev/null"
  ```

  ![Screenshot of fzfplay.sh](./images/fzfplay.png "`fzfplay.sh`")

  I have the idea in my head to (probably at some point in the near future) update this script to allow the user to search by lyrics as well, not unlike the search bar on Spotify.
  I'm unsure as of yet whether I would want this functionality united in the same script for convenience, or if I would prefer to have it isolated to its own "search-by-lyrics" script:
  at present, I'm leaning towards the latter, as it would be both simpler and more UNIXy, but also because it would circumvent the issue of weighting lyrics versus titles in search.
  What I mean by this is that a unified search interface would have decide whether to weight a matching title or lyric more heavily (i.e., treat it as more relevant), which would turn this program from a handy little script to an open research question in the field of Information Retrieval.
  - The most likely approach would be to weight the title more heavily: e.g., if a user were to search "i love you", the song *I Love You* by Fontaines D.C. would be more likely to be a relevant result than any of the other thousands of songs that contain that string.
  - You could probably take it as an axiom that given that song titles are forced to be quite short and are often chosen with some view towards uniqueness or recognisability, whereas song lyrics have no such length constraints and have far less of a focus on uniqueness (though, of course, still have some focus on uniqueness), that the likelihood of a any given sub-string occurring in a song title is far lower than the likelihood of it occurring in a song's lyrics, and that therefore its presence in a song's title is more meaningful for providing relevant search results.

## Sharing Music Between Devices
I use [Syncthing](https://syncthing.net/) for sharing music between my laptop and my phone;
on my phone, I use the Android Syncthing client [Syncthing-Fork](https://github.com/researchxxl/syncthing-android) (set to open directly to the web view window, as I find that the most intuitive interface).
Because my music collection consists of FLAC files, it's rather large and therefore takes up a lot of storage space:
it was for this reason that one of my primary "must-haves" for my most recent smartphone purchase was 256Gb of storage.
In the future, I may look into compressing my music before syncing it to other devices, and using the FLAC files primarily for archival purposes, or on my home computer where I can attach additional storage without having to worry about transporting it.
For the time being, my music collection does still fit on my phone, so I can worry about that another day.

[^1]: Besides the following research papers which substantiate this claim, this is intuitively self-evident: someone who listens to the Dead Kennedys is likely to have anarcho-lefist views, a Tom MacDonald listener is likely to have conservative views, a Wolfe Tones listener is likely to have Irish republican views ---[^2] and so on, and doubly so for inferring one's religion if they tend to listen to Orthodox chants or Islamic _nasheeds_.

[^2]: I swear that this is an organic em-dash, not a GPT-generated one[^3].

[^3]: Have you ever seen someone put a footnote on a punctuation mark like that before? I haven't. Would be even weirder if someone put yet another footnote within that footnote...

[^4]: https://support.spotify.com/us/article/audio-quality/

[^5]: Spotify does give you a way to address its lack of certain tracks with its [Local Files feature](https://support.spotify.com/us/article/local-files/) which allows you to not only listen to files you have stored locally on your devices, but to add them to playlists and to download these playlists onto other devices under the same account, where the tracks will be playable even if you never manually copied the local files to that device.
I made extensive use of this feature when I primarily used Spotify.

[^6]: The most notable example of me doing this was removing the repeated lines *When Richard one calm summer night / put a bullet through his head* before a breakdown from the [Tiny Little Houses song](https://www.youtube.com/watch?v=yO3VhLYSWgE) based upon the Edwin Arlington Robinson poem [*Richard Cory*](https://www.poetryfoundation.org/poems/44982/richard-cory), the repetition of which I felt destroyed much of the impact of the original poem, as in the original poem the final line very much strikes the reader out of nowhere and then ends abruptly in silence.

[^7]: https://github.com/sharkdp/fd#benchmark

[^8]: My implementation actually just finds all the files that are not JPEGs, PNGs, or LRC files, which is fine in the case of my music directory, as I know it won't contain any other filetypes. An alternative approach would be to search specifically for MP3 files, FLAC files, etc., but this approach would exclude any tracks in a non-specified file format: I've prioritised track filetype flexibility over guaranteed exclusion of non-music files.
A more robust approach would be to check the MIME type of each file and to only use the ones which are of the **type** `audio`, but I consider this to be prohibitively computationally expensive for my use-case, as it would require actual reading of the contents of each file rather than just filename-based filtering.

[^9]: I will most likely stop using `chafa` in favour of switching to a terminal emulator with graphics support; at present, I use [Alacritty](https://alacritty.org/) for its simplicity, but I would probably be better of using a terminal emulator with graphics/Sixel support such as [kitty](https://sw.kovidgoyal.net/kitty/).

[^10]: https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file


