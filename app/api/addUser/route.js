import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
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

  const confirm = await frameContent.waitForSelector("#form2 > div:nth-child(3) > input:nth-child(1)")

  await confirm.click()

  page.on("dialog",async(dialog)=>{
    await dialog.accept()
  })
  const logOut = await topFrame.waitForSelector("body > table > tbody > tr:nth-child(2) > td > a:nth-child(4)")

  await logOut.click()
  
  await browser.close()
}

export async function POST(request,response) {
  const { mac , time , name , numero } = await request.json();
  const dureeDeConnexion = time; // Example duration day
  const dateConnection = Date.now();
  const dateDeconnexion = new Date(dateConnection + ( dureeDeConnexion * 86400000)); // Add duration in milliseconds
  await run(await mac)
  .catch(()=>{
      return new Response("error occured")
    }
  )
  .then(
    async ()=>{
      const newUser = await prisma.user.create({
        data: {
          noms: name,
          mac: mac.toLowerCase() ,
          numero: numero,
          dureeDeConnexion: dureeDeConnexion,
          dateConnection: new Date(dateConnection),
          dateDeconnexion: dateDeconnexion,
          heureDeconnection: dateDeconnexion.getTime()
        }
      });
      return Response.json({ mac  });
    }
  )
  return Response.json({mac})
}
