class AnswerOption {
    constructor() {
        this.id = null;
        this.text = '';
        this.isCorrect = false;
        this.questionId = null;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.isDeleted = false;
    }
}

export default AnswerOption; 