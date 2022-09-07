import { urlComments } from '../../helpers/urls.js';
import { CommentCodablePOSTResponse, CommentCodableServerFormat } from '../../models/comment.js';
import { Fetch } from '../../services/httpService.js';
import { OpenPosts } from '../Posts/OpenPosts.js';
import { ShowComments } from './ShowComments.js';

// Functionality for comment adding
export class AddComment {
  inputCommentText: HTMLTextAreaElement;
  backBtn: HTMLButtonElement;

  constructor(private userId: string, private postId: string, private postText: string) {
    this.inputCommentText = document.getElementById('addcomment')! as HTMLTextAreaElement;
    this.backBtn = document.getElementById('comment-back-btn')! as HTMLButtonElement;
    this.configure();
  }

  // Add Event listener
  private configure() {
    const addCommentBtn = document.getElementById('addcommentform')! as HTMLFormElement;
    addCommentBtn.addEventListener('submit', this.submitHandler.bind(this));
    this.backBtn.addEventListener('click', this.goBackHandler.bind(this));
  }

  goBackHandler() {
    new OpenPosts(this.userId);
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

    Fetch.POST<CommentCodablePOSTResponse>(urlComments(this.postId), newComment)
      .then(() => new ShowComments(false, this.userId, this.postId, this.postText)) // Add new comment to server and update a list of comments
      .catch((err) => console.error(err));
    this.clearInput();
  }

  private clearInput() {
    this.inputCommentText.value = '';
  }
}
