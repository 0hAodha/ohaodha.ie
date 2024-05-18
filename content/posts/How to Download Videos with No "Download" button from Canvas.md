+++
title = 'How to Download Videos with No “Download” Button from Canvas'
date  = 2024-02-26T16:58:00Z
tags  = ['tutorial', 'web', 'hacking']
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
    <figure>
      <img src="/images/How to Download Videos with No Download Button from Canvas/canvas_video_with_download_options.png" alt="Canvas Video with Download Options">
      <figcaption>Figure 1: Canvas Video with Download Options</figcaption>
    </figure>

    <figure>
      <img src="/images/How to Download Videos with No Download Button from Canvas/canvas_video_without_download_options.png" alt="Canvas Video without Download Options">
      <figcaption>Figure 2: Canvas Video without Download Options</figcaption>
    </figure>

1.  Open your browser's Inspector window by right-clicking anywhere on the page and selecting "Inspect" and navigate to
    the "Network" tab of the Inspector window.
    <figure>
      <img src="/images/How to Download Videos with No Download Button from Canvas/network_tab_of_inspector_window.png" alt="Network Tab of the Inspector Window">
      <figcaption>Figure 3: Network Tab of the Inspector Window</figcaption>
    </figure>

1.  Enter the term `mp4` into the "Filter" box (called "Filter URLs" on Firefox) to only display network results
    relating to the video itself.

1.  Click on the video to start playing it.
    A number of network requests will be displayed in the Inspector window; we are interested in the last one.
    <figure>
      <img src="/images/How to Download Videos with No Download Button from Canvas/filter_mp4_network_tab_of_inspector_window.png" alt="Network Requests Containing the String 'mp4'">
      <figcaption>Figure 4: Network Requests Containing the String <code>mp4</code></figcaption>
    </figure>

1.  Right-click on the last result displayed in the Inspector window, and hover the mouse over the "Copy" option in the
    drop-down menu (labelled "Copy Value" on Firefox).
    This is where the steps will diverge depending on your operating system.
    If you are on a UNIX-like system such as GNU/Linux or MacOS, click the "Copy as cURL" option in the sub-menu.
    If you are on Windows, click the "Copy as PowerShell" option.
    <figure>
      <img src="/images/How to Download Videos with No Download Button from Canvas/copy_network_request_as_curl.png" alt="Copy Network Request as cURL">
      <figcaption>Figure 5: Copy Network Request as cURL</figcaption>
    </figure>

1.  Open a terminal emulator (or PowerShell on a Windows machine) and paste the command you copied into the command
    prompt.
    If you are using `cURL`, append `-o file_name.mp4` (or `--output file_name.mp4`) to the command before hitting
    return, substituting `file_name.mp4` for the name that you wish to give the file.
    The download directory can be specified by prepending the path to that directory to the file name, otherwise it
    will default to your home directory.
    <figure>
      <img src="/images/How to Download Videos with No Download Button from Canvas/run_curl_command_canvas.png" alt="Run the cURL Command">
      <figcaption>Figure 6: Run the cURL Command</figcaption>
    </figure>
