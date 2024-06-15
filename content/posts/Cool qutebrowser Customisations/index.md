+++
title = 'Cool qutebrowser Customisations'
date = 2024-04-19T20:03:27+01:00
draft = false
tags = ['programming', 'hacking', 'web', 'tutorial']
+++

## What is qutebrowser?
[**qutebrowser**](https://qutebrowser.org/index.html) is a keyboard-focused, minimal web browser written in Python. 
It makes use of Vim-like keybindings, and is surprisingly fast & memory-efficient for a browser written in Python: it
generally starts up faster than the [Brave](https://brave.com/) browser on my machine, and consumes less memory than
[Firefox](https://www.mozilla.org/en-US/firefox/) (which I've had memory leak issues with in the past).

It has a minimal graphical user interface, and some primitive built-in adblocking which tends to work quite well, with
the exception of YouTube advertisements.
It is configured via plaintext Python files, making it highly & easily configurable.
It also has the built-in capability to run JavaScript userscripts, making its behaviour even more flexible &
customisable.

## Configurations in `config.py`
I'll skip over the ~~boring~~ common configurations that have been covered to death by others before me here, such as
turning on dark mode or launching the current URL in `mpv` and skip to configurations that I think have something interesting to them.

### Video Speed Controls
Most video platforms only allow you to speed up a video to $2\times$ speed, which I often find to be not as fast as
I would like.
I rarely watch a video on lower than $2\times$ speed, unless the timing of the video is important, such as music or
comedy, and often want to watch videos on $3\times$ or $4\times$ speed.

The following lines of code, when added to the qutebrowser `config.py` configuration file, make the up & down arrow keys
into video speed controllers which increase the speed of videos on the page by quarter-increments at time, and allows
speeds in excess of the typical limit $2\times$ to be achieved:

```python
# control video speed
config.bind("<Up>",     "jseval document.querySelector('video').playbackRate += 0.25;") 
config.bind("<Down>",   "jseval document.querySelector('video').playbackRate -= 0.25;") 
```

### Clear Notifications (Messages)
The above speed controls generate messages at the bottom of the screen that show what speed has been set, which I find
useful, but if I hit the button several times they can build up and take a while to disappear, so the following
keybinding clears them:
```python
config.bind("cm", "clear-messages") 
```

### Find Missing Webpages
If a webpage I visit is missing or has been changed, I hit the key combination `,w` to find it on the Wayback Machine:
```python
# search for the current URL in archive.org's wayback machine
config.bind(",w", "open http://web.archive.org/{url}")
```

### Load the Current Page in Firefox
If a webpage I visit doesn't work properly in qutebrowser (as is sometimes, but rarely, the case) I can open the tab in
Firefox:
```python
# keybind to open current url in firefox 
config.bind("<Ctrl+Alt+t>", "spawn -d firefox {url} ;; tab-close") 
```

## Userscripts
### Redirectors
I use a number of alternative frontends for various social media sites to avoid having to make an account, and have a
number of scripts that redirect each social media page to the alternative frontend.

```javascript
// ==UserScript==
// @name        reddit to libreddit redirector
// @include     /^https?:\/\/(www\.)?reddit\.com\/.*$/
// @run-at      document-start
// ==/UserScript==

const alt = "libreddit.kavin.rocks" 

location.href=location.href.replace(/(www.)?reddit.com/gi, alt);
console.log("redirected reddit.com to " + alt);
```
```javascript
// ==UserScript==
// @name        tiktok to proxitok redirector
// @include     /^https?:\/\/(www\.)?tiktok\.com\/.*$/
// @run-at      document-start
// ==/UserScript==
    
location.href=location.href.replace(/(www\.)?tiktok.com/gi, "proxitok.pabloferreiro.es");
console.log("redirected tiktok.com to proxitok.pabloferreiro.es");
```
```javascript
// ==UserScript==
// @name        twitter to nitter redirector
// @include     /^https?:\/\/(www\.)?twitter\.com\/.*$/
// @run-at      document-start
// ==/UserScript==

location.href=location.href.replace(/(www.)?twitter.com/gi, "nitter.poast.org");
console.log("redirected twitter.com to nitter.poast.org");
```
```javascript
// ==UserScript==
// @name        youtube to invidious redirector
// @include     /^https?:\/\/(www\.)?youtube\.com\/.*$/
// @run-at      document-start
// ==/UserScript==

location.href=location.href.replace(/(www\.)?youtube.com/gi, "yewtu.be");
console.log("redirected youtube.com to yewtu.be");
```

### Smart Video Speed Reset
As I mentioned above, I typically have my video speeds set to $2\times$ or above except for videos in which the
timing is important, such as music or comedy. 
The following userscript detects the category of a YouTube video and resets the speed to normal speed.
```javascript
// ==UserScript==
// @name        normal speed music
// @description make music & comedy youtube videos normal speed (for timing purposes)
// @include     /^https?:\/\/(www\.)?y\.com\.sb\/watch\?v=.+$/
// @include     /^https?:\/\/(www\.)?yewtu\.be\/watch\?v=.+$/
// @run-at      document-idle
// ==/UserScript==

if (document.getElementById("genre").innerHTML.includes("Music") || document.getElementById("genre").innerHTML.includes("Comedy")) {
    document.querySelector("video").playbackRate = 1;
}
```
Note that the above script is written to work on Invidious YouTube frontends rather than YouTube itself, although it could easily
be adapted for YouTube by just adding it to the `@include` section.
