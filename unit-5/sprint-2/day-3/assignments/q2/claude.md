Sure, here is the text from the image formatted similarly:

---

# Objective

Create a user schema with an array of nested profile data using MongoDB. Implement validations on schema fields and add routes to perform CRUD operations on user profiles. Additionally, implement a flexible search route using query parameters. This assignment will help you understand nested schemas, complex filtering, and complete CRUD in MongoDB.

## 1. User Schema with Nested Profiles

- Define a user schema with the following fields:
  - `name`: String, required
  - `email`: String, required, must be unique
  - `password`: String, required, minimum length 6
  - `profiles`: Array of nested profile objects
- Each profile subdocument should have:
  - `profileName`: String with values ["twitter", "github", "instagram"], required
  - `url`: String, required, must be a valid URL
- Implement schema-level validations to enforce the above constraints.

# Required API Routes*

## Route 1: POST /add-user

- Create a new user with basic details (name, email, password)
- Ensure duplicate emails are not allowed.

## Route 2: POST /add-profile/:userId

- Add a new profile object to the specified user.
- Validate profileName (enum) and url.

## Route 3: GET /get-users

- Retrieve all users and their profiles.
- Add support for filtering by profile name using query param.

```
/get-users?profileName=github
```

- Returns only users who have a github profile.

## Route 4: GET /search

Search user and profile using query params:

```
/search?name=alice&profileName=github
```

### Response Conditions:

- If user with name alice and profile github exists → return matching profile.
- If user alice exists but profile github not found → return:

```json
{
  "message": "user found, but profile not found",
  "user": "alice",
  "profile": "github"
}
```

- If no user alice exists → return:

```json
{
  "message": "user not found"
}
```

## Route 5: PUT /update-profile/:userId/:profileName

- Update an existing profile (by profileName) for a user.
- Body should allow updating the url.

## Route 6: DELETE /delete-profile/:userId/:profileName

- Delete a specific profile (by profileName) from a user.

---