const puppeteer = require("puppeteer");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient() 
let users;
let connectedMac = [];
async function deleteUser(userMacs) {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false }); // Use headless: false to see the browser in action
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto("http://192.168.1.1/");

  // Wait for the username input field to be available
  await page.waitForSelector(
    "body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > input"
  );

  // Type the username into the input field
  await page.type(
    "body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > input",
    "useradmin"
  );

  // Wait for the password input field to be available
  await page.waitForSelector(
    "body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > input"
  );

  // Type the password into the input field
  await page.type(
    "body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > input",
    "6fJ6Q"
  );

  // Wait for the submit button to be available
  await page.waitForSelector(
    "body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > input:nth-child(1)"
  );

  // Click the submit button
  await page.click(
    "body > div > form > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(6) > td > input:nth-child(1)"
  );

  // Wait for navigation to complete
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // Take a screenshot for verification
  await page.screenshot({ path: "example.png" });

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
  const filter = await leftBar.$("#myTab > li:nth-child(4) > a");

  //clicking the filter
  await filter.click();

  // //getting all connected user MAC addresses
  // //getting the main frame
  const table = await mainFrame.waitForSelector("#Frame_Content");

  // // getting the content of the main frame
  const frameContent = await table.contentFrame();

  //waiting for the MAC addresses to be available
  await frameContent.waitForSelector(
    "#maclist > tbody > tr > td:nth-child(2) > span"
  );

  //getting the MAC addresses
  const macElements = await frameContent.$$(
    "#maclist > tbody > tr > td:nth-child(2) > span"
  );
  
  await frameContent.waitForSelector(
    "#maclist > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=checkbox]"
  );

  const selectedChecker = await frameContent.$$("#maclist > tbody > tr > td:nth-child(1) > input[type=checkbox]");
  const deleteBtn = await frameContent.waitForSelector("#form_setup > div:nth-child(5) > input:nth-child(2)")
  
  // Check if macElements is empty
  if (macElements.length === 0) {
    console.log("No MAC addresses found");
  } else {
    //printing the MAC addresses
    for (let i = 0; i < macElements.length; i++) {
      const macText = await frameContent.evaluate(
        (el) => el.textContent,
        macElements[i]
      );
      connectedMac.push(macText);
    }
    console.log("connectedMac: ", connectedMac);
    // checking if the given mac adresses array in the mac adress table is in connectedMac array
    async function disconect(){
      for(let i = 0; i < userMacs.length ; i++){
        const mac = userMacs[i]
        const index = connectedMac.indexOf(mac.toLowerCase())
        if(index==-1){return "no user"}
        const checkbox = selectedChecker[ index + 1]
        await checkbox.click()
      }
      await deleteBtn.click()
      page.on("dialog",async(dialog)=>{
        await dialog.accept()
      })
    }
    await disconect()
  }
  //closing the browser
  const logOut = await topFrame.waitForSelector("body > table > tbody > tr:nth-child(2) > td > a:nth-child(4)")

  await logOut.click()
  
  await browser.close()
  return "ok";
}

async function go() {
  try {
    // Capture the current time in milliseconds
    const currentTime = Date.now(); 
    console.log(`Current Time: ${currentTime}`);

    // Fetch users whose heureDeconnection has elapsed
    const users = await prisma.user.findMany({
      where: {
        heureDeconnection: {
          lt: BigInt(currentTime) // Ensure comparison with bigint
        }
      }
    });

    // Custom serialization for BigInt values
    const usersWithSerializedBigInt = users.map(user => ({
      ...user,
      heureDeconnection: user.heureDeconnection.toString()
    }));

    console.log(`Fetched Users: ${JSON.stringify(usersWithSerializedBigInt, null, 2)}`);

    if (users.length > 0) {
      const usermac = users.map(user => user.mac);
      const result = await deleteUser(usermac);
      if (result === "ok") {
        try {
          await prisma.user.deleteMany({
            where: {
              heureDeconnection: {
                lt: BigInt(currentTime) // Ensure comparison with bigint
              }
            }
          });
          console.log(`Users deleted`);
        } catch (error) {
          console.error("An error occurred while deleting users:", error);
        }
      }
    } else {
      console.log(`No users with elapsed time found.`);
    }
  } catch (error) {
    console.error("An error occurred while fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

go();