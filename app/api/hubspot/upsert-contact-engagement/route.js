// File: /app/api/api_name/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';
import moment from 'moment';

const accessToken = process.env.ACCESS_TOKEN;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};

const apiUrlCreate = 'https://api.hubapi.com/crm/v3/objects/contacts/batch/create';
const apiUrlUpdate = 'https://api.hubapi.com/crm/v3/objects/contacts/batch/update';
const apiUrlSearch = 'https://api.hubapi.com/crm/v3/objects/contacts/search';
const engagementApiUrl = 'https://api.hubapi.com/engagements/v1/engagements';

const searchContactByEmail = async (email) => {
  const payloadSearch = {
    limit: 1,
    after: '0',
    sorts: ['hs_object_id'],
    properties: ['hs_object_id', 'campaign', 'all_campaigns', 'hs_marketable_status'],
    filterGroups: [
      {
        filters: [
          {
            propertyName: 'email',
            value: email,
            operator: 'EQ',
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(apiUrlSearch, payloadSearch, { headers });
    if (response.data && response.data.results && response.data.results.length > 0) {
      return response.data.results[0].id;
    }
    return null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const createUser = async (email, campaign) => {
  const contactPayload = {
    inputs: [
      {
        properties: {
          campaign: campaign,
          email: email,
          hs_marketable_status: "true",
        },
        createdAt: `${moment().format('YYYY-MM-DD')}`,
        updatedAt: `${moment().format('YYYY-MM-DD')}`,
        archived: false,
      },
    ],
  };

  try {
    const response = await axios.post(apiUrlCreate, contactPayload, { headers });
    const contactId = response.data.results[0].id;
    return contactId;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const updateUser = async (contactId, campaign) => {
  const contactPayload = {
    inputs: [
      {
        id: contactId,
        properties: {
          campaign: campaign,
          hs_marketable_status: "true",
        },
        updatedAt: `${moment().format('YYYY-MM-DD')}`,
      },
    ],
  };

  try {
    const response = await axios.post(apiUrlUpdate, contactPayload, { headers });
    console.log('User updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
  }
};

const createEngagementTypeNote = async (contactId, action, campaign) => {
  const engagementPayload = {
    engagement: {
      active: true,
      type: 'NOTE',
      timestamp: new Date().getTime(),
    },
    associations: {
      contactIds: [contactId],
    },
    metadata: {
      body: `${action}|${moment().format('YYYY-MM-DD HH:mm:ss')}|${campaign}`,
    },
  };

  try {
    const response = await axios.post(engagementApiUrl, engagementPayload, { headers });
    console.log('Engagement created successfully:', response.data);
  } catch (error) {
    console.error('Error creating engagement:', error.response ? error.response.data : error.message);
  }
};

const apiSyncDataContactEngagement = async (email, action, campaign) => {
  try {
    if (!email || !action || !campaign) {
      console.log('========= BAD Request =========');
      return;
    }

    let contactId = await searchContactByEmail(email);

    if (contactId) {
      await updateUser(contactId, campaign);
    } else {
      contactId = await createUser(email, campaign);
    }

    await createEngagementTypeNote(contactId, action, campaign);
  } catch (error) {
    console.error('An error occurred in the process:', error.message);
  }
};

// API route handler using NextResponse
export async function POST(request) {
  try {
    const { email, action, campaign } = await request.json();  // Parse the incoming request body

    await apiSyncDataContactEngagement(email, action, campaign);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
