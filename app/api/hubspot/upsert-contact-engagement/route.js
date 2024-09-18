// File: /app/api/api_name/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';
import moment from 'moment';

const accessToken = process.env.ACCESS_TOKEN;

const headers = {
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};
const marketingContactStatus = true;

const apiUrlCreate = 'https://api.hubapi.com/crm/v3/objects/contacts/batch/create';
const apiUrlUpdate = 'https://api.hubapi.com/crm/v3/objects/contacts/batch/update';
const apiUrlSearch = `https://api.hubapi.com/crm/v3/objects/contacts/search`;
const engagementApiUrl = 'https://api.hubapi.com/engagements/v1/engagements';

const searchAndUpdateContactByEmailOrPhone = async (email = null, phone = null) => {
  const filters = [];
  
  if (email) {
    filters.push(
      {
        "filters": [
          {
            "propertyName": "email",
            "value": email,
            "operator": "EQ"
          },
        ]
      });
  }

  if (phone) {
    filters.push({
      "filters": [
        {
          "propertyName": "phone",
          "value": phone,
          "operator": "EQ"
        }
      ]
    });
  }

  if (filters.length === 0) {
    console.error('Either email or phone must be provided');
    return null;
  }

  const payloadSearch = {
    limit: 2, // Return up to 2 contacts to handle duplicates
    after: '0',
    sorts: ['hs_object_id'],
    properties: ['hs_object_id', 'lifecyclestage','createdate','hs_lastmodifieddate',],
    properties: ['hs_object_id', 'campaign', 'all_campaigns', 'hs_marketable_status', 'lifecyclestage','hs_legal_basis','old_hs_legal_basis','themis_consent_status','createdate','hs_lastmodifieddate',],
    filterGroups: filters,
  };

  console.log("payloadSearch", JSON.stringify(payloadSearch, null, 2));

  try {
    const response = await axios.post(apiUrlSearch, payloadSearch, { headers });
    const results = response.data.results;
    console.log("results", JSON.stringify(results, null, 2));
    if (results.length === 0) {
      console.log('No contact found');
      return null;
    }

    // Sort results by 'createdate' or 'hs_lastmodifieddate' to decide which to update
    results.sort((a, b) => new Date(b.properties.createdate) - new Date(a.properties.createdate));
    
    // Update the first contact found
    const contactToUpdate = results[0];
    console.log("Search contact:", contactToUpdate.id);

    return contactToUpdate.id;
  } catch (error) {
    console.error('Error fetching or updating contacts:', error);
    return null;
  }
};

const createUser = async (email = null, phone = null, customerStatus = null, campaign) => {

  let properties = {
    campaign: campaign,
    lifecyclestage: customerStatus,
    hs_marketable_status: marketingContactStatus,
    themis_consent_status: "Success",
    themis_update_status: "New Consent",
    hs_legal_basis: "Freely given consent from contact"
  };

  if (phone) {
    properties.phone = phone;
  }

  if (email) {
    properties.email = email;
  }

  let lifecyclestage = "subscriber";
  if (customerStatus) {
    if (customerStatus === 'Member') {
      lifecyclestage = "249323405";
    } else if (customerStatus === 'Customer') {
      lifecyclestage = "customer";
    } else if (customerStatus === 'Investor') {
      lifecyclestage = "249313422";
    }
  }

  properties.lifecyclestage = lifecyclestage;

  const contactPayload = {
    inputs: [
      {
        properties: properties,
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

const updateUser = async (contactId, email, phone, customerStatus, campaign) => {
  const contactPayload = {
    inputs: [
      {
        id: contactId,
        properties: {
          campaign: campaign,
          hs_marketable_status: marketingContactStatus,
          themis_consent_status: "Success",
          themis_update_status: "New Consent",
          hs_legal_basis: "Freely given consent from contact",
          phone: phone,
          email: email,
          lifecyclestage: customerStatus,
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

const createEngagementTypeNote = async (contactId, action = null, campaign) => {
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
      body: `${action ? 'Subscriber' : action}|${moment().format('YYYY-MM-DD HH:mm:ss')}|${campaign}`,
    },
  };

  try {
    const response = await axios.post(engagementApiUrl, engagementPayload, { headers });
    console.log('Engagement created successfully:', response.data);
  } catch (error) {
    console.error('Error creating engagement:', error.response ? error.response.data : error.message);
  }
};

const apiSyncDataContactEngagement = async (email, phone, customerStatus, action, campaign) => {
  try {
    if ((!email && !phone) || !campaign) {
      console.log('========= BAD Request =========');
      return;
    }

    let contactId = await searchAndUpdateContactByEmailOrPhone(email, phone);

    if (contactId) {
      await updateUser(contactId, email, phone, customerStatus, campaign);
    } else {
      contactId = await createUser(email, phone, customerStatus, campaign);
    }

    await createEngagementTypeNote(contactId, action, campaign);
  } catch (error) {
    console.error('An error occurred in the process:', error.message);
  }
};

// API route handler using NextResponse
export async function POST(request) {
  try {
    const { email, phone, customerStatus, action, campaign } = await request.json();  // Parse the incoming request body

    await apiSyncDataContactEngagement(email, phone, customerStatus, action, campaign);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
