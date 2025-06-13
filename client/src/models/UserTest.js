class UserTest {
    constructor() {
        this.id = null;
        this.userId = null; // связь с пользователем
        this.testTemplateId = null; // связь с шаблоном теста
        this.markPercentage = 0; // процент выполнения
        this.completedAt = new Date();
        this.userAnswers = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.isDeleted = false;
    }
}

export default UserTest; 