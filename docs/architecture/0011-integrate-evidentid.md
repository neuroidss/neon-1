# 11. Integrate EvidentID

Date: 2018-09-14

## Status

Accepted

## Context

Neon will integrate [optional identity verifications](https://github.com/ArcadeCity/neon/blob/adrs/docs/architecture/0010-integrate-identity-verifications.md).

[EvidentID](https://www.evidentid.com/) is a third-party verification provider and a logical first partner for an initial implementation of our verification system. They have a straightforward API and have been used previously by Airbnb.

## Decision

Integrate EvidentID as initial identity verification provider.

## Consequences

We've built most of an integration already.

Cost or operational bottlenecks may be limiting factors as our userbase grows. But we've got to solve those problems sometime!