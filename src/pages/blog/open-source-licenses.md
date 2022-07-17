---
title: Open source licensing and why i'm' changing them to the AGPL/LGPL license
description: I'm changing my license as i have become aware that there are risks associated with open source licenses that corporations that can't use.
author: Martin Donadieu
date: 2022-04-08
head_image: "/licence_change.webp"
head_image_alt: Licence change illustration
tag: licence
published: true
next_blog: ''

---
 Capgo is a as a service open source web project. With the feedback of other project such as [Plausible Analytics](https://plausible.io/blog/open-source-licenses) in recent, they have share the are risks associated with permissive open source licenses that corporations that don’t care about open source are happy to take advantage of.

In the early days of Capgo i have follow they move and used AGPLv3 license. It was for me the good choice, but obviously i'm not a lawyer. After lot of talk in the discord community of the project i have discover this licence was putting the users at risk, since capacitor-updater, the plugin part of Capgo, was embed in all project.

So after some research and help of the community we found that LGPLv3 was the most suitable licence for the plugin part.
This change affect anyone subscribing to the  Capgo Cloud and anyone who’s running Capgo Self-Hosted on their server. Everything stays the same, but your are now safe to use it legally in your project.

The change keep protect the project from corporations that want to take my code and modify or use it to create and sell proprietary tools that directly compete with me. Let’s look at the details.

1.  [Risks associated with permissive open source licenses](https://capgo.app/blog/open-source-licenses#risks-associated-with-open-source-licenses)
2.  [Choosing an open source license for the cloud](https://capgo.app/blog/open-source-licenses#choosing-an-open-source-license-for-the-cloud)
    1.  [The power of forking](https://capgo.app/blog/open-source-licenses#the-power-of-forking)
3.  [ Capgo is now AGPLv3 licensed](https://capgo.app/blog/open-source-licenses#plausible-is-now-agplv3-licensed)
4.  [What is an open source license?](https://capgo.app/blog/open-source-licenses#what-is-an-open-source-license)
5.  [What is the MIT license?](https://capgo.app/blog/open-source-licenses#what-is-the-mit-license)
    1.  [What are the restrictions with the MIT license?](https://capgo.app/blog/open-source-licenses#what-are-the-restrictions-with-the-mit-license)
    2.  [What are the benefits of the MIT license?](https://capgo.app/blog/open-source-licenses#what-are-the-benefits-of-the-mit-license)
6.  [What is the GNU GPLv3 license?](https://capgo.app/blog/open-source-licenses#what-is-the-gnu-gplv3-license)
    1.  [What are the restrictions with GPL?](https://capgo.app/blog/open-source-licenses#what-are-the-restrictions-with-gpl)
    2.  [What’s the issue with the GPL license?](https://capgo.app/blog/open-source-licenses#whats-the-issue-with-the-gpl-license)
7.  [What is the GNU AGPLv3 license?](https://capgo.app/blog/open-source-licenses#what-is-the-gnu-agplv3-license)
    1.  [What are the benefits of the AGPLv3?](https://capgo.app/blog/open-source-licenses#what-are-the-benefits-of-the-agplv3)
    2.  [What are the restrictions with the AGPLv3?](https://capgo.app/blog/open-source-licenses#what-are-the-restrictions-with-the-agplv3)
    3.  [FSF recommends the AGPLv3 license for projects in the cloud](https://capgo.app/blog/open-source-licenses#fsf-recommends-the-agplv3-license-for-projects-in-the-cloud)
8.  [What is the GNU LGPLv3 license?](https://capgo.app/blog/open-source-licenses#what-is-the-gnu-agplv3-license)
    1.  [What are the benefits of the LGPLv3?](https://capgo.app/blog/open-source-licenses#what-are-the-benefits-of-the-agplv3)
    2.  [What are the restrictions with the AGPLv3?](https://capgo.app/blog/open-source-licenses#what-are-the-restrictions-with-the-agplv3)
    3.  [FSF recommends the AGPLv3 license for projects in the cloud](https://capgo.app/blog/open-source-licenses#fsf-recommends-the-agplv3-license-for-projects-in-the-cloud)

## Risks associated open source licenses

It’s the second time i'm involved in building and growing an open source project. First time was while building [Naas.ai](https://naas.ai) And in this case i just followed the choice of Plausible.

Here are a couple of events that made me aware of the risks with a restrictive open source license:

-   There’s been at many case where a corporation has refused to install the plugin because of the licencing
    
-   I have been approaches from corporations that want to take advantage of the tool without any contributions
    

These Two case where problematic for me, both options where leading me to loose client, so choosing the good licence who prevent at maximum theses case where essential.

My motives are to make the web more open and reduce the dominance of prvate company. But for some It seems purely a business opportunity to make money from open source.

## Choosing an open source license for the cloud

I'm trying to [make open source sustainable](https://capgo.app/blog/open-source-funding) by having people find value and pay for open source software.

It’s tough to become sustainable selling open source software. It makes it even tougher when providing my tool with zero strings attached to the corporations that want to compete with me by selling work based on my own software.

So i want a “don’t be evil” license and here’s what i'm trying to accomplish with it:

-   i want to prevent corporations from taking my code and using it as part of their closed-source proprietary products
    
-   i want to prevent corporations from offering Capgo as a service without contributing to the open source project
    
-   i want to prevent corporations from confusing people and making them think that the service they sell is in any shape or form approved by the original team
    

And i don’t want this to in any way impact the actual use case Capgo is built for. A completely open source and self-hostable app updater tool that helps people manage they app easyer.

### The power of forking

Although i don’t want closed source corporations to directly compete with us using my own work, it’s important to leave the space open for forking of the project and incorporating it into other open source works.

This is the best way to future-proof the project against bad actors, including ourselves if i become evil at some point. By allowing open source forks and competitors to exist, i'm opening myself up to healthy competition and accountability from the open source community.

## Capgo new license

So how do i accomplish all that? by changing my license. 

Capgo has now changed the license from the MIT to a newer licensing scheme called GNU Affero General Public License V3 (AGPLv3) or any later version. Capgo version can be [found here](https://github.com/cap-go/capgo/blob/main/LICENSE.md).

Capcitor-updater (the plugin) has now changed the license from the MIT to a newer licensing scheme called GNU Lesser General Public License V3 (LGPLv3) or any later version. Capcitor-updater version can be [found here](https://github.com/cap-go/capacitor-updater/blob/main/LICENSE.md).

This change makes no difference to any of you who subscribe to Capgo Cloud or who self-host Capgo, but it may upset a few corporations who tried to use my software to directly compete with me without contributing back.

AGPL is a license Google has a problem with as they’re not prepared to divulge their closed source code. Google is opposed to the AGPL and [state](https://opensource.google/docs/using/agpl-policy/): “Code licensed under the GNU Affero General Public License (AGPL) MUST NOT be used at Google”.

The goal of the AGPL license is to maximize user freedom and to encourage companies to contribute to open source. I'm a user facing, standalone application. I'm not a library or a piece of a bigger project. I'm not looking for Google’s donations so we’re happy to be AGPL-licensed. It is the right license for Capgo.

## What is an open source license?

Software licenses are legal and binding contracts between the producers of the software and the users of the software governing the use and redistribution of said software.

Every piece of software that you use has a license. Majority of it is proprietary and closed source. This means that it’s a black box. Nobody can look into it to verify what’s happening behind the scenes.

[Open source software](https://capgo.app/open-source-capacitor-updater) is fully transparent. The source code and the way open source software is built is available and accessible to the public. Anyone can view, review and inspect the code to understand how it works and to verify whether the actions match with the words.

Corporations and proprietary software cannot always be trusted when personal data is in question. The only way to prove your trust is to allow the public and the experts to look into your code and verify that you practice what you preach. It is this transparency and openness that means that open source products can be more trustworthy than proprietary products.

Here’s a closer look at the open source licenses, how they compare and why i chose the AGPL license.

## What is the MIT license?

> Permissive license: “Do whatever you want with this, just don’t sue me”

[The MIT license](https://opensource.org/licenses/MIT) is a permissive license. It is extremely short. This is the license i started with.

### What are the restrictions with the MIT license?

There are none. Corporations can use MIT licensed software any way they want. They can take your open source software and build closed-source and commercial products based on it. They have no legal reasons to contribute back to the open source.

### What are the benefits of the MIT license?

The benefit of this is that anyone can use your software for any purpose whatsoever so that could open your software up for getting used by more corporations.

One famous case is Apple taking BSD (which was licensed with a permissive license) and creating OSX based on it. They were not able to do that with Linux as Linux was not licensed with an MIT-like license.

MIT license is great if you only care about the spread of your code, and not so great if you’d like to encourage more companies to contribute back to the world of open source. But there’s a license for that too.

## What is the GNU GPLv3 license?

> Copyleft license: “If you make a derivative work of this, and distribute it to others then you have to provide the source code under this license”

[The GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.html) was authored by Richard Stallman and published in 1989. It is the most popular license. Some of the largest open source projects such as Linux and WordPress are GPL-licensed.

### What are the restrictions with GPL?

GPL license helps minimize the possibility that corporations can take advantage and profit from open source software without contributing back to the project and the open source. It basically says that as i open sourced my code so should you too and everyone can benefit from it.

### What’s the issue with the GPL license?

The problem with the GPL license is that it didn’t imagine cloud computing and how the cloud would come to dominate the world of software. Cloud companies download open source software, modify it, run it on their servers and resell it as a service.

They’re not actually “distributing” the software because users never have the software installed on their computers. It means that cloud corporations have no obligations to contribute their modifications back to the open source community.

And this is against the spirit of free and open source software. So there’s a license that considers cloud computing too.

## What is the GNU AGPLv3 license?

> Copyleft license: “If you make a derivative work of this, and distribute it or run it as a service on a server to others then you have to provide the source code under this license”

In the early 2000s, Stallman and others tried to close this cloud computing loophole and protect open source from this abuse by creating a new license. The [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html) (AGPL) was born.

### What are the benefits of the AGPLv3?

The AGPL license is identical to the original GPL license with the only additional term being to allow users who interact with the licensed software over a network to receive the source for that program.

AGPL is designed to ensure corporations contribute back to the open source community even when running the software as a service in the cloud.

If you used AGPL-licensed code in your web service in the cloud, you are required to open source it. It basically prevents corporations that never had any intention to contribute to open source from profiting from the open source work.

It explicitly prohibits corporations from parasitically competing with an open source project. They won’t be able to take the code, make changes to it and sell it as a competing product without contributing those changes back to the original project.

Here’s that extra paragraph:

> “If you run a modified program on a server and let other users communicate with it there, your server must also allow them to download the source code corresponding to the modified version running there”.

### What are the restrictions with the AGPLv3?

-   A corporation needs to be clear and provide a prominent mention and link to the original project so people that are considering to use their version of software can be aware of the original source
    
-   If a corporation modifies the original software, they need to open source and publish their modifications by for instance contributing back to the original project
    

So how can a corporation commercialize a FOSS project without open sourcing their modified code? They can purchase a commercial license to remove the copyleft restrictions and in that way support the original project.

### FSF recommends the AGPLv3 license for projects in the cloud

Free Software Foundation (FSF) and the GNU project [state](https://www.gnu.org/licenses/licenses.html):

> “We recommend that people consider using the GNU AGPL for any software which will commonly be run over a network”.

> “If it is likely that others will make improved versions of your program to run on servers and not distribute their versions to anyone else, and you’re concerned that this will put your released version at a disadvantage, we recommend the GNU Affero General Public License (AGPL). The AGPL’s terms are almost identical to the GPL’s; the sole substantive difference is that it has an extra condition to ensure that people who use the software over a network will be able to get the source code for it.”

This seems the exact license for the Capgo Cloud use case.

## What is the GNU LGPLv3 license?

Unlike the GPLs and AGPL, the LGPL is what’s known as a “weak copyleft” license. This type of license straddles the line between strong copyleft licenses (such as the GPLs) and permissive licenses like the MIT or BSD licenses. However, LGPL is slightly different from other weak copyleft licenses, like the Mozilla Public License or Eclipse Public License, due to its special safe harbor for dynamic linking integration.

The LGPL is primarily applied to libraries.

### What are the benefits of the LGPLv3?

As a copyleft license, LGPL requires users to release the source code of any changes to the original software. However, this requirement applies to a narrower set of code than the “regular” GPL.


### What are the restrictions with the AGPLv3?

Say, your code links to a library licensed under the LGPL. If you were to modify that library and distribute it, then you’d have to release the changes. But if your program simply uses the library, there’s no need to share your source code for your part of the program. You could even make your part of the program proprietary if you wanted to.

## Two licence for the best

To resume, Capcitor-updater use LGPLv3 to give you full freedom to use it in your own app with your own licence, and Capgo cloud uses AGPLv3, witch protect the auto update code to by modified without sharing back to the original project.

