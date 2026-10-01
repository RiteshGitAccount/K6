import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  }
};

export default async function () {
  // FIXED: Added 'await' here so the browser window initializes visible 
  const page = await browser.newPage();
  
  try {
    await page.goto('https://quickpizza.grafana.com/my_messages.php');

    // FIXED: Resolved the async text content extraction inside the check hook
    const headerText = await page.locator('body > h2').textContent();
    check(headerText, {
      'check page header is Unauthorized': (text) => text === 'Unauthorized'
    });

    // FIXED: Added 'await' to input fills and clicks so they don't fire out-of-order
    await page.locator('input[name="login"]').fill('admin'); // 'fill' is preferred over 'type' in modern k6
    await page.locator('input[name="password"]').fill('123');
    
    // Set up a promise hook to capture the navigation change caused by the click event
    await Promise.all([
      page.waitForNavigation(),
      page.locator('input[type=submit]').click(),
    ]);

    // FIXED: Added 'await' to the screenshot capturing function
    await page.screenshot({ path: 'screenshots/2-authenticated.png' });

    const authHeaderText = await page.locator('body > h2').textContent();
    check(authHeaderText, {
      'check page header is Welcome': (text) => text === 'Welcome, admin!'
    });
  } finally {
    // Best practice to always tear down the context at the end of an iteration
    await page.close();
  }
}
