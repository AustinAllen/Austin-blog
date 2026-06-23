---
layout: project_views
giscus_comments: true
title: "Pocket Robot Project"
description: A design exploration of the next-generation pocket companion robot — an always-with-you AI character built on a tight on-device/cloud agent loop, real memory, and human-centered guardrails. Inspired by living.ai's EMO and AIBI, grounded in my social-robotics work on Pepper and NAO.
img: assets/img/pocket-robot.jpg
importance: 2
category: engineering
mermaid:
  enabled: true
  zoomable: true
---

A **pocket companion robot** is the idea I can't stop turning over: a small AI *character* you carry
with you — not a phone app, not a smart speaker, but something with a face, a personality, and a sense
of being *along for the day*. Products like [living.ai](https://living.ai/)'s **EMO** and **AIBI**
(which I wrote up in my [notes post]({% post_url 2026-06-23-notes-living-ai-pocket-robots %})) prove
the category is real. This is my **concept exploration** of where it should go next.

It's a design project, not a product — a place to think out loud, grounded in having actually built
companion robots before.

## Why I care about this one

I spent years at SoftBank building [Pepper and NAO]({{ '/projects/pepper-nao-ai/' | relative_url }}) —
social robots with face recognition, emotion detection, and dialogue. The pocket robot is the *same
design problem* shrunk to something you can hold: how do you make a machine feel like a believable,
trustworthy companion? The hard part was never the sensors. It was the **personality and the trust.**

## The concept: a pocket-sized agent loop

The interesting part isn't the hardware — it's treating the device as an
[AI agent]({% post_url 2026-06-17-what-is-an-ai-agent %}) with a hard constraint: it lives in your
pocket, so it has to be **fast, private, and useful offline**, and only reach for the cloud when it
truly needs the horsepower.

```mermaid
flowchart TD
    U["You + your day<br/>(voice, face, context)"] --> P["Pocket robot"]
    P --> E["On-device core:<br/>wake word · face ID · basic NLU ·<br/>reminders · the personality engine"]
    P --> M["Local memory:<br/>who you are, what you like,<br/>what happened today"]
    E -->|needs more| C["Cloud LLM (agent):<br/>complex reasoning, tools, chat"]
    M --> E
    C --> E
    E -->|fast, private, always-on| U
    style E fill:#2563eb,color:#fff
    style M fill:#e2e8fd,stroke:#2563eb
    style C fill:#fde2e2,stroke:#b31b1b
```

## The three problems worth solving

1. **The edge/cloud split.** Keep latency- and privacy-sensitive interactions
   [on the device]({% post_url 2026-06-16-keep-your-ai-local %}) — wake word, face ID, the personality
   engine, basic commands — and escalate to a cloud model only for genuinely hard requests. This is the
   same instinct behind my [tinyML]({{ '/projects/tinyml/' | relative_url }}) work, applied to a
   companion.
2. **Memory that makes it *yours*.** A companion without memory is a toy. The concept needs persistent,
   on-device memory — who you are, your routines, the small things — so the personality *evolves* with
   you instead of resetting every session.
3. **Human-centered guardrails.** An always-on camera and microphone in your pocket is a privacy
   minefield. The design has to lead with consent and control: on-device by default, explicit opt-in for
   anything cloud, a visible "it's listening" state, and a personality that's *delightful* without being
   manipulative. This is the [enterprise-grade trust thinking]({% post_url 2026-06-17-agents-in-the-enterprise %})
   I apply to agents, pointed at something personal.

## Where this connects

This sits at the intersection of everything I work on: **robotics** (Pepper/NAO), **edge AI**
(tinyML, keeping AI local), **agents** (the on-device/cloud loop), and **human-centered design** (the
trust and personality layer). It's a concept for now — but it's the kind of product I'd love to help
build.

*Got thoughts on what a pocket companion should — or shouldn't — do? The comments are open, and on the
[notes post]({% post_url 2026-06-23-notes-living-ai-pocket-robots %}) too.*
