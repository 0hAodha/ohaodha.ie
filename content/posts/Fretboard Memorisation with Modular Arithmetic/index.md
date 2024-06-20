+++
title = 'Fretboard Memorisation with Modular Arithmetic'
date = 2024-03-01T23:36:19Z
draft = false
tags = ['music', 'article']
+++

## Introduction
Memorising (or "learning") the fretboard refers to when an individual learns which musical notes correspond to what
positions on the fretboard of their instrument, a skill that is useful for playing just about any instrument that 
has frets.
In particular, "learning the fretboard" is a topic frequently discussed in guitar circles for its importance in
improvisation & soloing.
In general, the common approaches to learning the fretboard seem to consist of a combination of just committing it to
memory and using some tricks to help with that memorisation; however, I have a number of problems with this approach:
1.  **It's too much effort:** I am far too lazy to memorise the note that corresponds to up to $24 \times 6 = 144$
    positions on a 24-fret guitar (or $24 \times 5 = 120$ positions if you take account of the two $E$ strings
    being identical except for their pitch).
1.  **It doesn't translate to other tunings:** it's all well & good memorising the note that corresponds to each
    position in standard tuning, but your effort is rendered useless when you switch to a different tuning or a
    different instrument.

### Aside: What is Modular Arithmetic?
While I would encourage anyone not already familiar with modular arithmetic to read up on it in detail themselves, I'll
give a brief explanation here so that anyone can understand what I'm talking about (a good overview can be found in the
book *Discrete Mathematics -- An Open Introduction* by Oscar Levin
[here](https://discrete.openmathbooks.org/dmoi3/sec_addtops-numbth.html#iyd)).
**Modular arithmetic** refers to number systems in which the values don't get higher and higher towards infinity, but
rather wrap around and start again from 0 once a certain maximum number called the **modulus** is reached.

Perhaps the most famous example of modular arithmetic is the 24-hour clock.
The 24-hour clock starts at 0, and goes up to 23 before starting at 0 again.
There is no way to exceed 23 on a 24-hour clock.
In this sense, the 24-hour clock is an arithmetic system **modulo 24**.
If an event start at 23:00 and takes 2 hours, we don't say that it finishes at "25:00": instead, we say it finishes at
01:00 as $23 + 2 = 25 \equiv 1 \text{ mod } 24$ (25 is *congruent* to 1 modulo 24).

Modular arithmetic can also be thought of as dividing any given number by the modulus and getting the remainder.
For example, $30 \text{ mod } 24 \equiv 6 $ because $30 \div 24 = 0 \text{ remainder } 6.$

Incidentally, many resources refer to the 12-hour clock as a classic example of a system of modular arithmetic, but I think
that this is a poor example as the 12-hour clock starts at 1 and ends at 12, meaning that it's not quite modulo 12
(which starts at 0 and ends at 11) and also not quite modulo 13 (which start at 0 and ends at 12).

## My System
I realised when I was teaching myself guitar that the chromatic scale can be thought of as a system of modular
arithmetic modulo 12: there are 12 notes ($A$ through $G^\#$, including the sharps/flats).
If you assign each note a number starting with $A$ at 0 and ending with $G^\#$ at 11, you get a system of
modular arithmetic that corresponds perfectly to the frets on the $A$-string.
If you don't fret the string and pluck it, you get $A$, if you fret the string at the first fret and play it, you
get $A^\#$ (or $B^\flat$), et cetera.
If you fret the string at the 12<sup>th</sup> fret, you get $A$ again, and if you fret the string at the
13<sup>th</sup> fret, you get $A^\#$ again, in accordance with $12 \text{ mod } 12 \equiv 0$ and $13 \text{
mod } 12 \equiv 1.$
Hence, we already have a system for memorising all the notes on the $A$-string: it's just arithmetic modulo 12.
All we need to do is memorise a value for each note in the chromatic scale. 
Then, to find out what note a certain fret corresponds to, we can just find its value modulo 12, and to find a certain
note on the string, we can just look at the frets at multiples of the value of the note.

| $A$ | $A^\#$  / $B^\flat$ | $B$ | $C$ | $C^\#$ / $D^\flat$ | $D$ | $D^\#$ / $E^\flat$ | $E$ | $F$ | $F^\#$ / $G^\flat$ |  $G$ | $G^\#$ / $A^\flat$ | 
|-----|---------------------|-----|-----|--------------------|-----|--------------------|-----|-----|--------------------|------|--------------------|
| $0$ | $1$                 | $2$ | $3$ | $4$                | $5$ | $6$                | $7$ | $8$ | $9$                | $10$ | $11$               |

This same system can actually be generalised to all the other strings on the guitar with little adaptation.
The only difference is that we need to remember at what number on the scale each string starts and add this to the
number of each fret on that string to get the integer value corresponding to the note at that fret.
Take for example one of the $E$ strings: this string is tuned to the note $E$ (which has value 7).
To find out what note is at the 5<sup>th</sup> fret of the $E$ string, we use the same approach as with the $A$
string, but add the value that the string starts at to the fret number before getting its value modulo 12: 
$7 + 5 = 12 \text{ modulo } 12 \equiv 0$, indicating that the note at the 5<sup>th</sup> fret of the $E$ string
is an $A.$

This approach can be generalised into a formula for any string in any tuning, provided that it has frets that go up in
steps according to the 12 notes of the chromatic scale:
$$
v \equiv r + f \text{ modulo } 12
$$
where $v$ is the value of the note at that fret, $r$ is the "root value" of the string (i.e., the value of the
note to which the string is tuned), and $f$ is the fret number.

This might appear quite complicated at first glance due to the formulae, but it's actually quite simple once you've
memorised the values.
This system of fretboard memorisation can be generalised to any tuning, any number of strings, and any number of frets.
Furthermore, I would submit that this is actually also the most correct system, as it gets straight to the reasons *why*
a fret is a certain value: simply because of the number of increments it is from the note that the string is tuned to.


### Advantages of My System
-   Requires only the memorisation of 12 key-value pairs, one for each of the musical notes, in contrast to the up to
    144 positions that have to be memorised for the more conventional approach.
-   It's tuning-agnostic: you don't have to learn anything new to have the fretboard memorised in different tunings, you
    just need to know the "root value" that each string is tuned to.
-   The number of strings don't matter: you don't have to learn anything new to have the fretboard memorised for a 6, 7,
    8-string guitar or even a different instrument so long as it has frets at semi-tone intervals.
-   It could be adapted to a microtonal instrument so long as it has frets and that the intervals between the
    micro-tones is consistent, although this would require memorising an entirely new set of key value pairs.


### Drawbacks of My System
-   It requires pre-existing knowledge of modular arithmetic and the ability to quickly do mental calculations modulo 12. 
    While this may seem overly-complicated to someone not familiar with modular arithmetic, modular arithmetic is
    actually quite simple once you get your head around it, and is worth learning for its applications in mathematics
    such as in encryption.
-   It still requires that you memorise 12 key-value pairs, one for each of the musical notes, although this is
    considerably less memorisation that the conventional approach.
-   It is not applicable to fretless instruments, such as fretless guitars, cellos, violins, etc.


While I'm sure that I'm not the first person in music history to think of this strategy, I have never seen it mentioned
anywhere online or in print, so I'm sharing it here in the hope that it will be useful for others as it was for me.

