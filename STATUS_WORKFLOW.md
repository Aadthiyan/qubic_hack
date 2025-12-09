# Project Status Workflow

## Status Lifecycle

All projects in Nostromo Guardian follow this workflow:

1. **Draft** (Initial)
   - Created when you save a project from the Sandbox
   - Project is being prepared and reviewed
   - **Who changes it:** You (the project creator)

2. **Submitted**
   - Project is ready for review by the platform
   - **Who changes it:** You click the status badge and select "Submitted"
   - This signals that your project is ready for evaluation

3. **Approved**
   - Project has been reviewed and approved by platform admins
   - **Who changes it:** Platform administrators/reviewers
   - In your current setup, you can manually change this via the status dropdown

4. **Launched**
   - Project has been successfully launched on the Qubic network
   - **Who changes it:** Platform administrators after launch confirmation
   - In your current setup, you can manually change this via the status dropdown

5. **Failed**
   - Project did not meet requirements or launch failed
   - **Who changes it:** Platform administrators or automatic system checks
   - In your current setup, you can manually change this via the status dropdown

## How to Change Status

### On Project Detail Page:
1. Click on the current status badge (e.g., "Draft")
2. A dropdown will appear with all available statuses
3. Click the desired status
4. The page will refresh with the updated status

### Via API:
```bash
curl -X PATCH http://localhost:4000/api/projects/{project-id}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "submitted"}'
```

## Current Implementation

Right now, **anyone can change any status** because there's no authentication system. 

In a production environment, you would add:
- User authentication (login system)
- Role-based access control (RBAC)
- Only project owners can submit
- Only admins can approve/launch/fail

## Next Steps for Production

1. Add authentication middleware
2. Add user roles (user, admin, reviewer)
3. Restrict status changes based on roles
4. Add audit logs for status changes
5. Add email notifications on status changes
