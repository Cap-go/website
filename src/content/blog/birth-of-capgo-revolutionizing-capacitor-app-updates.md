---
slug: "birth-of-capgo-my-challenging-journey-as-a-solo-maker"
title: 'The Birth of Capgo: My Challenging Journey as a Solo Maker'
description: 'Discover the trials and triumphs behind creating Capgo, an innovative live update system for Capacitor apps, born from necessity and shaped by community feedback.'
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2024-07-13
updated_at: 2024-07-13
head_image: "/capgo-birth-story.webp"
head_image_alt: "A visual representation of Capgo's evolution from idea to product"
tag: development
published: true
next_blog: ""

---

## The Genesis: A Community Request

The seeds of Capgo were actually planted long before I began my journey as a solo maker. On July 8, 2020, a community member named alexcroox submitted a plugin request that would eventually become the blueprint for Capgo.

![Initial plugin request](/capgo-initial-request.webp)

This request outlined the need for a "Capacitor Hot Code Push" plugin with the following key points:

1. **Platforms**: Support for both Android and iOS.
2. **Existing Solutions**: It highlighted the limitations of current options like MS Code Push (which lacked Capacitor support) and App Flow (which was expensive and inflexible).
3. **Description**: The ability to update js/css/html of an app in real-time without going through the app store review process.
4. **Key Features**: 
   - Facilitate over-the-air updates from a server/endpoint of the developer's choosing.
   - Download a zip file of the updated dist folder, extract it, and tell Capacitor to launch from this new directory.
   - Additional features like update verification, installation timing, and selective downloading of updates.

This comprehensive request garnered significant community support, with 65 likes and 25 heart reactions. It clearly demonstrated a strong demand for such a solution in the Capacitor ecosystem.

When I came across this request over a year later, it resonated deeply with the challenges I was facing in my own projects. It served as both validation of the need for such a tool and a roadmap for what would become Capgo.

The community's enthusiasm for this proposed plugin, combined with my personal experiences, became the driving force behind Capgo's development. It's a perfect example of how open-source communities can identify needs and inspire solutions, even if the timeline from idea to implementation spans over a year.


## A New Chapter Begins

Before diving into the Capgo story, it's important to set the stage. In 2021, I made a life-changing decision to quit my role as CTO of Cashstory and sell my shares. This marked the beginning of my journey as a solo maker, a path filled with uncertainty but also endless possibilities.

![Lisbon digital nomad life](/capgo-lisbon-nomad.webp)

With my savings as a safety net, I embarked on a new adventure. I was living as a digital nomad in Lisbon, Portugal, embracing the vibrant tech scene and culture of the city while focusing on my passion projects. My primary focus was Captime, a mobile app crossfit timer. Little did I know that this project would lead me to create something much bigger.

The energy of Lisbon's startup ecosystem and the freedom of the digital nomad lifestyle provided the perfect backdrop for innovation. It was in this environment, surrounded by fellow entrepreneurs and developers from around the world, that the seeds of Capgo were sown.

[Continue with the rest of the article...]

This revision accurately reflects your living situation in Lisbon as a digital nomad, which provides important context for the environment in which you developed Capgo. It also highlights the connection between your lifestyle choice and the innovative spirit that led to Capgo's creation.
## The Spark of an Idea

While working on Captime, I encountered a significant hurdle - the lack of an affordable and flexible update solution for Capacitor apps. In October 2021, I voiced these concerns on a GitHub thread.

![Initial proposal for Capgo](/capgo-initial-proposal.webp)

The main pain points I identified were:

1. High costs for small-scale developers
2. Lack of over-the-air (OTA) updates in affordable plans
3. Unnecessary features for solo developers

## The Community Resonates

My concerns struck a chord with other developers. Many echoed the sentiment that existing solutions were overpriced for indie developers and small teams.

![Community feedback](/capgo-community-feedback.webp)

One developer summarized the community's feelings:

"It would be brilliant if the Community plan included 500 live updates. Or better yet, if there was a Live Update only package for $50/month that included 5,000 Live Updates."

## The Birth of a Solution

Motivated by the community's response, I decided to take matters into my own hands. On October 24, 2021, I announced my plan to build a module that would allow developers to download updates from a given URL.

![Initial code snippet](/capgo-initial-code.webp)

The initial goals were simple:
- Download data from a URL
- Unzip the data
- Replace the current code with the new one

However, turning this simple idea into reality proved to be far more challenging than I initially anticipated.

## The Struggle Behind the Scenes

What isn't apparent from the GitHub thread is the sheer complexity of the task I had undertaken. The code required to implement this functionality was obscure and hard to understand. I found myself grappling with intricate details of how Capacitor apps handle updates and file systems.

Many nights were spent in my van, poring over documentation and experimenting with different approaches. Progress was slow, and there were times when I questioned whether I had bitten off more than I could chew.

## Community to the Rescue

Fortunately, I wasn't alone in this journey. The developer community, particularly on Discord, proved to be an invaluable resource. Fellow developers offered their insights, helped debug issues, and provided encouragement when the going got tough.

![Discord community support](/capgo-discord-support.webp)

This collaborative effort was crucial in overcoming the technical hurdles. It reinforced my belief in the power of open source and community-driven development.

## Rapid Development and Expanding Capabilities

With the help of the community, development began to accelerate. By November 22, 2021, I had a working version for iOS and was improving the developer experience.

![Improved code snippet](/capgo-improved-code.webp)

As development progressed, I added more features:
- Android support
- Persistence between app kills
- The ability to revert to the original app version

![New features announcement](/capgo-new-features.webp)

Each new feature brought its own set of challenges, but also a sense of accomplishment as the project grew beyond its initial scope.

## The Launch of Capgo

By March 2022, the project had evolved into a full-fledged product: Capgo. I announced the release of an auto-update mode, allowing developers to connect to their own backend or use Capgo's backend service.

![Capgo launch announcement](/capgo-launch-announcement.webp)

The community's response was overwhelmingly positive, with developers praising this much-needed solution.

## The Pivot to a Paid Product

Initially, I had no plans to monetize Capgo. My goal was simply to create a tool that would solve a problem I and other developers were facing. However, the feedback on GitHub made me reconsider this stance.

Developers were expressing a willingness to pay for a solution that met their needs at a fair price point. This feedback, combined with the realization of the ongoing costs and effort required to maintain and improve Capgo, led to a pivotal decision.

On June 11, 2022, I announced that Capgo would start charging for usage in 15 days, marking its transition from a community project to a sustainable business.

![Capgo pricing announcement](/capgo-pricing-announcement.webp)

However, staying true to the project's roots, I maintained Capgo's open-source core by allowing free use of the plugin in manual mode or with a custom server.

## Conclusion

My journey with Capgo is a testament to the power of community-driven innovation and the unexpected paths that solo makers often find themselves on. What started as a personal frustration while working on a crossfit timer app grew into a robust, affordable, and flexible live update system for Capacitor apps.

The creation of Capgo was far from easy. It required countless hours of work, the support of a generous developer community, and a willingness to pivot based on user feedback. From coding in a van in Portugal to launching a paid product, every step of this journey has been a learning experience.

As Capgo continues to evolve, it stands as a prime example of how identifying a gap in the market, actively working to fill it, and being responsive to community needs can lead to the creation of valuable tools that benefit the entire developer ecosystem.

The story of Capgo is more than just the development of a tool; it's a story of perseverance, community, and the exciting unpredictability of life as a solo maker.
