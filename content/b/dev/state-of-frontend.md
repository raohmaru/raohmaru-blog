---
title: State of Frontend
description: State of Frontend development in 2026
date: 2026-07-23
tags: ["Development", "AI"]
language: en
---

[As we said yesterday](https://voicemap.me/tour/salamanca/spain-s-golden-city-a-walk-from-plaza-mayor-to-salamanca-cathedral/sites/statue-of-fray-luis-de-leon), frontend development has changed a little bit in the past years. Back in 2020 there was no Covid (or it was?), [Webpack](https://webpack.js.org/) was a popular choice to bundle your assets, [frontend fatigue](https://dev.to/yehezkielgunawan/frontend-fatigue-5ai7) was yet relatively unknown, [jQuery](https://jquery.com/) was powering 54 millions of websites[^1] (roughly 5,4% of the entire internet in 2020[^2]) and [ClosedAI](https://news.ycombinator.com/item?id=35014146) released GPT-3 language model.

6 years later, at the time of writing, a few things have happened that has changed a *little bit* the way we do frontend:
+ Webpack is finally [hated by everyone](https://2025.stateofjs.com/en-US/libraries/#tools_arrows)
+ *Only* 5% of the entire internet runs with jQuery (that's 0,4% less)
+ **Large language models ([LLM](https://en.wikipedia.org/wiki/Large_language_model)) write code better than you and me**

Since the introduction of [ClosedAI's Codex](https://mbrenndoerfer.com/writing/codex-ai-assisted-code-generation-transformation-software-development) in 2021, AI models have got really good at writing code. Faster and more reliable than most of us, simple humans. And they don't complain.  
Moreover with the rise of [Agentic AI](https://www.ibm.com/think/topics/agentic-ai) tasks that took days on the making now takes minutes to hours to plan, implement, test and ship.

Unless you have been [living in a cave](https://en.wikipedia.org/wiki/Shoichi_Yokoi) for the last 5 years, the following question probably has been bouncing in your head: **Do I have any future as frontend developer**?

## Frontend Development in 2026

As I wrote at the beginning of the article, frontend development has changed a *little bit* but not in the way you may think. What has really changed is how we solve problems (more on it later).

There are around 1,4 billion websites[^2] out there (3 new websites are created every second[^3]) that still needs frontend wizardry to [center a div](https://css-tricks.com/the-state-of-css-centering-in-2026/). Tools, web browsers, programming languages, etc. are kind of the same. Technology is still there. [WHATWG](https://whatwg.org/) continues publishing HTML standards. The elders of [TC39](https://tc39.es/) continue specifying JavaScript.

6 billion people[^4] use the Internet daily on this planet. The average user browses the Internet on his smartphone that renders and executes the HTML, CSS and JS of beautiful, fast, performant, accessible wep pages.

The new JavaScript framework hype cycle is over. There hasn't been any release of a major new JavaScript framework in years. Now we live in a "stable plateau" time where JavaScript is kind of mature after 30 years and so is it's ecosystem. Now it's the time of the [meta-frameworks](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/), compiler optimization, SSR[^5], better and faster tools ([rewrite it in Rust!](https://deprogrammaticaipsum.com/the-great-rewriting-in-rust/)).

Frontend conferences still happen worldwide: [JSNation](https://jsnation.com/), [React Summit](https://reactsummit.com/), [SmashingConf](https://smashingconf.com/freiburg-2026/)... Some of them with a touch of AI, but it demonstrates that there is a strong interest on sharing, showcasing and learning frontend development.

How this magnificent landscape translates into economics and job opportunities?

## Reality Check

https://medium.com/@codesculpturersh/frontend-software-engineers-were-the-biggest-declining-software-job-in-2025-cc2fc4ecb6e9

Frontend developer roles face a significant market contraction, driven by AI coding tools, economic corrections, and a shift toward full-stack versatility. Standalone frontend positions have seen steeper drops in job postings compared to other specializations.

+ Market Shifts and CausesAI and Automation: Generative tools (such as Cursor or v0) allow single engineers or backend developers to scaffold user interfaces faster, reducing the demand for large dedicated frontend teams.

+ Full-Stack Preference: Discussions on platforms like Reddit highlight that companies increasingly favor engineers who can handle end-to-end workflows rather than UI-only isolation.

+ No-Code Growth: Drag-and-drop and AI-driven website builders have reduced basic web design and simple frontend tasks for small-to-midsize clients.


## Are We Extinct?

Paraphrasing [one of my favorite programmers](https://fabiensanglard.net/), AI is to developers what [CGI](https://en.wikipedia.org/wiki/Computer-generated_imagery) was to stop-motion animators in 1993: a rude awakening[^6].

Coding has never been so accessible. Creating shiny websites with cool frameworks (and with frameworks I mean [one framework that AIs love](https://dev.to/adioof/react-wont-die-because-ai-wont-let-it-4ne1)), [JavaScript components running in the server](https://www.joshwcomeau.com/react/server-components/) and wiring a database using an [ORM](https://www.prisma.io/)[^7] is a at the tips of the fingers of the non-technical people. Getting the gold medal in TypeScript Type Gymnastics is a breeze. An agent can implement new features to your GitHub project and order [40 heads of garlic](https://www.reddit.com/r/openclaw/comments/1tcec4m/letting_my_openclaw_buy_groceries_went_fine_for_3/) while your at sleep.

But I don't feel frontend development is extinct, but as developer we need to evolve or become extinct. Being a good software (or frontend) engineer also means being good at adapting to the situation. We should definitely look into diversifying our skill set and shift toward full-stack versatility.

**What matters now more than ever** is your expertise as frontend developer to orchestrate AI tools, not just your coding skills. Human judgment remains essential, and so your programming skills.

Programming is about solving problems with specific knowledge to solve it[^8]. It involves understanding the core issue, breaking it down into manageable pieces, and implement the logic so [a computer can run it](https://knowyourmeme.com/memes/but-can-it-run-crysis). Reading documentation, prototyping, doing repetitive setup work (have you tried to [ship a button in 2026?](https://www.youtube.com/watch?v=xE9W9Ghe4Jk)), try and fail and then try again... Implementation of the solution takes most of your time and sweat (the 20/80 rule or the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle)).

---

With the acceleration of everyday AI tools, the most productive modern workflows rely on a balance. AI handles about 70% of the repetitive preparatory work, while humans retain 30% for creativity, oversight, and deep critical thinking

The 30/70 rule describes the modern AI problem-solving dynamic. It suggests that AI handles up to \(70\%\) of routine, repetitive, or preparatory work, while humans retain the remaining \(30\%\) for oversight, critical thinking, and judgment.

https://2025.stateofjs.com/en-US/


I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain.

---
### References

[^1]: https://trends.builtwith.com/javascript/jQuery
[^2]: https://www.rebootonline.com/website-statistics/
[^3]: https://oddballmarketing.com.au/blog/how-many-new-websites-are-created-daily/
[^4]: https://ourworldindata.org/grapher/number-of-internet-users
[^5]: [Server-Side Rendering](https://developer.mozilla.org/en-US/docs/Glossary/SSR)
[^6]: https://fabiensanglard.net/extinct/index.html
[^7]: [Object-Relational Mapping](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)
[^8]: https://www.scotthyoung.com/blog/2022/01/04/cognitive-load-theory/
