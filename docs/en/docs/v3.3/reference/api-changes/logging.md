---
title: "Logging"
keywords: 'Kubernetes, Super Kubenetes, API, Logging'
description: 'The API changes of the component logging in Super Kubenetes v3.3.0.'
linkTitle: "Logging"
weight: 17310
---

The API changes of the component **logging** in Super Kubenetes v3.3.0.

## Time Format

The time format of query parameters must be Unix timestamps (the number of seconds that has elapsed since the Unix epoch). Milliseconds are no longer allowed. The change affects the parameters `start_time` and `end_time`.

## Deprecated APIs

The following APIs are removed:

- GET  /workspaces/{workspace}
- GET  /namespaces/{namespace}
- GET  /namespaces/{namespace}/workloads/{workload}
- GET  /namespaces/{namespace}/pods/{pod}
- The whole log setting API group

## Fluent Bit Operator

In Super Kubenetes 3.3.0, the whole log setting APIs are removed from the Super Kubenetes core since the project Fluent Bit Operator is refactored in an incompatible way.