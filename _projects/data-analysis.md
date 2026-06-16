---
layout: project_views
title: When the City Rides — A Bike-Share EDA
description: Exploring a year of bike-share trips to find the difference between commuters and casual riders, hidden in the shape of the day.
img: assets/img/bike-share-eda.jpg
importance: 2
category: data
chart:
  chartjs: true
---

Give me a big enough dataset and I'll happily spend an afternoon just *looking* at it.
This project is an **exploratory data analysis** (EDA) of a year of public bike-share
trips — the kind of open-ended poke-around where the goal isn't a model, it's
*understanding*: who rides, when, and why the daily rhythm looks the way it does.

## The dataset

A year of trip records from a public bike-share system (≈4 million rows). Each trip
has a start/end time and station, the bike type, and a **rider type** —
`member` (annual subscriber) or `casual` (single-ride or day-pass). That last column
turns out to be the most interesting thing in the table.

## Cleaning first (always)

Real data is messy, and EDA lives or dies on the cleaning step. The obvious culprits:

- **Negative / zero-length trips** — clock skew and rebalancing by staff. Dropped.
- **Absurdly long trips** — bikes never docked; anything over a few hours is an outlier, not a commute.
- **Missing station IDs** — a small fraction, dropped for the station-level questions.

```python
import pandas as pd

trips = pd.read_parquet("bikeshare_2023.parquet")

# basic hygiene
trips["duration_min"] = (trips.ended_at - trips.started_at).dt.total_seconds() / 60
trips = trips[(trips.duration_min > 1) & (trips.duration_min < 180)]
trips["hour"] = trips.started_at.dt.hour

# the question below: trips per hour, by rider type
by_hour = (
    trips.groupby(["member_casual", "hour"])
         .size()
         .div(365)                       # average trips per hour per day
         .rename("avg_trips")
         .reset_index()
)
```

## The day has a shape

Plotting average trips by hour, split by rider type, the two groups separate
immediately — and the story is in the **shape**, not the totals:

```chartjs
{
  "type": "line",
  "data": {
    "labels": ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
    "datasets": [
      {
        "label": "Members (subscribers)",
        "data": [5,3,2,1,2,8,25,55,80,45,30,32,38,35,33,40,60,90,75,45,30,22,15,9],
        "borderColor": "#b31b1b",
        "backgroundColor": "rgba(179,27,27,0.1)",
        "fill": true,
        "tension": 0.35,
        "pointRadius": 2
      },
      {
        "label": "Casual riders",
        "data": [8,6,4,2,2,3,6,10,15,22,32,42,50,55,58,60,62,60,52,42,32,25,18,12],
        "borderColor": "#2563eb",
        "backgroundColor": "rgba(37,99,235,0.1)",
        "fill": true,
        "tension": 0.35,
        "pointRadius": 2
      }
    ]
  },
  "options": {
    "responsive": true,
    "interaction": {"mode": "index", "intersect": false},
    "plugins": {
      "legend": {"position": "top"},
      "title": {"display": true, "text": "Average bike-share trips by hour of day"}
    },
    "scales": {
      "x": {"title": {"display": true, "text": "Hour of day"}},
      "y": {"beginAtZero": true, "title": {"display": true, "text": "Avg. trips per hour"}}
    }
  }
}
```

The chart is interactive — hover to compare both groups at any hour. Two completely
different behaviors fall out:

- **Members ride a commute.** A sharp twin-peak at **8 AM and 5–6 PM**, weekday rush
  hours. These are people getting to work and back, treating the bike like transit.
- **Casual riders ride for fun.** A single broad hump across the **early afternoon**,
  peaking around 3–4 PM — tourists and weekend leisure, not commuters.

That one picture reframes the whole system: members are a *transportation* product;
casual riders are a *recreation* product. They want different stations, different
hours, and respond to different incentives.

## Other things that fell out

- **Casual trips are longer.** Median casual ride ≈ 2× a member's — leisure loops vs.
  point-to-point hops.
- **Weather is a casual-rider story.** Member volume is roughly weather-proof (you
  still have to get to work); casual volume tracks temperature and rain closely.
- **The busiest stations differ by group** — members cluster around transit hubs and
  business districts; casual riders around parks and the waterfront.

## Why it matters

If the goal were a business one — say, converting casual riders into members — this
EDA already points at the lever: target the *recreation* audience with weekend- and
leisure-oriented offers, not commuter messaging. EDA rarely gives you the final
answer, but a good one tells you **which question to ask next**.

## What's next

- Promote the cleaning + charts into a reproducible **Jupyter notebook** (al-folio can
  embed `.ipynb` files directly into a post).
- A **weekday vs. weekend** facet, where the casual/member split gets even sharper.
- A simple **classifier**: given a trip's features, predict member vs. casual — and read
  the feature importances as a description of what "commuting" looks like in the data.

> _This is an example analysis — the workflow is real (pandas EDA on bike-share data),
> but the figures are representative rather than freshly computed. Swap in your own
> dataset and results, or delete this note._
