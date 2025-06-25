import { supabase } from '../../../lib/supabase'

// API route for managing API keys
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching API keys:', error)
      return Response.json({ error: 'Failed to fetch API keys' }, { status: 500 })
    }

    return Response.json(data || [])
  } catch (error) {
    console.error('Unexpected error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name) {
      return Response.json({ error: 'Name is required' }, { status: 400 })
    }

    // Generate a new API key
    const newApiKey = {
      name: body.name,
      key: `dandi_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
      description: body.description || '',
      permissions: body.permissions || [],
      status: 'active'
    }

    const { data, error } = await supabase
      .from('api_keys')
      .insert([newApiKey])
      .select()
      .single()

    if (error) {
      console.error('Error creating API key:', error)
      return Response.json({ error: 'Failed to create API key' }, { status: 500 })
    }

    return Response.json(data, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return Response.json({ error: 'ID is required' }, { status: 400 })
    }

    const updateData = {
      name: body.name,
      description: body.description,
      permissions: body.permissions,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('api_keys')
      .update(updateData)
      .eq('id', body.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating API key:', error)
      return Response.json({ error: 'Failed to update API key' }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting API key:', error)
      return Response.json({ error: 'Failed to delete API key' }, { status: 500 })
    }

    return Response.json({ message: 'API key deleted successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
} 