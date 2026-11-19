import {test} from "@playwright/test"
test("tesscript file", async ({page})=>
{
    await page.goto(`${process.env.GOOGLE_URL}`)
    console.log("google page opened")
})