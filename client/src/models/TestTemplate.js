class TestTemplate {
    constructor() {
        this.id = null;
        this.title = '';
        this.subCategoryId = null;
        this.startDate = null;
        this.endDate = null;
        this.isTimeRestricted = false;
        this.timeLimit = null;
        this.questions = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.isDeleted = false;
    }
}

export default TestTemplate; 