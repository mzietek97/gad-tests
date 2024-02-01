import { prepareRandomComment } from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.utils';

test.describe('Verify comment', () => {
    test('should return created comment @GAD-R07-06 @logged', async ({
        createRandomArticle,
        page,
    }) => {
        // Arrange
        const expectedCommentCreatedPopup = 'Comment was created';
        const newCommentData = prepareRandomComment();
        let articlePage = createRandomArticle.articlePage;

        const responsePromise = waitForResponse(page, '/api/comments', 'GET');

        // Act
        const addCommentView = await articlePage.clickAddCommentButton();
        articlePage = await addCommentView.createComment(newCommentData);
        const response = await responsePromise;

        // Assert
        await expect
            .soft(articlePage.alertPopUp)
            .toHaveText(expectedCommentCreatedPopup);
        expect(response.ok).toBeTruthy();
    });
});
