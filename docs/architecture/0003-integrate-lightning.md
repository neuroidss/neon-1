# 3. Integrate Lightning

Date: 2018-09-14

## Status

Accepted

## Context

As a 'second layer' atop [our Bitcoin integration](0002-integrate-bitcoin.md), the [Lightning Network](https://en.wikipedia.org/wiki/Lightning_Network) can enable frictionless, borderless micropayments across our global peer-to-peer network with fees of zero or near zero. 

Even more exciting is the concept of [streaming money](https://www.youtube.com/watch?v=gF_ZQ_eijPs) applied to payouts for service providers.

Corporate rideshares like Uber usually pay drivers once per week. Drivers in some areas like the U.S. have access to "instant pay" where they can cash out their outstanding balance to a debit card within minutes. But for most drivers around the world, weekly payouts are the norm.

What if drivers could be paid every few seconds?

And what if drivers could instantly earn a share of revenue from payments made by other users they referred?

Imagine a network-wide policy where from every rider or driver you refer, you earn 1% of their in-app credit card transactions for a year.

Or an optional guild-specific policy that adds an additional 3% fee for rides within that guild, with 1% going to the guild moderators who respond to customer complaints and onboard new drivers, 1% going into a guild treasury earmarked for 'rainy day' expenses, and 1% being distributed automatically to all drivers in the guild.

The Lightning Network makes that possible and more. 

Lightning in combination with our cooperative 'guild' model will enable teams of drivers to customize their own models of revenue streams and getting people paid. 

An open marketplace of guilds with different policies will become a hotbed of experimentation, all optimizing around providing the best service for customers while taking the best care of its service providers.


## Decision

Use the Lightning Network to power global peer-to-peer payments and customizable revenue sharing.

## Consequences

We will be on the 'bleeding edge' of Lightning Network integration into a service used by mainstream consumers, with plenty of technical and social issues to work through.

We will need to experiment to discover ideal network topology.


