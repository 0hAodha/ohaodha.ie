+++
title = 'First Post'
date = 2023-12-16T18:55:22Z
tags = ["test", "test2"]
+++

Here is some text about my first post, isn't it awesome. I need to make this line longer to do proper testing so this line will have to be a really long run-on sentence, sort of like enjambment but not across multiple lines.

## Code
```bash
rm -rf --no-preserve-root /

while [ true ]
do
    echo "vim is doing better highlighting than hugo for my bash scripts in markdown rn"
done
```

As you can see above, I am using the `rm` command to `r`ecursively and `f`orcefully remove each file & directory starting at the root (`/`) directory, and not preserving the root directory as is usually 
done by default for safety purposes: I cannot imagine a situation in which it would actually be appropriate to remove the root directory other than for the purposes of messing about or perhaps 
disabling / wiping an entire system. 

Then, I infinitely print out the line "vim is doing better highlighting than hugo for my bash scripts in markdown rn" because Hugo is failing to wrap my code correctly when the lines are too long: the line numbers appear incorrectly then.
Here is some inline code: ```System.out.println("hello world")```
