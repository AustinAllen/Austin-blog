---
layout: project_views
title: Should You Go For It? — 4th-Down Analytics
description: Using play-by-play data to ask when NFL teams should go for it on fourth down — and how often they leave points on the field by punting.
img: assets/img/fourth-down-analytics.jpg
importance: 1
category: data
chart:
  vega_lite: true
---

One of the clearest places where **data disagrees with football tradition** is the
fourth-down decision. Coaches punt out of habit and caution; the numbers often say
*go for it*. This project digs into play-by-play data to quantify when keeping the
offense on the field is actually the higher-value call.

## The question

On 4th down, a coach has three options — **go for it**, **punt**, or **kick a field
goal** — and the right choice depends on two things: how likely the offense is to
convert, and how much field position or points each outcome is worth. The headline
input is the **conversion rate**: how often teams pick up the first down as a
function of yards to go.

## The data

I work from public **play-by-play** data ([nflfastR](https://www.nflfastr.com/)),
which ships every play of every game with down, distance, field position, and a
modeled **expected points (EP)** for the game state. Filtering to fourth-down "go"
attempts and grouping by distance gives the empirical conversion rate:

```python
import nfl_data_py as nfl

pbp = nfl.import_pbp_data([2018, 2019, 2020, 2021, 2022, 2023])

# 4th-down plays where the offense actually went for it (run or pass)
go = pbp[(pbp.down == 4) & (pbp.play_type.isin(["run", "pass"]))]

conversion_by_distance = (
    go[go.ydstogo <= 10]
      .groupby("ydstogo")["first_down"]      # 1 if the play gained the first down
      .mean()
      .rename("conversion_rate")
)
print(conversion_by_distance)
```

## What the data says

Conversion rate falls off steeply with distance — but notice how high it stays in
**short yardage**. On 4th-and-1, teams convert roughly two-thirds of the time, which
is almost always worth more than the ~40 net yards a punt buys:

```vega_lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "NFL 4th-down conversion rate by yards to go (2018–2023)",
  "width": "container",
  "height": 320,
  "data": {
    "values": [
      {"ytg": 1, "rate": 0.68},
      {"ytg": 2, "rate": 0.55},
      {"ytg": 3, "rate": 0.50},
      {"ytg": 4, "rate": 0.47},
      {"ytg": 5, "rate": 0.42},
      {"ytg": 6, "rate": 0.39},
      {"ytg": 7, "rate": 0.36},
      {"ytg": 8, "rate": 0.34},
      {"ytg": 9, "rate": 0.32},
      {"ytg": 10, "rate": 0.30}
    ]
  },
  "layer": [
    {
      "mark": {"type": "area", "opacity": 0.15, "color": "#b31b1b"}
    },
    {
      "mark": {"type": "line", "color": "#b31b1b", "strokeWidth": 3, "point": {"filled": true, "size": 70}},
      "encoding": {
        "tooltip": [
          {"field": "ytg", "type": "ordinal", "title": "Yards to go"},
          {"field": "rate", "type": "quantitative", "format": ".0%", "title": "Conversion rate"}
        ]
      }
    }
  ],
  "encoding": {
    "x": {
      "field": "ytg",
      "type": "quantitative",
      "title": "Yards to go",
      "axis": {"tickMinStep": 1},
      "scale": {"domain": [1, 10]}
    },
    "y": {
      "field": "rate",
      "type": "quantitative",
      "title": "Conversion rate",
      "axis": {"format": "%"},
      "scale": {"domain": [0, 0.8]}
    }
  }
}
```

The chart is interactive — hover any point for the exact rate, and it adapts to the
site's light and dark themes. _(Rates here are representative of recent seasons; swap
in your own computed numbers from the snippet above.)_

## From conversion rate to a decision

Conversion rate alone doesn't make the call — you weigh it against what each option is
worth in **expected points**. Going for it is the better play whenever its expected
value beats the alternatives:

$$
\text{EV}_{\text{go}} = p_{\text{convert}}\,\text{EP}_{\text{1st down}} + (1 - p_{\text{convert}})\,\text{EP}_{\text{turnover}}
$$

Compare $$\text{EV}_{\text{go}}$$ against $$\text{EV}_{\text{punt}}$$ and
$$\text{EV}_{\text{FG}}$$ (both estimated from the same EP model), and the recommended
decision falls out. Run across every field position, this is exactly what the public
"4th-down bots" do — and they consistently find teams **punt too often** in the
opponent's half and in short yardage near midfield.

## Takeaways

- **4th-and-short is usually a go**, especially past midfield — the ~68% conversion
  rate dwarfs the field-position value of a punt.
- The break-even conversion probability for "go vs. punt" depends heavily on field
  position; deep in your own territory, caution is justified — near midfield it rarely is.
- Coaching has shifted toward the analytics here over the last decade, but there's
  still a measurable gap between optimal and actual 4th-down behavior.

## What's next

- Build the full **decision surface**: recommended call for every (yard line, yards-to-go)
  combination, rendered as a heatmap.
- Fold in **win probability** rather than expected points, so late-game situations
  (where points matter more than field position) are handled correctly.
- A small interactive widget: enter the game state, get the recommendation and the EV
  of each option.

> _This is an example analysis — the methodology is real (nflfastR + expected points),
> but the numbers are representative rather than freshly computed. Replace them with your
> own results, or delete this note._
