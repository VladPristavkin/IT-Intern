import BaseQuestionEntity from './BaseQuestionEntity';

class ClosedQuestionEntity extends BaseQuestionEntity {
    constructor() {
        super();
        this.options = [];
    }
}

export default ClosedQuestionEntity; 