import { test, expect } from '@playwright/test';

test('user cannot login with invalid username', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('wrong_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface')).toBeVisible();
});

test('user cannot login with invalid password', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface')).toBeVisible();
});