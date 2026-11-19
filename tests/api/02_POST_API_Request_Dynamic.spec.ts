import {test,expect} from "@playwright/test";
import { formatAPIRequest } from "../../utils/APIHelper";


import path from "path";
import fs from "fs";

test.use({
    baseURL:process.env.BASE_API_URL,
})

test('Create POST API Request using dynamic api request body in playwright & typescript', async ({ request }) => {

    // Reading json file
    const filePath = path.join(__dirname, '../../testdata/apirequests/Dynamic_POST_API.Request.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

    const values = ['Jayachandra', 'Chagarla', 500];

    // Updating POST API request body
    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

    // Create POST API Request
    const postAPIResponse = await request.post(`/booking`, { data: JSON.parse(postAPIRequest) });

    // Print JSON API response
    const jsonPOSTAPIResponse = await postAPIResponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    // Validating api response
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // Validate propert/key names
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('firstname');
    expect(jsonPOSTAPIResponse.booking).toHaveProperty('lastname');

    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkout');

    // Validate API response body
    expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
    expect(jsonPOSTAPIResponse.booking.firstname).toBe('Jayachandra');
    expect(jsonPOSTAPIResponse.booking.lastname).toBe('Chagarla');

    expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2025-01-15');
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkout).toBe('2025-01-17');
});
