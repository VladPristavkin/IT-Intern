class Category {
    constructor() {
        this.id = null;
        this.name = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.isDeleted = false;
    }
}

export default Category; 