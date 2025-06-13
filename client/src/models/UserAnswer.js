class UserAnswer {
    constructor() {
        this.id = null;
        this.userTestId = null;
        this.questionId = null;
        this.openAnswerText = null;
        this.answerComplianceRate = null;
        this.selectedOptionIds = [];
        this.wayOfLearningId = null;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.isDeleted = false;
    }
}

export default UserAnswer; 