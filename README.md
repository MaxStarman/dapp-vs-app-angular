# Dapp VS App

This repository contains the source code that supported a bachelor thesis comparing
authentication and authorization approaches in centralized and decentralized web
applications.

## Overview

- **Firebase App** – A traditional Web 2.0 Angular application that relies on
  Firebase Authentication (Google sign-in) and Cloud Firestore to manage user
  identities and role-based access in a centralized infrastructure.
- **Juno Dapp** – A Web3 Angular dapp deployed with Juno on the Internet Computer
  that demonstrates decentralized identity management and authorization using
  DID-style user keys.

Together the projects illustrate the practical differences between managed
platform services and decentralized identity tooling when building comparable
features such as gated content and admin-only actions.

## Tech stack

- Angular 16 for the client applications
- Firebase Authentication & Cloud Firestore for the centralized app
- Juno SDK and Internet Computer deployment tooling for the decentralized dapp
