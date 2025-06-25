# Supabase Setup Guide

This guide will help you connect your API Key Management dashboard to a Supabase database.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter a project name (e.g., "api-key-manager")
5. Enter a database password (save this securely)
6. Choose a region close to your users
7. Click "Create new project"

## Step 2: Set Up the Database

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy the contents of `supabase-setup.sql`
3. Paste it into the SQL editor and click "Run"
4. This will create the `api_keys` table with all necessary indexes and triggers

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. In your project root, create a `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## Step 5: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click "Manage API Keys"
4. Try creating, editing, and deleting API keys

## Database Schema

The `api_keys` table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Primary key |
| `name` | VARCHAR(255) | API key name (required) |
| `key` | VARCHAR(255) | Unique API key string |
| `description` | TEXT | Optional description |
| `permissions` | TEXT[] | Array of permissions (read, write, delete) |
| `status` | VARCHAR(50) | Status (active, inactive, revoked) |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

## Security Features

- **Row Level Security (RLS)** is enabled
- **Unique constraints** on API keys
- **Automatic timestamps** for created_at and updated_at
- **Status validation** (only allows active, inactive, revoked)

## Customization

### Row Level Security Policies

The current setup allows all operations. For production, you should customize the RLS policies:

```sql
-- Example: Only allow operations for authenticated users
CREATE POLICY "Users can manage their own API keys" ON api_keys
    FOR ALL USING (auth.uid() = user_id);
```

### Additional Fields

You can add more fields to the table as needed:

```sql
-- Example: Add user_id field for multi-user support
ALTER TABLE api_keys ADD COLUMN user_id UUID REFERENCES auth.users(id);
```

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env.local` file exists and has the correct values
   - Restart your development server after adding environment variables

2. **"Failed to fetch API keys"**
   - Check that your Supabase URL and API key are correct
   - Verify the `api_keys` table exists in your database
   - Check the browser console for detailed error messages

3. **"Permission denied"**
   - Ensure RLS policies are configured correctly
   - Check that your API key has the necessary permissions

### Debug Mode

To see detailed error messages, check the browser console and server logs. The API routes include comprehensive error logging.

## Production Deployment

For production deployment:

1. Use environment variables in your hosting platform
2. Set up proper RLS policies for security
3. Consider using Supabase Auth for user management
4. Set up database backups
5. Monitor API usage and performance

## Support

If you encounter issues:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the error messages in your browser console
3. Check the Supabase dashboard logs
4. Ensure your database schema matches the expected structure 