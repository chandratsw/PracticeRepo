import { test, expect } from "@playwright/test";
import { formatAPIRequest } from "../../utils/APIHelper";


import path from "path";
import fs from "fs";

/*
@faker-js/faker is a JavaScript/TypeScript library for generating realistic fake data for testing, development, and prototyping.
Common features:
faker.person – Names, gender, job titles. */
import { faker } from "@faker-js/faker";
test.use({
    baseURL: process.env.BASE_API_URL,
})

test('Create POST API Request using dynamic api request body in playwright with JFaker', async ({ request }) => {



    /* const – Declares a variable whose value cannot be reassigned.
       filePath – Stores the complete path of the JSON file.
        path.join() – Joins multiple path segments into one valid file path.
        __dirname – Represents the directory path of the current TypeScript/JavaScript file.
        ../../ – Moves two folders backward.
         testdata/apirequests/ – Enters the testdata and apirequests folders.
          Dynamic_POST_API.Request.json – The JSON file name.

          fs – Node.js File System module.
          readFileSync() – Reads the file synchronously.
          filePath – Specifies which file needs to be read.
          'utf-8' – Reads the file content as readable text.
           jsonTemplate – Stores the JSON file content as a string. */

    // Reading json file

    const filePath = path.join(__dirname, '../../testdata/apirequests/Dynamic_POST_API.Request.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });

    const values = [firstName, lastName, totalPrice];

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
    expect(jsonPOSTAPIResponse.booking.firstname).toBe(firstName);
    expect(jsonPOSTAPIResponse.booking.lastname).toBe(lastName);

    expect(jsonPOSTAPIResponse.booking.bookingdates.checkin).toBe('2025-01-15');
    expect(jsonPOSTAPIResponse.booking.bookingdates.checkout).toBe('2025-01-17');
});