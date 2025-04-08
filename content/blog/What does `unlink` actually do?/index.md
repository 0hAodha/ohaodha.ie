+++
title = 'What Does `unlink` Actually Do?'
date = 2025-04-08T00:57:13+01:00
draft = false
tags = ["linux", "shell", "programming", "article"]
+++

Although I now forget the context, a friend once sent me a snippet of shell code that he was using to remove [symbolic links](https://www.man7.org/linux/man-pages/man1/ln.1.html) to files on his computer, using a shell command that I had never seen before: [`unlink`](https://www.man7.org/linux/man-pages/man1/unlink.1.html).
I, like him (and presumably like you if this is your first exposure to the command), assumed that this command is used to remove links to files on a UNIX-like system.
This is quite an understandable assumption, as the name of the command quite literally implies that it undoes links, but more importantly because *it works*;
if you run `unlink path_to_some_link` on a link to a file (symbolic or otherwise), the link will be removed.
It seems to me that quite a lot of people use `unlink` to remove symbolic links to files, and it works perfectly well despite the command not being the link-remover that it appears to be at first glance.

In reality, `unlink` is not a link-remover (in that sense):
instead, it is an interface to your system's [`unlink` function](https://www.gnu.org/software/libc/manual/html_node/Deleting-Files.html#Deleting-Files), which is how files are deleted "under the hood" on UNIX-like systems.
This is why it works perfectly well for deleting links on your computer: it deletes *any* file it's directed to, regardless of whether or not it's a link to another file.
Strictly speaking, the `unlink` command (like the `rm` command) removes a name for a file in the filesystem, and if that name is the last renaming name for the file in that filesystem, the file will be deleted entirely;
if there are other names for the file in the filesystem (if, say, a hard link has been created), then the file will remain in the filesystem until all of its names are removed or `unlink`ed.

The `unlink` syscall is how the `rm` command works under the hood:
in this sense, the `rm` and `unlink` commands do exactly the same thing, just with slightly different interfaces.
So, while it's not wrong to delete links to files using the `unlink` command, it *is* wrong to think that `unlink` is necessary to delete links to files or that it's the correct way to delete links to files.
The only difference between the two commands is the interface: `rm` has more options and can delete multiple files at a time, whereas `unlink` just deletes a single file.
