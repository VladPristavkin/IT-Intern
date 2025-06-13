class TestTemplate {
    constructor() {
        this.id = null;
        this.title = '';
        this.categoryId = null;
        this.subCategoryId = null;
        this.startDate = null;
        this.endDate = null;
        this.timeLimit = null;
        this.questions = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.isDeleted = false;
        this.teacherId = null;
        this.teacherName = null;
    }
}

export default TestTemplate; 