---
layout: post
---

At one point I was going to write a post on here about why you should take your smartphone apart to replace the screen or battery, because the it makes the tech relatable. All the work Apple does to hide complexity behind a seamless glass face explodes into view the second the screen lifts up. And beware bending a ribbon cable!

(I never wrote that. I did run over my phone, granting me a second opportunity to appreciate the insides of my 3GS.)

Now I'm here say something similar: <del>you should code your own music player.</del> **I** should code **my own music player**. **You** should code **something you need and will use every day**.

I listen to a lot of ['old-time' american music](https://youtu.be/m_DgRZjHzEg?t=101). I really listen to it: over and over again on repeat. When something catches my ear, I often want to hear it for hours. (Sorry to anyone who shares earspace with me. At work I use headphones.)

It's a traditional music, often taught informally + by ear. I can't always just hit repeat in iTunes beacuse there will be a lengthy discourse before or after the music is done I don't want to hear over and over.

For a while I used [Capo][] to scratch my itch. But it's evolved into a tool that's pretty heavy-duty. It started to get slow and kick on my laptop's fans, which isn't any fun. (iTunes does the same, and even worse it always tries to sell me apps I don't want).

I've gravitated to [`cmus`][]. It plays music in the background without using much energy. With a charming command line interface to boot.

So my project of the week is writing a few scrips that bring the ability
to `mark` any given track with auditory "points of interest" and tell
cmus when it should endlessly loop one of those segments.

[Here it is](https://github.com/kjell/cmus-setup).

When I'm listening and want to dig in deep, I type `:shell
~/.cmus/scripts/set-mark <name of song>` into the cmus command line. This saves that moment in the song. I do the same thing when the interesting segment wraps up.

Then there's a `loop` command to repeatedly find the start of a segment and
play it through.

That's all I want, and now I have it. When I get my next idea,
I'll build it. (It might be `skip` to go to the next mark.)

(Bonus for reading this far about arcane music and computers: [more Dan Gellert](https://youtu.be/zP0bFNyM3zk))

[Capo]: http://supermegaultragroovy.com/products/capo/
[`cmus`]: https://cmus.github.io/
