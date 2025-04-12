+++
title = 'Tor as a Tool for Testing Fonts'
date = 2025-02-13
draft = false
tags = ["web", "programming", "article", "tutorial", "typefaces", "hacking"]
+++

A concern that may occur to you when you are designing a website is whether or not the font that you are using is "web-safe", meaning that the user will be able to render it on their end when they load your webpage because they already have that font on their device.
Web-safe fonts include the typical well-known fonts, like Times New Roman, Arial, etc.
If you are using non-web-safe fonts on your website, typically you will either define a fallback font in the CSS that is used if the user does not have the font in question and/or supply the user with the font using some kind of web font delivery service like [Google Fonts](https://fonts.google.com/) or [Font Squirrel](https://www.fontsquirrel.com/) or by packaging the font directly with the website.

I am, at present, using two different non-web-safe fonts for this website that I must supply the user with:
- <span style="font-family: EB Garamond">EB Garamond</span>, which I supply using a font delivery service;[^1]
- <span style="font-family: Gadelica">Gadelica</span>, which I supply the font files for directly bundled with the website.

Testing whether or not these fonts are being distributed correctly can be difficult, as I already have these fonts installed on my system, so they will render correctly even if the website is not distributing them correctly to the user.
There are a couple different ways to test this, such as using a different device, but one way that I've found to be particularly convenient is to use the [Tor Browser](https://www.torproject.org/download/).

The Tor Browser is a browser that intends to offer a level of anonymity and security when browsing the Internet.
The main way in which it provides this is by routing the user's traffic through a number of different nodes to obfuscate where the user's traffic is coming from, but it also employs a number of anti-browser-fingerprinting techniques to prevent the user's computer from being recognised, including managing the window dimensions and *sandboxing the user's fonts*;
because a computer could be potentially identified by the unique combination of fonts installed on the machine, a malicious website could *fingerprint* or identify a user based on the fonts available to them.
Therefore, the Tor Browser comes with a number of generic pre-bundled fonts and does not have access to any of your system fonts, making it harder to fingerprint you *and*, incidentally, working as a handy tool for checking how web-safe a font is.

If you open your website in the Tor Browser, and the fonts render as expected, you know the fonts are being supplied correctly; if the fonts do not render correctly, you not that they are not being supplied correctly.
I personally use this test all the time when setting up a website, as it's one of the handiest and simplest ways I know to test such a thing.

[^1]:   This is no longer true as of 2025-04-12: EB Garamond is now also directly bundled with the site, both in an effort to de-Google and as the original EB Garamond has superior font features to that offered on Google Fonts.
