import { urlComments } from '../../helpers/urls.js';
import { CommentCodablePOSTResponse, CommentCodableServerFormat } from '../../models/comment.js';
import { Fetch } from '../../services/httpService.js';
import { ShowComments } from './ShowComments.js';

// Functionality for comment adding
export class AddComment {
  inputCommentText: HTMLTextAreaElement;

  constructor(private userId: string, private postId: string, private postText: string) {
    this.inputCommentText = document.getElementById('addcomment')! as HTMLTextAreaElement;
    this.configure();
  }

  // Add Event listener
  private configure() {
    const addCommentBtn = document.getElementById('addcommentform')! as HTMLFormElement;
    addCommentBtn.addEventListener('submit', this.submitHandler.bind(this));
  }

  private gatherUserInput() {
    return this.inputCommentText.value;
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    const newComment: CommentCodableServerFormat = {
      text: this.gatherUserInput(),
      ownerId: this.userId,
      created_at: new Date(),
      module: 'posts',
      module_id: this.postId,
    };

    Fetch.POST<CommentCodablePOSTResponse>(urlComments(this.postId), newComment).then(
      () => new ShowComments(false, this.userId, this.postId, this.postText)
    ); // Add new comment to server and update a list of comments
    this.clearInput();
  }

  private clearInput() {
    this.inputCommentText.value = '';
  }
}
