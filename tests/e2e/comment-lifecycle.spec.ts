import { prepareRandomArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    const addArticleView = new AddArticleView(page);
    addCommentView = new AddCommentView(page);

    articleData = prepareRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });

  test('create new comment @GAD-R06-01', async () => {
    // Create new comment
    // Arrange
    const expectAlertPopupText = 'Comment was created';
    const expectedAddCommentHeader = 'Add New Comment';

    // Act
    await articlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText(
      expectedAddCommentHeader,
    );
    await addCommentView.bodyInput.fill('Hello');
    await addCommentView.saveButton.click();

    // Assert
    await expect(articlePage.alertPopUp).toHaveText(expectAlertPopupText);
  });
});
