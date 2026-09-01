import { test, expect } from '@playwright/test';

test('user can login successfully', async ({ page }) => {

  // 1. Open the application
  await page.goto('https://www.saucedemo.com/');

  // 2. Enter username
  await page.getByPlaceholder('Username').fill('standard_user');

  // 3. Enter password
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // 4. Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // 5. Verify successful login
  await expect(page).toHaveTitle(/Swag Labs/);
});