---
title: "Organizations"
description: "Guide to managing organizations in Capgo, covering creation, settings, updates, and retrieval of organization details."
sidebar:
  order: 2
---

Organizations are the top-level entities in Capgo. They allow you to group apps, team members, and resources under a single umbrella. Each organization can have multiple members with different roles and permissions.

## Common Use Cases

- Creating a new organization for your company
- Managing organization settings
- Updating organization information
- Retrieving organization details

## Endpoints

### GET

`https://api.capgo.app/organization/`

Retrieve organization information. If `orgId` is provided in the parameters, returns a single organization. Otherwise, returns all accessible organizations.

#### Query Parameters

- `orgId` (optional): The ID of the specific organization to retrieve

#### Response Type

```typescript
interface Organization {
  id: string
  created_by: string
  created_at: string
  updated_at: string
  logo: string | null
  name: string
  management_email: string
  customer_id: string | null
}
```

#### Example Request

```bash
# Get all organizations
curl -H "x-api-key: YOUR_API_KEY" https://api.capgo.app/organization/

# Get specific organization
curl -H "x-api-key: YOUR_API_KEY" https://api.capgo.app/organization/?orgId=org_123
```

#### Example Response

```json
{
  "data": {
    "id": "org_123",
    "name": "My Company",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "logo": "https://example.com/logo.png",
    "management_email": "admin@example.com",
    "customer_id": "cus_123"
  }
}
```

### POST

`https://api.capgo.app/organization/`

Create a new organization.

When using an API key, the key must have the global `org.create` permission and a current organization-scoped `org_admin` or `org_super_admin` binding. This is required because the target organization does not exist yet, so normal org-scoped RBAC cannot be checked against it.

When the request succeeds, Capgo automatically assigns the same API key as `org_super_admin` on the new organization.

:::note
`org.create` is not granted to new API keys by default. Enable **Allow creating organizations** in the API key form, or include `"global_permissions": ["org.create"]` when creating the key through the API.
:::

#### Request Body

```typescript
interface OrganizationCreate {
  name: string
  email?: string
  estimatedMau?: number
  website?: string
}
```

#### Example Request

```bash
curl -X POST \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Organization",
    "email": "admin@example.com",
    "website": "https://example.com"
  }' \
  https://api.capgo.app/organization/
```

#### Example Response

```json
{
  "id": "org_456"
}
```

#### Permission Error

If the API key does not have `org.create`, the API returns:

```json
{
  "error": "permission_denied"
}
```

### PUT

`https://api.capgo.app/organization/`

Update an existing organization. Requires admin role on the target organization.

#### Request Body

```typescript
interface OrganizationUpdate {
  orgId: string
  logo?: string
  name?: string
  management_email?: string
}
```

#### Example Request

```bash
curl -X PUT \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "orgId": "org_123",
    "name": "New Company Name",
    "management_email": "newemail@example.com"
  }' \
  https://api.capgo.app/organization/
```

#### Example Response

```json
{
  "status": "Organization updated",
  "data": {
    "id": "org_123",
    "name": "New Company Name",
    "management_email": "newemail@example.com"
  }
}
```

### DELETE

`https://api.capgo.app/organization/`

Delete an existing organization. Requires delete permission on the target organization, typically through the `org_super_admin` role. This action is irreversible and will remove all associated apps, bundles (versions), and resources.

The `org.create` global permission does not allow deleting organizations.

#### Query Parameters

- `orgId`: The ID of the organization to delete

#### Example Request

```bash
curl -X DELETE \
  -H "x-api-key: YOUR_API_KEY" \
  https://api.capgo.app/organization/?orgId=org_123
```

#### Example Response

```json
{
  "status": "ok"
}
```

## Error Handling

Common error scenarios and their responses:

```json
// Invalid API key
{
  "error": "Invalid API key",
  "status": "KO"
}

// Missing required field
{
  "error": "Name is required",
  "status": "KO"
}

// Insufficient permissions
{
  "error": "Admin role required",
  "status": "KO"
}
```

## Best Practices

1. **Naming**: Use clear, descriptive names for organizations
2. **Roles**: Assign appropriate roles to team members
3. **Email**: Use a group email for management_email to avoid issues with personal email changes
4. **Logo**: Host logos on a reliable CDN and use HTTPS URLs

## Keep going from Organizations

If you are using **Organizations** to plan dashboard and API operations, connect it with [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, [Devices](/docs/public-api/devices/) for the implementation detail in Devices, and [Bundles](/docs/public-api/bundles/) for the implementation detail in Bundles.
