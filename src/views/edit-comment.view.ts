import { AddCommentModel } from '../models/comment.model';
import { Page } from '@playwright/test';

export class EditCommentView {
  bodyInput = this.page.getByTestId('body-input');
  updateButton = this.page.getByTestId('update-button');

  constructor(private page: Page) {}

  async updateComment(commentData: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(commentData.body);
    await this.updateButton.click();
  }
}
