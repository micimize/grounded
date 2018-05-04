Currently WIP structurally, but the idea is that:

Submodules here should be "self contained, generic domains" that are used to compose higher level domains. Some, such as `time`, can be looked at as a stand-alone module, conceptually.

Each module exports one or more domain. A domain consists of at least:
* A display-oriented `Domain` component as default
* an editing-oriented `EditDomain` component