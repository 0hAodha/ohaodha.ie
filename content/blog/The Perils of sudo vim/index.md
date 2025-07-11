+++
title = 'The Perils of `sudo vim`'
date = 2025-07-11T13:14:53+01:00
draft = false
tags = ["linux", "cybersecurity", "article", "programming", "shell", "hacking", "vim"]
+++

## Introduction
On a UNIX-like system, one often has the need to edit a write-restricted file and thus to escalate one's privileges to do so;
the obvious approach that might initially occur to you is to use `sudo vim` or `sudo $EDITOR` to edit the file with superuser privileges, but this is inadvisable for a number of reasons, the majority of which boil down to the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege): root privileges are needed only for writing to the file --- there is no need to run the entire editor process as `root`.

Throughout this blog post, I make repeated reference to Vim as it is the most popular terminal text editor, but the points discussed in this blog post are true for any text editor, terminal or otherwise, if being used to edit write-protected files.

## The Risks
On a single-user system, such as a personal computer, running your text editor as `root` isn't a massive problem, and is *probably* fine[^1] 99.99% of the time;
however, you'll find that running `sudo vim` will execute Vim with the default configuration and none of your personalisation specified in your `~/` directory, as these configurations are not associated with your `root` user.
You can either simply do without these configurations (which I would strongly recommend), or copy your configuration files into your `root` user directory (which I would strongly discourage):
if you have any plugins installed that execute in the background as you use your editor, these will be executed as `root` also, meaning that you're putting a lot of faith in the authors of these plugins to assume that it's safe to execute their programs as `root` on your computer.
The risk here is not just that there may be some malicious code hidden in the plugin:
it's equally possible that a simple bug or mistake in the program, that would ordinarily be of little consequence, could cause catastrophic damage to your system as the error executed with root privileges.

The real risk, however, associated with `sudo vim` is on a multi-user system:
`sudo` configuration, in keeping with the principle of least privilege, allows a system administrator to specify certain commands that a user may run with root privileges, while preventing them from running other commands as `root`;
therefore, if a user just needs to edit a few write-protected files for configuration purposes, it might be tempting to give them `sudo` privileges with which to run the `vim` command, but this introduces a massive privilege escalation vulnerability.
Now that you've given the user the ability to execute `vim` as `root`, any other process that they spawn from within `vim` will also be running as `root`:
if they simply enter the Vim command `:term` to spawn an interactive shell within Vim, they will then have full, unrestricted access to a `root` shell on your system, something which cybersecurity experts describe as "very bad".

![The `:term` command being used to spawn a shell as `root` within Vim](./images/term.png "The `:term` command being used to spawn a shell as `root` within Vim")

## The Alternative: `sudoedit`
Fortunately, there is a very simple solution to these problems that I've raised: [`sudoedit`](https://www.man7.org/linux/man-pages/man8/sudoedit.8.html).
Instead of running your text editor as `root`, `sudoedit` copies the file that you want to edit to a temporary location and opens that file with your default text editor (usually specified by `$EDITOR` or `$VISUAL`), with your normal user privileges, and once you have quit and are finished editing, copies the modified file to overwrite the original.
Thus, you can edit write-protected files with all your text editor configurations continuing to work as usual, and you prevent any privilege escalation of the processes running within that editor, and you prevent the users of that editor from executing arbitrary commands as `root`.

Something to be careful of, however, when using `sudoedit some_file` (or its alias `sudo -e some_file`), is that writing the contents of your buffer (such as entering `:w` in Vim) will only write the contents to the temporary file location, and will not apply them to the actual file you wish to edit;
to apply the changes, you must write your changes *and* quit the editor (`:wq` or `ZQ` in Vim);
for example, it has happened to me in the past that I've been using `sudoedit /etc/hosts` and expecting my changes to apply in real-time, but when I've tested my new configuration, nothing has changed, because I did not close the editor once I was finished making my changes --- my changes had been saved to the temporary file with `:w`, but had not been applied to the actual `/etc/hosts` file.

## What if I use `doas`?
As a former [`doas`](https://man.openbsd.org/doas) contrarian myself (and likely future `doas` contrarian when I eventually abandon Arch Linux), I'm sympathetic to the plight of the `doas` users who, in the true spirit of Free & Open Source Software, make their lives needlessly far more difficult for symbolic purposes, in this case, in the battle against "bloat".
`doas`, being truly minimalistic, has no such alternative to `sudoedit`, but you still shouldn't run `doas vim`:
instead, you should perform the same steps that `sudoedit` performs yourself, and copy the original file to a temporary location, edit that temporary file, and overwrite the original with the temporary file when you're finished.
There are shell scripts which automate this for you online ([`github.com/TinfoilSubmarine/doasedit`](https://github.com/TinfoilSubmarine/doasedit)), but I would recommend against using such options, or making your own:
the reduced attack surface given by the minimalism of `doas` is rendered null & void if you start increasing the attack surface with random scripts you find online, and you'd be far better off just using `sudo` at that point.


[^1]: I would not be surprised if the words "probably fine" have preceded every major cybersecurity incident of the past 20 years.

