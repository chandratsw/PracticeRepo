import { BookingAPI } from "./interface/BookingAPI.Interface";


/*Code            Explanation

template: string  PI URL or request template
values: any[]     Dynamic values to replace placeholders
Promise<string>   Function returns a Promise containing a string
template.replace() Replaces matching placeholders
/{(\d+)}/g         Finds placeholders like {0}, {1}, {2}
parseInt(p1, 10)   Converts placeholder index into a number
String(values[index])  Converts the value into a string
: match                Keeps the original placeholder if no matching value exists */

export async function formatAPIRequest(
    template: string, values: any[]
): Promise<string> {
    return template.replace(/{(\d+)}/g, (match, p1) => {
        const index = parseInt(p1, 10);
        return index < values.length ? String(values[index]) : match;
    });
}

export async function getPOSTAPIRequestBody(
    fname: string, 
    lname: string, 
    price: number,
    depositpaid: boolean, 
    additionalneeds: string, 
    checkin: string, 
    checkout: string
) {

    const apiRequest: BookingAPI = {
        firstname: fname,
        lastname: lname,
        totalprice: price,
        depositpaid: depositpaid,
        additionalneeds: additionalneeds,
        bookingdates: {
            checkin: checkin,
            checkout: checkout
        }
    }
    return apiRequest;
} 