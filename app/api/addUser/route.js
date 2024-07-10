//setting up the next js api route
import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import puppeteer from 'puppeteer';
const connectedMac = []

async function run(adressIp) {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false }); // Use headless: false to see the browser in action
  const page = await browser.newPage();
  
  // Navigate to the login page
  await page.goto('http://192.168.1.1/');

  // Wait for the username input field to be available
  await page.waitForSelector('body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > input');

  // Type the username into the input field
  await page.type('body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > input', 'useradmin');

  // Wait for the password input field to be available
  await page.waitForSelector('body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > input');

  // Type the password into the input field
  await page.type('body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > input', '6fJ6Q');

  // Wait for the submit button to be available
  await page.waitForSelector('body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > input:nth-child(1)');

  // Click the submit button
  await page.click('body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > input:nth-child(1)');

  // Wait for navigation to complete
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // Take a screenshot for verification
  await page.screenshot({ path: 'example.png' });

  // Get the top frame element
  const topFrameElement = await page.$("frame[name='topFrame']");
  
  // Get the top frame's content frame
  const topFrame = await topFrameElement.contentFrame();
  
  // Wait for the element inside the top frame to be available
  await topFrame.waitForSelector("#myMenu > li:nth-child(4) > a");

  // Click the security link in the top frame
  await topFrame.click("#myMenu > li:nth-child(4) > a");

  // Get the main frame element
  const mainFrameElement = await page.$("frame[name='mainFrame']");
  
  // Get the main frame's content frame
  const mainFrame = await mainFrameElement.contentFrame();

  // Wait for the left bar element to be available
  const leftBarElement = await mainFrame.waitForSelector("#left_bar");

  // Get the left bar's content frame
  const leftBar = await leftBarElement.contentFrame();

  // Wait for the left bar link to be available
  await leftBar.waitForSelector("#myTab > p > a");

  // Select the security link
  const securityLink = await leftBar.$("#myTab > p > a");

  // Click the link
  await securityLink.click();
  
  // Wait for the left bar link to be available
  await leftBar.waitForSelector("#myTab > li:nth-child(4) > a");

  //selecting the mac filter
  const filter = await leftBar.$("#myTab > li:nth-child(4) > a")

  //clicking the filter 
  await filter.click()

  // //getting all connected user MAC addresses
  // //getting the main frame 
  const table = await mainFrame.waitForSelector("#Frame_Content")

  // // getting the content of the main frame
  const frameContent = await table.contentFrame()

  const addBtn = await frameContent.waitForSelector("#createNew")

  addBtn.click()

  const input = await frameContent.waitForSelector("#macaddr")

  input.type(adressIp)

  console.log(input.value)

  const confirm = await frameContent.waitForSelector("#form2 > div:nth-child(3) > input:nth-child(1)")

  confirm.click()

  const logOut = await topFrameElement.waitForSelector("#logout")

  logOut.click()
  
  browser.close()
}

export async function POST(request,response) {
  const { mac } = await request.json();

  await run(await mac)
  .catch((err)=>{
      return new Response(err)
    }
  )
  .then(
    ()=>{
      return Response.json({ mac });
    }
  )
  .finally(()=>{
    if(err){
      return Response.json(err);
    }
  })
}


  // //waiting for the MAC addresses to be available
  // await frameContent.waitForSelector("#maclist > tbody > tr > td:nth-child(2) > span")

  // //getting the MAC addresses
  // const macElements = await frameContent.$$("#maclist > tbody > tr > td:nth-child(2) > span")


  // // Check if macElements is empty
  // if (macElements.length === 0) {
  //   console.log("No MAC addresses found");
  // } else {
  //   console.log(`${macElements.length} MAC addresses found`);

  //   //printing the MAC addresses
  //   for (let i = 0; i < macElements.length; i++) {
  //     const macText = await frameContent.evaluate(el => el.textContent, macElements[i])
  //     console.log(macText)
  //     connectedMac.push(macText)
  //     console.log("connectedMac: ", connectedMac);
  //   }
  // }

  // // Take a screenshot for verification
  // await page.screenshot({ path: 'urlfilter_left.png' });

  // //closing the browser