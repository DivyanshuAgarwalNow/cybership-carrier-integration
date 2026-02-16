# Cybership Carrier Integration Service

This project implements a shipping carrier integration module around the UPS Rating API.

The focus was to design a structure that could realistically support multiple carriers (UPS, FedEx, DHL etc.) and multiple operations in the future without rewriting existing code.

Since no UPS credentials were available, API calls are stubbed and integration logic is verified using mocked responses.

## Features

- Rate shopping with normalized response
- UPS OAuth token lifecycle (fetch, cache, refresh)
- Extensible carrier architecture
- Runtime validation using Zod
- Structured error handling
- Integration tests with stubbed HTTP

## Run

npm install
npm test
