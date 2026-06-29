---
layout: post_views
giscus_comments: true
title: "Article Notes: Community and Skills, the Two Things That Hold"
date: 2026-06-24 21:00:00
description: "My notes on The Batch issue 345 — Andrew Ng's letter on what stays stable when AI and the world feel unpredictable: community and skills. Plus the issue's roundup, from Alibaba's all-sizes Qwen3.5 to DeepSeek favoring Huawei over Nvidia — and an honest note on why I'm not detailing its conflict coverage."
tags: ai
categories: general
featured: false
---

Continuing my catch-up on back issues of [*The Batch*](https://www.deeplearning.ai/the-batch/issue-345).
Issue 345's letter is a quieter, more human one than usual, and it landed for me as a student mid-career
shift. These are my notes.

*This is my summary and interpretation, not the authors' words — go read the
[original issue](https://www.deeplearning.ai/the-batch/issue-345).*

## The letter: two anchors when everything else moves

Andrew Ng's letter is about job insecurity — the very real anxiety of watching AI advance fast against a
backdrop of geopolitical uncertainty. His argument isn't "don't worry." It's that two things stay stable
no matter how the rest shakes out:

1. **Community** — the relationships and networks you build. Worth investing in deliberately, including
   showing up in person.
2. **Skills** — portable assets nobody can take from you. The specific tool matters less than the
   capacity to keep learning new ones.

I find this genuinely steadying. As [someone doing a master's in AI mid-career]({% post_url 2026-06-17-agents-in-the-enterprise %}),
the temptation is to chase whichever model or framework is trending this month. Ng's reframe is that the
*meta-skill* — learning how to learn the next thing, plus a community to learn it with — is the
durable bet. It rhymes with the "[the human job moves up a loop]({% post_url 2026-06-24-notes-loop-engineering-batch-359 %})"
idea: when specific tasks get automated, what compounds is adaptability and relationships, not any one
technique.

## Also in this issue

- **Qwen3.5, in every size.** Alibaba released a whole family of open-weights vision-language models —
  from a big ~397B-parameter Mixture-of-Experts (17B active) down to tiny 2B/0.8B models. The headline:
  the **small ones punch far above their weight** (a 9B reportedly beating a 10×-larger model on most
  language benchmarks), and the big one tops GPT-5.2 / Claude / Gemini on a majority of *vision*
  benchmarks. Models good enough for a **consumer laptop** that used to need an 80GB GPU — the
  [keep-AI-local]({% post_url 2026-06-16-keep-your-ai-local %}) and
  [FrugalGPT]({% post_url 2026-06-17-notes-frugalgpt-cost %}) trends, accelerating.
- **DeepSeek favors Huawei over Nvidia.** DeepSeek withheld prerelease access to its upcoming
  **DeepSeek-V4** from Nvidia and AMD, but gave **Huawei** weeks to optimize for its chips first. Mostly
  symbolic, but a clear signal of China's push for hardware self-sufficiency — the geopolitical flip side
  of the silicon story in my [Jalapeño notes]({% post_url 2026-06-24-notes-openai-jalapeno-chip %}).
- **One tokenizer for all visual media (Apple AToken).** A unified transformer that maps **images, video,
  and 3D objects into a single shared token space**, handling both understanding and generation. The
  appeal is the same "[biology as language]({% post_url 2026-06-24-notes-esmfold2-biology-as-language %})"
  intuition pointed at media: one shared representation lets knowledge transfer across modalities instead
  of training a separate model for each.
- **The lead story — attacks on data centers.** The issue opens with physical attacks that damaged cloud
  data centers in the Persian Gulf, knocking out banking, payments, and app services across the region.
  The verifiable, on-brand lesson for me: all of this AI runs on **physical infrastructure concentrated
  in a handful of places**, and that concentration is itself a vulnerability — a sobering counterpoint to
  the off-grid build-out I noted in [issue 344]({% post_url 2026-06-24-notes-batch-344-stack-overflow-for-agents %}).
  *The issue also covers AI's expanding role in military operations; I'm deliberately not summarizing
  those specifics here, because I couldn't independently verify the details and they're too serious to
  pass along secondhand.*

## Worth discussing

- "Invest in community and skills" is good advice that's easy to nod at and hard to do. What does it look
  like *concretely* for someone retraining into AI right now?
- Capable open models on laptops keep arriving. At what point does the privacy-and-cost case for local
  models beat the convenience of a frontier API for most everyday tasks?
- Hardware is splitting along geopolitical lines (Nvidia vs Huawei). Does a bifurcated chip world
  fragment the AI software ecosystem too — two stacks that don't interoperate?

---

*Credit where it's due — this is my summary of
[*The Batch* issue 345](https://www.deeplearning.ai/the-batch/issue-345) (DeepLearning.AI): Andrew Ng's
letter on community and skills, plus its coverage of Qwen3.5, DeepSeek's Huawei move, Apple's AToken, and
attacks on Gulf data centers. Model and benchmark figures are as reported there; where numbers were
unclear I kept them qualitative, and I omitted conflict details I couldn't verify. The framing and any
errors here are mine.*
