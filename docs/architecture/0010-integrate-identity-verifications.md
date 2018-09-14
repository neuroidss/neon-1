# 10. Integrate identity verifications

Date: 2018-09-14

## Status

Accepted

## Context

Arcade City aims to support peer-to-peer marketplaces by facilitating the exchange of clear and transparent information about both sides of a peer-to-peer transaction, then letting users make up their own mind about how and with whom to transact.

In practice, users will have a profile which can collect various attestations or 'verifications'. For example if I choose to upload my driver's license to a third party specializing in government ID verifications, I can earn a particular profile badge signifying that my ID has been verified by that provider.

There can be an entire marketplace of such verifications provided by third parties ranging from specialized companies to communities who develop their own verifications. For example an Arcade City guild could require a face-to-face meeting to earn a certain badge, and that badge could gain importance through market demand. (Another example: the Order of Merritt from [FreedomTM](https://www.amazon.com/Freedom-TM-Daemon-Book-2-ebook/dp/B002VUFKDY).)

Neon is designed to support pseudonymity but not anonymity. We assume mainstream users will not trust anonymous service providers.

You may decide to be known by your Arcade City 'username' and to collect community verifications that do not require divulging any government ID. It is your choice. 

And it will be the other users' choice whether they want to transact with you based on your reputation score and your profile badges, or whether they want to transact with someone else with more or different scores and verifications.

We are building an open marketplace in support of consumer choice, including a gamified system of identity and reputation.

## Decision

Integrate identity verifications, all optional.

## Consequences

Disincentivizes anonymity.