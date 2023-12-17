import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles', () => {
  test('Non logged user can access created article @GAD-R06-01 @predefined_data', async ({
    articlePage,
  }) => {
    // Arrange
    const expectedArticleTitle = 'How to write effective test cases';

    // Act
    await articlePage.goto('?id=1');

    // Assert
    await expect(articlePage.articleTitle).toHaveText(expectedArticleTitle);
  });
});
