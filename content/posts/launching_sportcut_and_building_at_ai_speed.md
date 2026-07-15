---
title: "Launching SportCut and Building at AI Speed"
date: 2026-07-15T11:50:33-04:00
description: "A candid look at SportCut's first six weeks, the economics behind the launch, and how the latest AI models are changing the way I build software."
tags: ["sportcut", "entrepreneurship", "ai", "claude", "codex", "software-development"]
categories: ["blog", "entrepreneurship"]
draft: false
---

There are two things I have been thinking about lately: launching a new venture with a friend and the huge jump in capability I am seeing from the latest AI models. They might sound like separate topics, but for me they are closely connected. The second has made it possible to build and improve the first at a speed I could not have imagined a few years ago.

## Launching SportCut

On June 2, 2026, we officially launched [SportCut](https://sportcut.com/), an all-in-one platform for sports organizations, athletes, and college coaches.

On the business side, organizations can manage recruiting, registrations, events, tryouts, teams, and athlete film. Athletes can register for events, join teams, watch their film, build their profiles, and get recruited. College coaches are also beginning to join the platform, where they can discover players, review profiles, and register for events.

That combination is what makes the platform exciting to me. It is not just software for running events or a standalone recruiting database. The different sides of the sports ecosystem can all use the same platform and benefit from one another.

## The First Six Weeks

As of this post, SportCut has processed more than $253,000 in sales. Those sales have produced a little over $10,000 in platform revenue. My business partner receives 70% of that revenue and I receive 30%, so I have made a little more than $3,000 in roughly six weeks.

I am genuinely happy with that start. At the same time, I always have the economics in the back of my mind. Based on the hours I put into building the platform, I would estimate that I invested between $10,000 and $15,000 worth of my own time. We still need to process significantly more sales before my share of the revenue breaks even with the value of that work.

That does not take away from what we have accomplished, but it keeps the early numbers in perspective. Revenue is exciting; understanding what it cost to generate that revenue matters too.

## The Part After Launch

Launching also does not mean the work is finished. Customers find bugs. New clients need help learning the platform. People ask for features and changes we did not anticipate. Then there are all the day-to-day issues that only appear once real people start depending on what you built.

That has probably been the biggest reminder for me: building the product is only one part of building the business. Support, onboarding, reliability, and deciding which requests to prioritize are now just as important as writing code.

I do not expect SportCut to replace my day job anytime soon. The sales volume would have to grow substantially for that to happen. Still, the potential is there, and it is satisfying to see something we built already generating real value for customers and real revenue for us.

## The Models Are Getting Seriously Good

The other thing I cannot stop thinking about is how quickly the AI models from Anthropic and OpenAI are improving. I have recently been using models including Claude Fable 5, Claude Opus 4.8, Claude Sonnet 5, and GPT-5.6. The increase in speed, reasoning, and tool use is hard to ignore.

The connectors are a major part of that. My favorite is the Chrome DevTools MCP server, which lets an agent work with the browser and help debug live sessions. I also use integrations with Supabase, Clerk, and Stripe. Together, they let the models inspect more of the actual system instead of guessing from an isolated code snippet.

The larger context windows make a difference too. These models can work across substantial codebases, keep track of how different pieces fit together, and stay useful through larger changes. Between their speed and their growing ability to reason through a project, I feel much more confident shipping new features than I did before.

Not long ago, I was impressed by Claude Sonnet 3.5 and the original Claude Opus 4. Now Opus 4.8 and Sonnet 5 are faster, stronger with tools, and much better at coordinating subagents and longer-running work. The pace of improvement is remarkable.

## How I Use Claude and Codex Together

One of the biggest surprises has been how quickly OpenAI's Codex has caught up with Claude Code. I now use Codex for many of the largest changes because it is extremely thorough. It approaches problems like a pragmatic programmer who wants to understand the issue deeply and get the implementation right.

I do not treat any one model as the final authority, though. I like using Claude and Codex back and forth, asking each to review the other's changes. That extra review helps catch mistakes and gives me another perspective on whether an implementation actually makes sense. Then I use the browser tools to test the real flow rather than assuming that code which looks correct is functionally correct.

That combination—implementation, independent review, and browser testing—has become a core part of how I work.

## These Tools Are Not Just for Programmers

At this point, I think almost everyone should be learning how to use these tools in some part of their job. The learning curve can still be steep if you have no programming experience and begin with a command-line interface, but the desktop apps on Windows and macOS are making them much easier to use. You can already delegate meaningful work across files, apps, and the browser without needing to become a developer first.

I would not blindly trust an AI with sensitive financial actions, but I would absolutely use one to analyze data, explain patterns, summarize information, or help me think through a decision. The important part is understanding where human review still belongs.

It is honestly difficult for me to imagine how different my career would look without these tools. Their rate of improvement gives me a lot of hope for what comes next.

## What Happens When the Limits Disappear?

Right now, a relatively small monthly subscription gives me access to capabilities that would have seemed impossible not long ago. I am easily getting my money's worth, even with five-hour and weekly usage limits.

The bigger shift will come when models this capable can run locally on a normal laptop or desktop, without expensive hardware and without restrictive usage caps. Once that happens, people will be able to experiment and build continuously at a much larger scale.

We are already seeing developers reverse-engineer proprietary software, create open-source alternatives, and find solutions much faster than before. Removing the cost and usage constraints will accelerate that even more.

SportCut is a small example of what this new way of building makes possible. We launched a real platform, processed meaningful sales, and can respond to customers faster because the tools around software development have improved so dramatically. The business still has a long way to go, and the technology still needs plenty of human judgment, but I am incredibly impressed by where both are headed.

That is my rant for the week.
