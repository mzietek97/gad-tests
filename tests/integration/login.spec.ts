import { LoginUserModel } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { testUser1 } from '@_src/test-data/user.data';
import { faker } from '@faker-js/faker/locale/en';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    const expectedWelcomeTitle = 'Welcome';
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    const welcomePage = await loginPage.login(testUser1);

    const title = await welcomePage.getTitle();

    // Assert
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('reject login with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const expectedLoginTitle = 'Login';
    const loginPage = new LoginPage(page);

    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: faker.internet.password(),
    };

    // Act
    await loginPage.goto();
    await loginPage.login(loginUserData);

    // Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
    const title = await loginPage.getTitle();
    expect.soft(title).toContain(expectedLoginTitle);
  });
});
