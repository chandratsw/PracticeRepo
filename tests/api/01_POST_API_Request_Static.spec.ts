import {test,expect} from "@playwright/test";
import postAPIRequest from "../../testdata/apirequests/POST_API_Request.json";
import { request } from "node:http";

test.use({
    baseURL:process.env.BASE_API_URL,
})
/* TC1 test dev */
test("Create POST API Request using static file in playwright",async({request})=>
{
    //create POST API Request
    const postApiResponse= await request.post('/booking',{data:postAPIRequest})

     //print JSON API Response
    const postApiResponseJson=await postApiResponse.json();
    /*  JSON.stringify() converts a JavaScript object into a JSON string. 
        We use JSON.stringify(response, null, 2) to print API responses in a formatted, readable way. */
    console.log("Post Json API Response" +JSON.stringify(postApiResponseJson,null,2));

    expect(postApiResponse.status()).toBe(200);
    expect(postApiResponse.statusText()).toBe('OK');

   /* headers() returns an object containing response headers.
      ['content-type'] accesses the specific Content-Type header.
      toContain('application/json') checks whether its value contains application/json. */

    expect(postApiResponse.headers()['content-type']).toContain('application/json');

    //validate Property/Key names
    expect(postApiResponseJson.booking).toHaveProperty('firstname');
    expect(postApiResponseJson.booking).toHaveProperty("lastname");
    expect(postApiResponseJson.booking.bookingdates).toHaveProperty('checkin');
    expect(postApiResponseJson.booking.bookingdates).toHaveProperty('checkout');

    //validate API Response
    expect(postApiResponseJson.bookingid).toBeGreaterThan(0);
    expect(postApiResponseJson.booking.firstname).toBe('playwright typescript by testers talk');
    expect(postApiResponseJson.booking.lastname).toBe('playwright javascript by testers talk');
    expect(postApiResponseJson.booking.bookingdates.checkin).toBe('2025-01-15');
    expect(postApiResponseJson.booking.bookingdates.checkout).toBe('2025-01-17');

    
})