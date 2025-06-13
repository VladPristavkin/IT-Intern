class BaseQuestionEntity {
    constructor() {
        this.id = null;
        this.categoryId = null; // связь с категорией
        this.subCategoryId = null; // связь с подкатегорией
        this.testTemplateId = null; // связь с шаблоном теста
        this.text = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.isDeleted = false;
    }
}

export default BaseQuestionEntity; 