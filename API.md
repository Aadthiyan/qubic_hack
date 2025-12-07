# Nostromo Guardian API Reference

**Base URL**: `/api`
**Version**: v1
**Content-Type**: `application/json`

## Authentication
Requests to write endpoints should include the `x-api-key` header.
- Header: `x-api-key: <YOUR_API_KEY>`

## Endpoints

### 🟢 Service Health
- `GET /health`
  - **Description**: Check if the API service is running.
  - **Response**: `{ status: "ok", timestamp: "..." }`

### 📁 Projects
- `GET /projects`
  - **Description**: List all projects with pagination and status filtering.
  - **Query Params**: `page` (number), `limit` (number), `status` (string).
  - **Response**: `{ success: true, data: { projects: [...], pagination: {...} } }`

- `GET /projects/:id`
  - **Description**: Get detailed project report, score breakdown, and metadata.
  - **Response**: `{ success: true, data: { project: {...}, score: {...}, metadata: {...} } }`

- `POST /projects`
  - **Description**: Submit a new project for audit.
  - **Body**: See `SimulateRequest` structure below.
  - **Response**: `{ success: true, data: { id: "...", ... } }`

### 🧮 Simulation (Sandbox)
- `POST /simulate`
  - **Description**: Calculate a hypothetical score without saving to database.
  - **Body**:
    ```json
    {
      "name": "Test Project",
      "teamAllocationPercent": 15,
      "teamVestingMonths": 12,
      "hasFounderLocks": true,
      "supplyDistributionFair": true,
      "hasWhitepaper": true,
      "hasRoadmap": true,
      "documentationClarity": 8,
      "priorProjects": 1,
      "trackRecord": "neutral",
      "twitterFollowers": 1000,
      "discordMembers": 500,
      "githubActivity": 5,
      "hasAudit": false,
      "hasBugBounty": false,
      "hasKYC": false
    }
    ```
  - **Response**: `{ success: true, data: { score: 75, grade: "Yellow", breakdown: {...}, flags: [...] } }`

### 📊 Analytics
- `GET /analytics`
  - **Description**: Get ecosystem-wide statistics (Average scores, Risk distribution).

### ⛓️ Smart Contract
- `GET /contract/score/:projectId`
  - **Description**: Fetch verified score directly from Qubic network via RPC.
  - **Response**: `{ success: true, data: { ... } }`

- `POST /contract/set-score` (Admin Only)
  - **Description**: Publish score to Qubic network.

## Error Codes
- `400`: Bad Request (Validation Error).
- `401`: Unauthorized (Invalid API Key).
- `404`: Resource Not Found.
- `500`: Internal Server Error.
