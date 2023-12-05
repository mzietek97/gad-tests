import { STORAGE_STATE } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { testUser1 } from '@_src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('login and save session', async ({ page }) => {
  // Arrange
  const expectedWelcomeTitle = 'Welcome';
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.goto();
  const welcomePage = await loginPage.login(testUser1);

  const title = await welcomePage.getTitle();

  // Assert
  expect(title).toContain(expectedWelcomeTitle);
  await page.context().storageState({ path: STORAGE_STATE });
});
