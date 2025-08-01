+++
title = "`inutility_scripts`: Scripts That Don't Do Anything Useful"
date = 2025-08-01T15:45:45+01:00
draft = false
tags = ["hacking", "linux", "programming", "shell"]
+++

## Introduction
Roughly two years ago now, I created my [`utility_scripts`](https://github.com/0hAodha/utility_scripts) repository on GitHub, which contains all the scripts that I've written for use on my GNU/Linux laptop.
These scripts are generally short, useful scripts, that make basic tasks on my computer easier, ranging from creating dynamic menus to select [Bluetooth devices](https://github.com/0hAodha/utility_scripts/blob/main/src/bluetooth_dmenu.pl) or [WiFi networks](https://github.com/0hAodha/utility_scripts/blob/main/src/wifi_dmenu.sh) to connect to, to listing the [count of open windows on a workspace](https://github.com/0hAodha/utility_scripts/blob/main/src/bspwm_window_count.sh) or [connected Bluetooth devices](https://github.com/0hAodha/utility_scripts/blob/main/src/bluetooth_info.pl) in the status bar of my desktop, and more.
Originally a copy of my `~/scripts/` directory, the repository now lives with all my other GitHub repositories at `~/code/github/0hAodha/utility_scripts/` and `~/code/scripts/` is symlinked to the `utility_scripts/src` directory, and is in my `$PATH`, so any of these scripts are accessible as commands on my system.

However, I eventually found that the `utility_scripts` repository was restrictive in content:
it was restricted to containing only *useful* scripts, and I had a number of scripts that I wanted to share that I couldn't in good faith describe as "useful", and so I created a new repository named `inutilty_scripts`: a collection of miscellaneous scripts that don't do anything useful.
These scripts are ones that I consider interesting (often proofs of concepts), but that I have yet to find any practical use for.
Some of these scripts are entirely useless, but others demonstrate some interesting concept that I think *could* potentially be useful if the right situation arose.

## `inutility_scripts`
### `recursive.sh`
[`recursive.sh`](https://github.com/0hAodha/inutility_scripts/blob/main/src/recursive.sh) is a script that calls itself, recursively.
While I can't think of any uses for this, I don't find it particularly difficult to imagine that a recursive shell script *could* be useful for some task or another, as recursion has many useful applications with regards to function calls.

```shell
#!/bin/sh
# A script that calls itself

recursion_count=${1:-0}
echo "Recursion number $recursion_count"
$0 $((recursion_count + 1))
```

![Screenshot of the output of recursive.sh](./images/recursive.png "Output of `./recursive.sh`" )

This script also makes use of some interesting POSIX shell features:
to demonstrate that recursion is indeed occurring, the script prints the `recursion_count` for each invocation, using parameter expansion & default value substitution to set the value of the `recursion_count` variable to the first positional argument supplied to the script invocation (`$1`), if present, or `0` if `$1` is unset.
It also exploits the fact that the `$0` variable contains the filename with which the shell was invoked[^1], i.e., the script file itself, and uses the value of that variable as a command within the script.

![/bin/sh: warning: shell level (1000) too high, resetting to 1](./images/recursive_limit.png "`/bin/sh: warning: shell level (1000) too high, resetting to 1`" )

Something interesting also happens when the recursion count hits 996:
a message is displayed which says `/bin/sh: warning: shell level (1000) too high, resetting to 1`.
The variable `$SHLVL` is incremented for each new instance of the shell spawned[^2], and thus tells you the current level of shell nesting.
If you run `echo $SHLVL` in an open terminal window, you'll probably get either `1` or `2` as your output:
- `1` will be your output if this shell session is the first one spawned for your session, that is, a shell wasn't automatically spawned when you logged in;
- `2` will be your output if a login shell was automatically started when your user was logged in.

On my system, I get an output of `3`: one of these shells being my login shell, the other being the terminal window that I have open, and the third probably being spawned by the `zsh` plugins I source in my configuration, although I've never bothered to actually track down the what exactly is causing it.
This explains why the recursion count hits `996` before the shell level reset warning is displayed:
the shell level is reset to `1` once it hits `1000`, and 1,000 shells can be accounted for by adding the 3 that we know are extant when a terminal window is opened on my system, and the 997 shells spawned by the `recursive.sh` script (recalling that the first call of the script the `$recursion_count` is `0` so the number of shells is the `$recursion_count` plus 1).


### `self_destruct.sh`
[`self_destruct.sh`](https://github.com/0hAodha/inutility_scripts/blob/main/src/self_destruct.sh) is the simplest of inutility scripts, and simply deletes itself.

```shell
#!/bin/sh
# A script that deletes itself

rm "$0"
```

![Screenshot of the before & after of self_destruct.sh](./images/self_destruct.png "Before & after of `./self_destruct.sh`" )

Similar to `recursive.sh`, it exploits the `$0` variable, and simply deletes the file at the filepath contained within that variable.
Since the script is under Git version control, it can easily be brought back after execution (in both senses of the word) by running `git restore self_destruct.sh`.

I can imagine a potential use for this self-destructive functionality being to ensure that a script is ran precisely once and never again, or perhaps to try and cover the tracks of a malware attack by deleting the malicious file as soon as possible to avoid detection. 

Interestingly, it's possible to delete a script while it's executing without interrupting execution at all.
Originally, I had assumed that, since shell scripts are only interpreted line-by-line (with a few exceptions), deleting a script while it's executing would halt execution, so when I discovered that this was not the case, I imagined that this meant that the entire script was read into memory before execution, but this isn't the case either...

Most people are probably aware that deleting a file on a UNIX system (or pretty much any computer for that matter) doesn't actually destroy the data contained within that file:
instead, deleting a file removes the **directory entry**, which is the mapping of the filename to its **inode**[^3] which is the underlying data structure used by the file system to store the file's metadata and pointers to the data blocks at which the actual file data is stored on disk.
When there are no longer any filenames (or *links*) pointing to the inode, the file is considered unreachable and data blocks are marked as **free**, allowing them to be deallocated & overwritten.

However, if a process has a file open, it continues to have a reference to that file's inode, regardless of file deletion or renaming.
Thus, the process can continue to read from that file even after it has no extant links in the file system.
The deleted file's data blocks cannot be deallocated until the process has closed the open file descriptor.

I wrote a short script called `test.sh` to demonstrate this:
```shell
#!/bin/sh

echo "Step 1"
sleep 1
echo "Step 2"
sleep 1
echo "Step 3"
sleep 1
echo "Step 4"
sleep 1
echo "Step 5"
sleep 1
echo "Step 6"
sleep 1
echo "Step 7"
sleep 1
echo "Step 8"
sleep 1
echo "Step 9"
sleep 1
echo "Step 10"
sleep 1
```

(Obviously, this script would make more sense as a `for`-loop if it served some practical purpose, but the point here is to demonstrate that lines that had not yet been reached when the file was deleted are still executed, which would not be demonstrated if a `for`-loop was used.)
If the script is deleted mid-execution, we can see that execution is not interrupted:

![Screenshot of test.sh being deleted mid-execution yet continuing to run unaffected](./images/test.png "Screenshot of `test.sh` being deleted mid-execution yet continuing to run unaffected" )

We can also use [`lsof(8)`](https://www.man7.org/linux/man-pages/man8/lsof.8.html) to list the open files on the system to see that the executing process retains a file descriptor for the deleted file:

![Screenshot of the output of `lsof | grep test.sh` after deletion of `test.sh` mid-execution](./images/lsof.png "Output of `lsof | grep test.sh` after deletion of `test.sh` mid-execution" )

Thus we know that a shell script will continue to execute even if its source file is deleted, because it retains an open file descriptor for that file from which it can read its contents until termination.

### `disappearing.sh`
[`disappearing.sh`](https://github.com/0hAodha/inutility_scripts/blob/main/src/disappearing.sh) is a script that disappears from the filesystem (or, more precisely, the directory entries) during execution and re-appears once it has finished executing.
It is something of a natural follow-on from `self_destruct.sh` in that it is a script that deletes its own source code, and also because it exploits the fact that a script will continue to execute uninterrupted even if its source file is deleted. 

```shell
#!/bin/sh
# Script that deletes its source code while executing and replaces it when exiting, hence "disappearing" while running and re-appearing once finished

file_contents=$(cat "$0")
rm "$0"

for i in $(seq 1 10); do
    echo "Doing something invisible"
    sleep 1
done

echo "$file_contents" > "$0" && chmod +x "$0"
```

Like `self_destruct.sh`, it exploits `$0` to delete its own source code, but it also uses `$0` to read its source code into a variable called `file_contents`, which it then `echo`es into the filepath defined by `$0` and makes said file executable before finally exiting.

![Screenshot of `disappearing.sh` being executed, including the output of `ls` before, after, and during its execution](./images/disappearing.png "Output of `disappearing.sh`, including the output of `ls` before, after, and during its execution")

Of course, the script hasn't truly disappeared from the filesystem, only the directory entries, as the remaining open file descriptor can be seen with the use of `lsof`:

![Screenshot of the output of `lsof | grep disappearing.sh`](./images/grep_disappearing.png "Screenshot of the output of `lsof | grep disappearing.sh`")


### `suicidal.sh`
[`suicidal.sh`](https://github.com/0hAodha/inutility_scripts/blob/main/src/suicidal.sh) is a script that kills itself, that is, its own process.

```shell
#!/bin/sh
# A script that kills the process that's executing it, i.e. itself

pkill "$(basename "$0")"
```

Similar in "function" (I use the word lightly) to `self_destruct.sh`, it also uses the `$0` variable;
it finds the name of the script by running the [`basename`](https://www.man7.org/linux/man-pages/man3/basename.3.html) command with this `$0` variable, and uses [`pkill`](https://linux.die.net/man/1/pkill) to kill any process executing with that name, i.e., itself.

![Screenshot of the output of ./suicidal.sh](./images/suicidal.png "Output of `./suicidal.sh`")

Try as I might, I cannot think of a single situation in which this would be useful;
one might think that this could potentially have some use in killing a script if some error is encountered, but there's nothing that this approach achieves that the `exit` command wouldn't.
Perhaps, in a very contrived situation, you might have a script that must only ever have one instance of itself running at a time, and if it is detected that there are multiple instances running, they will all need to be killed to prevent some catastrophic scenario, and in that situation this snippet would be useful;
however, I would suggest that a mutex or semaphore of some kind would likely be a far better solution to prevent this situation from arising.


### `trippy.sh`
[`trippy.sh`](https://github.com/0hAodha/inutility_scripts/blob/main/src/trippy.sh) is, in my opinion, by far the least useful script in this repository: it simply writes random data to the user's display in an infinite loop, creating visuals that a hip and cool youngster such as myself[^4] might describe as "trippy".

```shell
#!/bin/sh 
# Script to display random data to the screen. To be ran from a TTY, as a user who has write privileges to the fb0 device

while [ true ]; do
    cat /dev/urandom > /dev/fb0
done
```

It makes use of the `/dev/urandom` device as a source of random data which, unlike its sister `/dev/random`, never blocks, even if entropy is low, which makes it more suitable for our purposes[^5].
It also makes use of the **frame buffer device** `/dev/fb0`, which provides an abstraction for the graphics hardware, allowing software to write data to be displayed on a graphics device in a hardware-independent manner;
this is the interface used by the X11 graphics server to control the user's display. 

Running the script requires write privileges to the `/dev/fb0` device (typically held only by the root user) and that there is no GUI session that is overriding the frame buffer, like an X11 server.
Therefore, the script cannot be executed from an ordinary terminal window within a graphical session and must instead by run from the TTY.
The GIF below is a screen recording of the script being executed on an Alpine Linux virtual machine in QEMU:

![Animated GIF of the output of ./trippy.sh](./images/trippy.gif "Output of ./trippy.sh")

[^1]: [`bash(1)`](https://www.man7.org/linux/man-pages//man1/bash.1.html) § <span style="font-variant: small-caps">arguments</span>
[^2]: [`bash(1)`](https://www.man7.org/linux/man-pages//man1/bash.1.html) § Shell Variables
[^3]: The etymology of the term is forgotten: see [inode - Wikipedia § Etymology](https://en.wikipedia.org/wiki/Inode#Etymology)
[^4]: "Hip and cool" youngsters are famously known to refer to themselves as such.
[^5]: On modern systems, the behaviour of `/dev/random` and `/dev/urandom` are virtually indistinguishable. Historically, `/dev/random` would block if there was not sufficient entropy in the system to generate sufficiently random data, whereas `/dev/urandom` would re-use its internal state along with a **cryptographically secure pseudo-random number generator (CSPRNG)** to avoid blocking. In modern systems, however, `/dev/random` usually blocks at startup until sufficient entropy has been gathered, and then unblocks permanently, making its behaviour past boot indistinguishable from `/dev/urandom`.

