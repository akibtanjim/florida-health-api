const puppeteer = require("puppeteer");
const randomUseragent = require("random-useragent");
const { prepareScrappedDataResponse } = require("./utils");

const formFieldsIds = {
  ProviderType: "ctl00_mainContentPlaceHolder_FacilityType",
  Name: "ctl00_mainContentPlaceHolder_FacilityName",
  City: "ctl00_mainContentPlaceHolder_City",
};

const createInstance = async () => {
  return puppeteer.launch({
    headless: true,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ["--enable-automation"],
  });
};

const setUp = async page =>
  Promise.all([
    await page.setUserAgent(randomUseragent.getRandom()),
    await page.setDefaultNavigationTimeout(0),
    await page.goto(
      `https://www.floridahealthfinder.gov/facilitylocator/FacilitySearch.aspx`,
      {
        waitUntil: "load",
        defaultViewport: null,
      }
    ),
  ]);

const prepareSubmitData = async ({ page, name, city, providerType }) =>
  Promise.all([
    await page.type(`#${formFieldsIds.ProviderType}`, providerType || "ALL"),
    await page.type(`#${formFieldsIds.Name}`, name || ""),
    await page.type(`#${formFieldsIds.City}`, city || ""),
  ]);

const submitSearchForm = async page =>
  Promise.all([
    page.click(`#ctl00_mainContentPlaceHolder_SearchButton`),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

const scrapeData = async ({ name, city, providerType }) => {
  const browser = await createInstance();
  const page = await browser.newPage();
  await setUp(page);
  await prepareSubmitData({ page, name, city, providerType });
  await submitSearchForm(page);
  const items = await page.$$eval(
    "#ctl00_mainContentPlaceHolder_dgFacilities > tbody > tr ",
    trs =>
      trs.map(tr => {
        const tds = [...tr.getElementsByTagName("td")];
        return tds.map(td => td.innerText);
      })
  );
  const result = prepareScrappedDataResponse(items);
  await browser.close();
  return result;
};

module.exports = {
  scrapeData,
};
