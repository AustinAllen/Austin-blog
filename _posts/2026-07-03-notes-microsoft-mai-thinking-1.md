---
layout: post_views
giscus_comments: true
title: "Article Notes: Microsoft Strikes Out on Its Own (MAI-Thinking-1)"
date: 2026-07-03 13:00:00
description: "My notes on a Batch piece about MAI-Thinking-1 — Microsoft's first reasoning model built from scratch, not distilled from anyone else. The specs (1T-parameter MoE, 256k context), the benchmark that puts it third, and why the real story is a partnership clause, not a model."
tags: ai
categories: general
featured: false
---

This one reads like a corporate-independence story wearing a model-launch costume. I read a *Batch*
piece on **Microsoft's MAI-Thinking-1** — its first reasoning model built *from scratch* — and the
interesting part isn't the benchmark, it's the contract clause that made Microsoft want its own model at
all. These are my notes.

*This is my summary and interpretation, not the authors' words — go read the
[original article](https://www.deeplearning.ai/the-batch/microsoft-strikes-out-on-its-own).*

## What Microsoft built

**MAI-Thinking-1** is Microsoft's first reasoning language model built **entirely from scratch** — not
distilled or fine-tuned from a competitor's model. That's the headline word: *from scratch*. Microsoft's
earlier models (the Phi family, MAI-DS-R1) leaned on OpenAI and DeepSeek lineage; this one doesn't.

The specs, per the article:

- **Mixture-of-experts**, **1 trillion total parameters** with **~35 billion active per token** — a
  medium-sized model in practice, roughly comparable to Claude Sonnet 4.6.
- **256,000-token** input/output windows.
- **Compatible with OpenAI's Chat Completions API** — a telling design choice I'll come back to.
- Trained in stages: pretraining on **30 trillion tokens** (mostly licensed, human-generated content,
  **50%+ code**), midtraining on **3.55 trillion**, then fine-tuning. The team built **three specialists**
  — one for STEM reasoning, one for agentic coding and tool use, one for helpfulness and safety.

## Where it actually lands

On **AIME 2025** (competition math), the numbers reported:

| Model | AIME 2025 |
| --- | --- |
| Claude Opus 4.6 | 99.8% |
| **MAI-Thinking-1** | **97.0%** |
| Claude Sonnet 4.6 | 95.6% |
| DeepSeek V3.2 | 93.1% |

So a strong *third* overall — genuinely competitive on math, but trailing the field on graduate-level
science and agentic coding. Which is the honest read: not a frontier-topping model, but a *credible* one,
built independently, on the first serious try.

## The real story: a clause, not a model

Here's the why. Microsoft historically relied on OpenAI's models for products like Copilot. Then, in
**April 2026**, the two companies **amended their partnership** — making Microsoft's license to OpenAI's
models **non-exclusive**, and freeing OpenAI to serve its products through any cloud provider.

The moment exclusivity ended, "we'll just use OpenAI" stopped being a moat and started being a
*dependency*. MAI-Thinking-1 is Microsoft's answer: a capable in-house option so its stack doesn't hinge
on a partner it no longer has an exclusive hold on. The Chat-Completions-API compatibility is the giveaway
— it's designed as a **drop-in**, so Microsoft (and its customers) can swap it under existing code without
rewiring.

The article's own framing of who benefits: *"Teams on the Microsoft stack can reach a capable reasoning
model without adding a vendor or moving data out of the tools they already use."* That's the whole pitch —
integration and data sovereignty inside the ecosystem you're already in. **Availability:** private preview
via Microsoft Foundry, with broader access planned through Fireworks AI, Baseten, and OpenRouter.

## Why it stuck with me

- **Vertical integration is back in fashion.** When your key input stops being exclusive, you build your
  own. It's the same instinct as [OpenAI designing its own inference chip]({% post_url 2026-06-24-notes-openai-jalapeno-chip %})
  — owning the layer you used to rent.
- **"From scratch" is a strategic claim, not just an engineering one.** Distilling from a competitor is
  faster, but it leaves you legally and technically downstream of them. Building clean buys independence —
  and, notably, a story you can tell regulators and customers about provenance.
- **Third place, on purpose, can be the right call.** For [teams already on the Microsoft stack]({% post_url 2026-06-17-agents-in-the-enterprise %}),
  "97% of the way there, inside the tools you already use, no data leaving" often beats "best on the
  leaderboard, but a new vendor and a new data path." Good enough *and* in-house is a real product.

## Worth discussing

- If every hyperscaler ends up with its own frontier-ish model, does the ecosystem get healthier
  (competition, redundancy) or more fragmented and lock-in-y (four walled gardens)?
- Building "from scratch" on 30T mostly-licensed tokens is a flex about *data provenance* as much as
  capability. Is clean-provenance training becoming a competitive moat in its own right?
- Copilot has run on OpenAI for years. How fast does Microsoft actually migrate — and do users ever
  notice?

---

*Credit where it's due — this is my summary of DeepLearning.AI's *The Batch* article
["Microsoft Strikes Out on Its Own"](https://www.deeplearning.ai/the-batch/microsoft-strikes-out-on-its-own).
The MAI-Thinking-1 specs, benchmark numbers, training details, and partnership timeline are as reported
there. The framing and any errors here are mine.*
