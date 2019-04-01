require('dotenv').config();

const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver;

const url = "https://s2.kingtime.jp/independent/recorder/personal/";

const id = process.env.USER_ID;
const password = process.env.USER_PASS;

const arrive_button_id = "record_qmXXCxw9WEWN3X/YrkMWuQ==";
const leave_button_id = "record_j8ekmJaw6W3M4w3i6hlSIQ==";

const main = async (button_id) => {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get(url);

    // login
    await driver.wait(until.elementLocated(By.id("id")), 10000);
    await driver.findElement(By.id("id")).sendKeys(id);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.executeScript("document.getElementsByClassName('btn-control-message')[0].click()");

    await driver.wait(until.elementLocated(By.id(button_id)), 10000);
    await driver.executeScript(`document.getElementById('${button_id}').click()`);

    await driver.quit();
};

const button_id = process.argv[0] === "arrive"? arrive_button_id : leave_button_id;
main(button_id);
