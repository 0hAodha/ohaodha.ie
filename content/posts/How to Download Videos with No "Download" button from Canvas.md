+++
title = 'How to Download Videos with No "Download" button from Canvas'
date = 2024-02-26T16:58:00Z
+++

## Introduction
Normally, when videos such as lecture recordings are posted to Canvas, there is a "Download `file.mp4`" or similar
link available on the page, or at the very least you can right-click on the playing video and select "Save media". 
Sometimes, however, there is no such link available, which is quite annoying for people like me who want to hoard
lecture content.
Below is the workaround that I've found to work for downloading such videos from Canvas.
It's not quite as streamlined as I would like it to be, so suggestions and/or feedback would be appreciated, but it
works for me.

The instructions should be browser and operating system independent, but note that I have only tested them on Arch Linux
using qutebrowser & Firefox.
The instructions also assume that the file on Canvas is an `mp4` file, an assumption that I have not been able to verify
the reliability of: I have never encountered a non-`mp4` video on Canvas so it's possible that it stores videos
exclusively as `mp4` files, but it's also equally possible that I've simply coincidentally only ever encountered `mp4`
files and that other video formats are supported.

## Steps
1.  Open Canvas in your web browser and navigate to the video file that you want to download.
    Before going any further, I suggest you double-check that there is no download button and that you
    can't right-click on the vide and select "Save media" to save yourself the trouble of the following steps.

1.  Open your browser's Inspector window by right-clicking anywhere on the page and selecting "Inspect" and navigate to
    the "Network" tab of the Inspector window.

1.  Enter the term `mp4` into the "Filter" box (called "Filter URLs" on Firefox) to only display network results
    relating to the video itself.

1.  Click on the video to start playing it.
    A number of network requests will be displayed in the Inspector window; we are interested in the last one.

1.  Right-click on the last result displayed in the Inspector window, and hover the mouse over the "Copy" option in the
    drop-down menu (labelled "Copy Value" on Firefox).
    This is where the steps will diverge depending on your operating system.
    If you are on a UNIX-like system such as GNU/Linux or MacOS, click the "Copy as cURL" option in the sub-menu.
    If you are on Windows, click the "Copy as PowerShell" option.

1.  Open a terminal emulator (or PowerShell on a Windows machine) and paste the command you copied into the command
    prompt.
    If you are using `cURL`, append `-o file_name.mp4` to the command before proceeding, substituting `file_name.mp4`
    for the name that you wish to give the file.

1.  Hit the return key to download the video file.
    The video file will be downloaded to whatever directory/folder you ran the command from, by default the `~` or
    "home" directory on UNIX-like systems or `C:\Users\username` on Windows, substituting `username` for your own
    username.
